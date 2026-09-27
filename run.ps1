$ErrorActionPreference = "Stop"

$rootDir = $PSScriptRoot

Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$rootDir\backend'; pnpm run dev"

Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$rootDir\frontend'; pnpm run dev"

Write-Host "Started Backend and Frontend dev servers in separate windows." -ForegroundColor Green