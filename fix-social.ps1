$dir = 'c:\Users\polit\Desktop\aurevia-health-care\public\aurevia'
$htmlFiles = Get-ChildItem $dir -Filter '*.html'

$socialHtml = @'
<div class="foot-social-label">Follow us</div>
      <div class="foot-social">
        <a href="https://www.instagram.com/aureviahealthcare/" target="_blank" rel="noopener noreferrer" class="ig" aria-label="Aurevia on Instagram">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <a href="https://www.linkedin.com/company/aurevia-healthcare/" target="_blank" rel="noopener noreferrer" class="li" aria-label="Aurevia on LinkedIn">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
      </div>
'@

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    # Replace the closing foot-brand div to inject social icons before it
    $content = $content -replace '(<div class="foot-brand">[\s\S]*?<p>[^<]+</p>)([\s\S]*?)(</div>\s*<div class="foot-col">)', "`$1`n      $socialHtml`n`$3"
    Set-Content $file.FullName $content -Encoding UTF8 -NoNewline
    Write-Host "Social icons added to: $($file.Name)"
}
Write-Host "Done!"
