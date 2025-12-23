# Email Notification Setup Guide - Brevo (Sendinblue)

## Brevo Setup for Email Notifications

Brevo (formerly Sendinblue) is a professional email service with better deliverability for transactional emails.

### Step 1: Create Brevo Account
1. Go to: https://www.brevo.com/
2. Sign up for a free account (300 emails/day free)
3. Verify your email address

### Step 2: Get SMTP Credentials
1. Login to Brevo dashboard
2. Click on your name (top right) → **"SMTP & API"**
3. Click on **"SMTP"** tab
4. You'll see:
   - **Login (SMTP Username):** Your email address
   - **SMTP Key:** Click "Create a new SMTP key" if needed
   - Copy the SMTP key (looks like: `xsmtpsib-abc123...`)

### Step 3: Configure Sender Email (Optional but Recommended)
1. Go to **"Senders"** in left menu
2. Click **"Add a new sender"**
3. Add email: `noreply@vezxtech.com` or use your domain
4. If using custom domain, verify DNS records

### Step 4: Update .env File
Open `server/.env` and update these values:

```env
BREVO_SMTP_USER=your-brevo-login-email@gmail.com
BREVO_SMTP_KEY=xsmtpsib-abc123def456ghi789...
BREVO_FROM_EMAIL=noreply@vezxtech.com
NOTIFICATION_EMAIL=info.vezxtech@gmail.com
```

**Important:**
- `BREVO_SMTP_USER` = Your Brevo login email (shown in SMTP settings)
- `BREVO_SMTP_KEY` = The SMTP key from Brevo dashboard
- `BREVO_FROM_EMAIL` = Sender email (must be verified in Brevo)
- `NOTIFICATION_EMAIL` = Where you want to receive notifications

### Step 5: Restart Server
After updating .env, restart the server:
```bash
cd server
npm start
```

## Brevo Free Plan Limits
- ✅ 300 emails per day (free)
- ✅ Professional SMTP service
- ✅ Better deliverability than Gmail
- ✅ Email tracking & analytics
- ✅ No 2FA complications

## Alternative: Use Gmail Sender
If you want to send from your Gmail:
1. Add your Gmail in Brevo's "Senders"
2. Use your Gmail as `BREVO_FROM_EMAIL`
3. Keep `BREVO_SMTP_USER` and `BREVO_SMTP_KEY` as Brevo credentials

## What You'll Receive

### WhatsApp Notification (Detailed)
```
🎉 New Contact Form Submission - VezxTech

🏪 Shop Name: Thanu's Kitchen
👤 Owner: Thanu
📱 Phone: +919480579813
📧 Email: thanushreekp2@gmail.com
🏢 Category: Restaurant
📍 Address: 91 6th main 4th block bsk 3rd stage Bangalore
🗺️ Maps: https://maps.app.goo.gl/...

📝 Description:
We are a bakery specializing in cakes, pastries, and custom orders...

🛠️ Services: Cakes, pastries, custom orders
🎨 Template: Restaurant
💰 Budget: ₹10,000 - ₹25,000
⏰ Timeline: 1-2 weeks

📌 Notes: Additional requirements here...

📸 Photos: 3 image(s) uploaded

🕐 Time: 12/23/2025, 3:45:23 PM
```

### Email Notification (HTML Formatted)
- Beautiful HTML email with all form details
- Embedded images (if uploaded)
- Color-coded sections
- Easy to read layout
- All form fields included

## Testing

1. Submit a contact form at http://localhost:3000/contact
2. Check server console for:
   - `✅ WhatsApp sent to: +919480579813`
   - `✅ Email notification sent successfully`
3. Check your Gmail inbox for the notification email
4. Check WhatsApp for the message

## Troubleshooting

### Email not sending?
- Verify Gmail credentials in .env
- Check app password is correct (no spaces)
- Ensure 2FA is enabled on Gmail
- Check server logs for specific error

### WhatsApp not sending?
- Verify Twilio credentials
- Check if recipient opted into Twilio sandbox
- Verify phone numbers have country code (+91)

## Security Notes

- Never commit .env file to git
- Keep app password secure
- Use different passwords for production
- Regularly rotate credentials
