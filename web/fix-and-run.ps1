# Quick fix for OneDrive cache corruption
Write-Host "`n🔧 Fixing OneDrive/Next.js cache issue..." -ForegroundColor Cyan

# Kill any running node processes
Write-Host "Stopping Node processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 1

# Clear Next.js cache
Write-Host "Clearing .next cache..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

Write-Host "`n✅ Cache cleared! Starting dev server..." -ForegroundColor Green
Write-Host "Running: npm run dev`n" -ForegroundColor White

# Start dev server
npm run dev
