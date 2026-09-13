param(
  [int]$Port = 8081
)

$ErrorActionPreference = 'Stop'

Write-Host "Starting Dearest Component Lab at http://localhost:$Port/dev"
& pnpm.cmd exec expo start --web --clear --localhost --port $Port
