# Google OAuth Setup Guide for Soka Zone

Follow these steps to enable "Sign in with Google" functionality on your Soka Zone website.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "Soka Zone"
4. Click "Create"

## Step 2: Enable Google+ API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" (unless you have a Google Workspace)
3. Click "Create"
4. Fill in the required information:
   - **App name**: Soka Zone
   - **User support email**: sokazone@gmail.com
   - **Developer contact**: sokazone@gmail.com
5. Click "Save and Continue"
6. Skip "Scopes" (click "Save and Continue")
7. Add test users if needed (your email)
8. Click "Save and Continue"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Select "Web application"
4. Configure:
   - **Name**: Soka Zone Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for development)
     - Add your production URL when deployed (e.g., `https://sokazone.com`)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - Add production callback when deployed (e.g., `https://sokazone.com/api/auth/callback/google`)
5. Click "Create"
6. **IMPORTANT**: Copy your Client ID and Client Secret

## Step 5: Update Environment Variables

1. Open `/home/enock/Soka-Zone/.env.local`
2. Replace the placeholder values:

```env
GOOGLE_CLIENT_ID=your_actual_client_id_from_step_4
GOOGLE_CLIENT_SECRET=your_actual_client_secret_from_step_4
```

3. Also set a secure NEXTAUTH_SECRET:

```bash
# Generate a random secret (run this in terminal):
openssl rand -base64 32
```

Then update:
```env
NEXTAUTH_SECRET=paste_the_generated_secret_here
```

## Step 6: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 7: Test Google Sign-In

1. Go to `http://localhost:3000/auth/login`
2. Click "Continue with Google"
3. Sign in with your Google account
4. You should be redirected back to the home page, logged in

## Production Deployment

When deploying to production:

1. Add your production domain to Google Cloud Console:
   - Authorized JavaScript origins: `https://your-domain.com`
   - Authorized redirect URIs: `https://your-domain.com/api/auth/callback/google`

2. Update environment variables on your hosting platform:
   - `NEXTAUTH_URL=https://your-domain.com`
   - `GOOGLE_CLIENT_ID=your_client_id`
   - `GOOGLE_CLIENT_SECRET=your_client_secret`
   - `NEXTAUTH_SECRET=your_secret`

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure the redirect URI in Google Console exactly matches: `http://localhost:3000/api/auth/callback/google`
- Check for trailing slashes

### Error: "Access blocked: This app's request is invalid"
- Complete the OAuth consent screen configuration
- Add your email as a test user

### Google button not working
- Check browser console for errors
- Verify environment variables are set correctly
- Restart the development server

## Security Notes

- Never commit `.env.local` to version control
- Keep your Client Secret private
- Use different credentials for development and production
- Regularly rotate your secrets

## Features Enabled

✅ Sign in with Google  
✅ Sign up with Google  
✅ Automatic user creation on first Google sign-in  
✅ Session management with NextAuth  
✅ Secure JWT tokens  

---

**Need Help?**  
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
