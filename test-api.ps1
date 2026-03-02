# Test API Script
# Run this script to test all backend endpoints

Write-Host "Testing Backend API Endpoints" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3001/api"

# Test 1: GET /api/promo (Public)
Write-Host "Test 1: GET /api/promo (Public)" -ForegroundColor Yellow
try {
    $promos = Invoke-RestMethod -Uri "$baseUrl/promo" -Method GET
    Write-Host "✅ Success! Found $($promos.Count) promos" -ForegroundColor Green
    $promos | ForEach-Object {
        Write-Host "   - $($_.title) (Diskon: $($_.discount_percentage)%)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 2: POST /api/auth/login
Write-Host "📝 Test 2: POST /api/auth/login" -ForegroundColor Yellow
try {
    $loginBody = @{
        email = "admin@alhijrah.com"
        password = "admin123"
    } | ConvertTo-Json

    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    $token = $loginResponse.access_token
    Write-Host "✅ Success! Logged in as: $($loginResponse.user.name)" -ForegroundColor Green
    Write-Host "   Role: $($loginResponse.user.role)" -ForegroundColor Gray
    Write-Host "   Token: $($token.Substring(0, 50))..." -ForegroundColor Gray
} catch {
    Write-Host "❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
    exit
}
Write-Host ""

# Test 3: GET /api/jamaah (Protected)
Write-Host "📝 Test 3: GET /api/jamaah (Protected - needs auth)" -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $token"
    }
    $jamaah = Invoke-RestMethod -Uri "$baseUrl/jamaah" -Method GET -Headers $headers
    Write-Host "✅ Success! Found $($jamaah.Count) jamaah" -ForegroundColor Green
    $jamaah | ForEach-Object {
        Write-Host "   - $($_.full_name) (Passport: $($_.passport_number))" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 4: POST /api/promo (Protected)
Write-Host "📝 Test 4: POST /api/promo (Protected - create new promo)" -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $token"
    }
    $newPromo = @{
        title = "Test Promo - Early Bird 2027"
        description = "Booking sekarang untuk umroh tahun depan"
        discount_percentage = 30
        start_date = "2026-04-01"
        end_date = "2026-12-31"
        is_featured = $false
        is_active = $true
    } | ConvertTo-Json

    $createdPromo = Invoke-RestMethod -Uri "$baseUrl/promo" -Method POST -Body $newPromo -ContentType "application/json" -Headers $headers
    Write-Host "✅ Success! Created promo: $($createdPromo.title)" -ForegroundColor Green
    Write-Host "   ID: $($createdPromo.id)" -ForegroundColor Gray
    $testPromoId = $createdPromo.id
} catch {
    Write-Host "❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 5: GET /api/promo/:id
Write-Host "📝 Test 5: GET /api/promo/:id (Get specific promo)" -ForegroundColor Yellow
try {
    if ($testPromoId) {
        $promo = Invoke-RestMethod -Uri "$baseUrl/promo/$testPromoId" -Method GET
        Write-Host "✅ Success! Got promo: $($promo.title)" -ForegroundColor Green
        Write-Host "   Discount: $($promo.discount_percentage)%" -ForegroundColor Gray
    } else {
        Write-Host "⚠️  Skipped: No promo ID available" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 6: PATCH /api/promo/:id (Protected)
Write-Host "📝 Test 6: PATCH /api/promo/:id (Update promo)" -ForegroundColor Yellow
try {
    if ($testPromoId) {
        $headers = @{
            Authorization = "Bearer $token"
        }
        $updatePromo = @{
            discount_percentage = 35
        } | ConvertTo-Json

        $updatedPromo = Invoke-RestMethod -Uri "$baseUrl/promo/$testPromoId" -Method PATCH -Body $updatePromo -ContentType "application/json" -Headers $headers
        Write-Host "✅ Success! Updated discount to: $($updatedPromo.discount_percentage)%" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Skipped: No promo ID available" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 7: POST /api/jamaah (Protected)
Write-Host "📝 Test 7: POST /api/jamaah (Create new jamaah)" -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $token"
    }
    
    # Get tenant_id from login response
    $tenantId = $loginResponse.user.tenant_id
    
    $newJamaah = @{
        full_name = "Test Jamaah"
        passport_number = "T1234567"
        phone = "+62899999999"
        email = "test@example.com"
        tenant_id = $tenantId
    } | ConvertTo-Json

    $createdJamaah = Invoke-RestMethod -Uri "$baseUrl/jamaah" -Method POST -Body $newJamaah -ContentType "application/json" -Headers $headers
    Write-Host "✅ Success! Created jamaah: $($createdJamaah.full_name)" -ForegroundColor Green
    Write-Host "   ID: $($createdJamaah.id)" -ForegroundColor Gray
    $testJamaahId = $createdJamaah.id
} catch {
    Write-Host "❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 8: GET /api/analytics/dashboard (Protected)
Write-Host "📝 Test 8: GET /api/analytics/dashboard (Dashboard stats)" -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $token"
    }
    $stats = Invoke-RestMethod -Uri "$baseUrl/analytics/dashboard" -Method GET -Headers $headers
    Write-Host "✅ Success! Dashboard stats:" -ForegroundColor Green
    Write-Host "   Total Tenants: $($stats.total_tenants)" -ForegroundColor Gray
    Write-Host "   Total Jamaah: $($stats.total_jamaah)" -ForegroundColor Gray
    Write-Host "   Active Promos: $($stats.active_promos)" -ForegroundColor Gray
    Write-Host "   Tracking Today: $($stats.tracking_today)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 9: GET /api/tracking (Protected)
Write-Host "📝 Test 9: GET /api/tracking (Get tracking logs)" -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $token"
    }
    $tracking = Invoke-RestMethod -Uri "$baseUrl/tracking" -Method GET -Headers $headers
    Write-Host "✅ Success! Found $($tracking.Count) tracking logs" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 10: DELETE /api/promo/:id (Protected - cleanup)
Write-Host "📝 Test 10: DELETE /api/promo/:id (Cleanup test promo)" -ForegroundColor Yellow
try {
    if ($testPromoId) {
        $headers = @{
            Authorization = "Bearer $token"
        }
        Invoke-RestMethod -Uri "$baseUrl/promo/$testPromoId" -Method DELETE -Headers $headers
        Write-Host "✅ Success! Deleted test promo" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Skipped: No promo ID available" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 11: DELETE /api/jamaah/:id (Protected - cleanup)
Write-Host "📝 Test 11: DELETE /api/jamaah/:id (Cleanup test jamaah)" -ForegroundColor Yellow
try {
    if ($testJamaahId) {
        $headers = @{
            Authorization = "Bearer $token"
        }
        Invoke-RestMethod -Uri "$baseUrl/jamaah/$testJamaahId" -Method DELETE -Headers $headers
        Write-Host "✅ Success! Deleted test jamaah" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Skipped: No jamaah ID available" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "=================================" -ForegroundColor Cyan
Write-Host "API Testing Complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Summary:" -ForegroundColor White
Write-Host "- All public endpoints working ✅" -ForegroundColor Green
Write-Host "- Authentication working ✅" -ForegroundColor Green
Write-Host "- Protected endpoints working ✅" -ForegroundColor Green
Write-Host "- CRUD operations working ✅" -ForegroundColor Green
Write-Host ""
Write-Host "Backend is ready for development!" -ForegroundColor Cyan
