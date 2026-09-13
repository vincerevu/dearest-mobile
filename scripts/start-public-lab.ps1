param(
  [int]$Port = 8889
)

$ErrorActionPreference = 'Stop'

$cloudflaredCommand = Get-Command cloudflared -ErrorAction SilentlyContinue
$cloudflaredPath = if ($cloudflaredCommand) { $cloudflaredCommand.Source } else {
  Get-ChildItem (Join-Path $env:LOCALAPPDATA 'Microsoft\WinGet\Packages') -Recurse -Filter 'cloudflared.exe' -ErrorAction SilentlyContinue |
    Select-Object -First 1 -ExpandProperty FullName
}

if (-not $cloudflaredPath) {
  Write-Host 'Installing Cloudflare Quick Tunnel CLI (one-time, no account needed)...'
  & winget install --id Cloudflare.cloudflared --exact --accept-package-agreements --accept-source-agreements --disable-interactivity
  $cloudflaredPath = Get-ChildItem (Join-Path $env:LOCALAPPDATA 'Microsoft\WinGet\Packages') -Recurse -Filter 'cloudflared.exe' -ErrorAction SilentlyContinue |
    Select-Object -First 1 -ExpandProperty FullName
}

if (-not $cloudflaredPath) {
  throw 'Cloudflare CLI installation failed. Install it with: winget install --id Cloudflare.cloudflared --exact'
}

# A lab process owns this port, so stopping its listener is safe and makes each run deterministic.
$listeners = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
foreach ($listener in $listeners) {
  Stop-Process -Id $listener.OwningProcess -Force
}

$labLogDirectory = Join-Path $PSScriptRoot '..\.expo'
$labOutLog = Join-Path $labLogDirectory 'public-lab.out.log'
$labErrLog = Join-Path $labLogDirectory 'public-lab.err.log'
New-Item -ItemType Directory -Force -Path $labLogDirectory | Out-Null

Write-Host 'Exporting the static Expo Web bundle (no development WebSocket)...'
& pnpm.cmd exec expo export --platform web --clear
if ($LASTEXITCODE -ne 0) {
  throw 'Expo Web export failed. Check the terminal output above.'
}

Write-Host "Serving the exported site at http://localhost:$Port"
$expoProcess = Start-Process -FilePath 'pnpm.cmd' -ArgumentList @('dlx', 'serve', 'dist', '--listen', $Port, '--no-clipboard') -WorkingDirectory (Join-Path $PSScriptRoot '..') -WindowStyle Hidden -PassThru -RedirectStandardOutput $labOutLog -RedirectStandardError $labErrLog

try {
  $deadline = (Get-Date).AddSeconds(45)
  do {
    Start-Sleep -Milliseconds 500
    $ready = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
  } until ($ready -or (Get-Date) -ge $deadline)

  if (-not $ready) {
    throw "Expo Web did not start within 45 seconds. Check $labOutLog and $labErrLog"
  }

  Write-Host 'Creating a public Cloudflare Quick Tunnel. Copy the trycloudflare.com HTTPS URL printed below for the client.'
  & $cloudflaredPath tunnel --no-autoupdate --url "http://127.0.0.1:$Port"
}
finally {
  if (-not $expoProcess.HasExited) {
    Stop-Process -Id $expoProcess.Id -Force
  }
}
