# How to Find Your Google Client Secret

You already have your Client ID: `506302034298-8263mk2ugsogftrks1p97ibmrgi2u0gp.apps.googleusercontent.com`

Now you need to find the **Client Secret**. Here's exactly where to find it:

## Step 1: Go to Google Cloud Console

1. Open: https://console.cloud.google.com/
2. Make sure you're in the correct project (the one where you created the OAuth credentials)

## Step 2: Navigate to Credentials

1. Click on the **hamburger menu** (three lines) in the top-left
2. Go to: **APIs & Services** → **Credentials**

## Step 3: Find Your OAuth 2.0 Client

1. Look for the section called **"OAuth 2.0 Client IDs"**
2. You should see your client listed (it might be called "Web client" or similar)
3. The Client ID shown should match: `506302034298-8263mk2ugsogftrks1p97ibmrgi2u0gp.apps.googleusercontent.com`

## Step 4: View the Client Secret

**Option A: Click on the Client Name**
1. Click on the name of your OAuth client
2. You'll see a page with both:
   - **Client ID**: 506302034298-8263mk2ugsogftrks1p97ibmrgi2u0gp.apps.googleusercontent.com
   - **Client Secret**: GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxxxx (this is what you need!)

**Option B: Download JSON**
1. On the Credentials page, find your OAuth client
2. Click the **download icon** (⬇️) on the right side
3. This downloads a JSON file
4. Open the file and look for `"client_secret"`: "GOCSPX-xxxxx..."

## Step 5: Copy the Client Secret

The Client Secret will look something like this:
```
GOCSPX-AbCdEfGhIjKlMnOpQrStUvWxYz12
```

It always starts with `GOCSPX-` followed by random characters.

## Step 6: Update .env.local

1. Open `/home/enock/Soka-Zone/.env.local`
2. Find the line:
   ```
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   ```
3. Replace it with your actual secret:
   ```
   GOOGLE_CLIENT_SECRET=GOCSPX-your_actual_secret_here
   ```

## Step 7: Restart the Server

After updating the `.env.local` file:

```bash
# Stop the current server (Ctrl+C in the terminal)
# Then restart:
npm run dev
```

## ✅ Test Google Sign-In

1. Go to: http://localhost:3000/auth/login
2. Click "Continue with Google"
3. Sign in with your Google account
4. You should be redirected back to the home page, logged in!

---

## 🔍 Troubleshooting

### Can't find the Client Secret?

If you can't see the Client Secret:

1. **Create a new OAuth client**:
   - Go to Credentials → Create Credentials → OAuth client ID
   - Choose "Web application"
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Click Create
   - A popup will show both Client ID and Client Secret - **copy both immediately!**

2. **Reset existing credentials**:
   - Find your OAuth client in the list
   - Click the pencil icon (✏️) to edit
   - You might see an option to reset the secret

### Still having issues?

The Client Secret is shown **only once** when you first create the OAuth client. If you missed it:
- You'll need to create a new OAuth client, OR
- Reset the secret for the existing one

---

**Once you add the Client Secret, Google Sign-In will work perfectly! 🔵✨**
