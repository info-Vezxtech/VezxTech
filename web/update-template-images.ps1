# Quick Script to Update All Templates with Local Images

# Run this AFTER you've added all images to web/public/images/templates/

Write-Host "`n🎨 Updating template previews to use local images..." -ForegroundColor Cyan

$templateFile = "c:\Users\thanu\OneDrive\Desktop\VezxTech\web\app\templates\[slug]\page.jsx"

Write-Host "`n✅ To use your own images:" -ForegroundColor Green
Write-Host "1. Add images to: web\public\images\templates\[template-name]\" -ForegroundColor Yellow
Write-Host "2. Update the code in: app\templates\[slug]\page.jsx" -ForegroundColor Yellow
Write-Host "3. Replace Unsplash URLs with local paths like:" -ForegroundColor Yellow
Write-Host "   '/images/templates/clinic/homepage.jpg'" -ForegroundColor White

Write-Host "`n📝 Example for Clinic template:" -ForegroundColor Cyan
Write-Host @"
previews: [
  '/images/templates/clinic/homepage.jpg',
  '/images/templates/clinic/services.jpg', 
  '/images/templates/clinic/booking.jpg'
],
"@ -ForegroundColor Gray

Write-Host "`n💡 Current setup uses Unsplash placeholders until you add real mockups!" -ForegroundColor Yellow
