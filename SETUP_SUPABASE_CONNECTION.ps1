# Jalankan dari terminal lokal: .\SETUP_SUPABASE_CONNECTION.ps1
# Password diminta lewat prompt tersembunyi dan tidak dicetak.
$ErrorActionPreference = 'Stop'

$backendPath = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\EcoApp-Backend'))
$envPath = Join-Path $backendPath '.env'
if (-not (Test-Path -LiteralPath $envPath -PathType Leaf)) {
    throw "File .env backend tidak ditemukan di $backendPath"
}

$contents = [IO.File]::ReadAllText($envPath)
$databaseUrlMatches = [regex]::Matches($contents, '(?m)^DATABASE_URL=([^\r\n]*)')
if ($databaseUrlMatches.Count -ne 1) {
    throw 'DATABASE_URL harus muncul tepat satu kali di .env backend.'
}

$oldUrl = $databaseUrlMatches[0].Groups[1].Value.Trim()
# Pulihkan baris yang sempat tergandakan oleh versi awal script.
$duplicateMarker = $oldUrl.IndexOf('ATABASE_URL=')
if ($duplicateMarker -ge 0) {
    $oldUrl = $oldUrl.Substring(0, $duplicateMarker)
}
if ($oldUrl.StartsWith('"') -and $oldUrl.EndsWith('"')) {
    $oldUrl = $oldUrl.Substring(1, $oldUrl.Length - 2)
}
$uri = [Uri]$oldUrl
if ($uri.Scheme -notin @('postgres', 'postgresql') -or $uri.UserInfo -notmatch ':') {
    throw 'Format DATABASE_URL tidak sesuai URI PostgreSQL.'
}
$user = $uri.UserInfo.Split(':', 2)[0]

$securePassword = Read-Host 'Masukkan Database password yang berhasil dipakai di psql' -AsSecureString
$passwordPtr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
try {
    $password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($passwordPtr)
    if ([string]::IsNullOrEmpty($password)) { throw 'Password kosong.' }

    $psql = Get-Command psql -ErrorAction SilentlyContinue
    if (-not $psql) { throw 'psql tidak ditemukan di PATH terminal.' }
    $previousPgPassword = $env:PGPASSWORD
    $env:PGPASSWORD = $password
    try {
        & $psql.Source -h $uri.Host -p ([string]$uri.Port) -U ([Uri]::UnescapeDataString($user)) `
            -d $uri.AbsolutePath.TrimStart('/') -w -tA -c 'select 1' 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) {
            throw 'Password yang dimasukkan di prompt script tidak lolos tes psql. .env belum diubah.'
        }
    } finally {
        if ($null -eq $previousPgPassword) { Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue }
        else { $env:PGPASSWORD = $previousPgPassword }
    }

    $encodedPassword = [Uri]::EscapeDataString($password).Replace('!', '%21')
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($passwordPtr)
    Remove-Variable password -ErrorAction SilentlyContinue
}

$newUrl = '{0}://{1}:{2}@{3}:{4}{5}{6}' -f `
    $uri.Scheme, $user, $encodedPassword, $uri.Host, $uri.Port, $uri.AbsolutePath, $uri.Query
$previousDatabaseUrl = $env:DATABASE_URL
$env:DATABASE_URL = $newUrl
Push-Location $backendPath
try {
    node -e "const {Client}=require('pg'); const c=new Client({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false},connectionTimeoutMillis:10000}); c.connect().then(()=>c.query('select 1')).then(()=>{console.log('TERHUBUNG: driver backend berhasil login ke Supabase');return c.end()}).catch(e=>{console.error('GAGAL: '+(e.code||e.message));process.exitCode=1})"
    if ($LASTEXITCODE -ne 0) { throw 'Tes driver backend gagal. .env belum diubah.' }
} finally {
    Pop-Location
    if ($null -eq $previousDatabaseUrl) { Remove-Item Env:DATABASE_URL -ErrorAction SilentlyContinue }
    else { $env:DATABASE_URL = $previousDatabaseUrl }
}

$databaseUrlMatch = $databaseUrlMatches[0]
$updated = $contents.Substring(0, $databaseUrlMatch.Index) + 'DATABASE_URL=' + $newUrl +
    $contents.Substring($databaseUrlMatch.Index + $databaseUrlMatch.Length)
[IO.File]::WriteAllText($envPath, $updated, [Text.UTF8Encoding]::new($false))
Remove-Variable encodedPassword, newUrl, updated -ErrorAction SilentlyContinue
Write-Output 'DATABASE_URL backend sudah diperbarui dan terverifikasi.'
