param(
  [int]$Port = 8888
)

$expoProcesses = Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" |
  Where-Object { $_.CommandLine -match 'expo(\.cmd)?\s+start|expo\\bin\\cli.*start|@expo\\cli.*start' }

foreach ($process in $expoProcesses) {
  Stop-Process -Id $process.ProcessId -Force
}

Write-Host "Starting Expo Go on port $Port with a clean Metro cache..."
& pnpm exec expo start --go --clear --lan --port $Port
