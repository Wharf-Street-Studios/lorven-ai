# Supabase Configuration Guide

## ⚠️ IMPORTANT: Fix Email Bouncing Issue

**Status:** Email bouncing issue detected by Supabase. Follow these steps immediately:

### 1. Disable Email Confirmation (Required for Development)

**Action Required:** Go to your Supabase Dashboard NOW and disable email confirmation:

1. Visit: https://supabase.com/dashboard/project/qtaidcamesetdbpqkmjq/auth/providers

2. Scroll down to **"Email Auth"** section

3. **Toggle OFF** the "Confirm email" option
   - This prevents Supabase from sending confirmation emails
   - Eliminates email bouncing from test accounts
   - Required for development/testing

4. Click **Save**

### 2. Clean Up Test Users (Completed ✅)

Test users with invalid emails have been removed:
- Deleted: 2 users with fake Gmail addresses
- Remaining: 1 valid user

Run cleanup again if needed:
```bash
node server/cleanup-test-users.js
```

## Alternative: Use Admin API

You can also create users programmatically using the service role key (already configured in `.env`).

## Current Setup Status

✅ Database tables created
✅ Row Level Security enabled
✅ Service role key configured
⚠️  Email confirmation enabled (disable for testing)

## Testing Authentication

Once email confirmation is disabled, you can test with:

```bash
# Register
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@gmail.com",
    "username": "johndoe",
    "password": "TestPass123!"
  }'

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@gmail.com",
    "password": "TestPass123!"
  }'
```

## OAuth Configuration (Optional)

To enable Google/Apple/Facebook login:

1. Go to **Authentication > Providers**
2. Enable each provider
3. Add client IDs and secrets
4. Configure callback URLs

Your backend is already set up to handle OAuth!
