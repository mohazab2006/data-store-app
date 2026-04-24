$ErrorActionPreference = "Stop"

$baseUrl = "http://localhost:8080/api/users"
$headers = @{ "Content-Type" = "application/json" }

Write-Host "== Phase 5 backend smoke test =="
Write-Host "Base URL: $baseUrl"

# 1) Create
$uniqueSuffix = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()

$createBody = @{
    name  = "Phase5 User"
    email = "phase5.user.$uniqueSuffix@example.com"
    age   = 22
} | ConvertTo-Json

$created = Invoke-RestMethod -Uri $baseUrl -Method Post -Headers $headers -Body $createBody
Write-Host "Created user id: $($created.id)"

if (-not $created.id) {
    throw "Create failed: missing generated id."
}

$id = $created.id

# 2) Get one
$one = Invoke-RestMethod -Uri "$baseUrl/$id" -Method Get
Write-Host "Fetched user name: $($one.name)"

# 3) Update
$updateBody = @{
    name  = "Phase5 User Updated"
    email = "phase5.user.updated.$uniqueSuffix@example.com"
    age   = 23
} | ConvertTo-Json

$updated = Invoke-RestMethod -Uri "$baseUrl/$id" -Method Put -Headers $headers -Body $updateBody
Write-Host "Updated user email: $($updated.email)"

# 4) Get all
$all = Invoke-RestMethod -Uri $baseUrl -Method Get
Write-Host "Total users returned: $($all.Count)"

# 5) Delete
Invoke-RestMethod -Uri "$baseUrl/$id" -Method Delete
Write-Host "Deleted user id: $id"

# 6) Confirm deleted (expect 404)
try {
    Invoke-RestMethod -Uri "$baseUrl/$id" -Method Get | Out-Null
    throw "Expected 404 after delete, but user is still accessible."
} catch {
    if ($_.Exception.Response.StatusCode -ne 404) {
        throw "Expected 404 after delete; got a different error: $($_.Exception.Message)"
    }
}

Write-Host "Phase 5 smoke test PASSED."
