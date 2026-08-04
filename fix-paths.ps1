$dir = 'c:\Users\polit\Desktop\aurevia-health-care\public\aurevia'
$htmlFiles = Get-ChildItem $dir -Filter '*.html'

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Fix logo path in nav and footer
    $content = $content -replace 'src="assets/logo\.jpg"', 'src="/aurevia/assets/logo.jpg"'
    # Fix any other assets/ references
    $content = $content -replace 'src="assets/', 'src="/aurevia/assets/'
    # Fix motion.js path (relative -> absolute)
    $content = $content -replace 'src="motion\.js"', 'src="/aurevia/motion.js"'
    # Fix styles.css path
    $content = $content -replace 'href="styles\.css"', 'href="/aurevia/styles.css"'
    
    Set-Content $file.FullName $content -Encoding UTF8 -NoNewline
    Write-Host "Fixed: $($file.Name)"
}

Write-Host "Done! All HTML files patched."
