// Using Brevo API instead of SMTP (works on Render free tier)
export async function sendEmailNotification(formData) {
  try {
    // Skip email if API key not configured
    if (!process.env.BREVO_SMTP_KEY) {
      console.log('⚠️ Email skipped: BREVO_SMTP_KEY not configured');
      return null;
    }
    const emailContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; }
            .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
            .value { color: #333; }
            .images { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
            .images img { width: 150px; height: 150px; object-fit: cover; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎉 New Contact Form Submission - VezxTech</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">🏪 Shop Name:</div>
                <div class="value">${formData.shopName}</div>
              </div>
              
              <div class="field">
                <div class="label">👤 Owner Name:</div>
                <div class="value">${formData.ownerName}</div>
              </div>
              
              <div class="field">
                <div class="label">📱 Phone Number:</div>
                <div class="value">${formData.phone}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email Address:</div>
                <div class="value">${formData.email}</div>
              </div>
              
              <div class="field">
                <div class="label">🏢 Business Category:</div>
                <div class="value">${formData.category || 'Not specified'}</div>
              </div>
              
              <div class="field">
                <div class="label">📍 Business Address:</div>
                <div class="value">${formData.address}</div>
              </div>
              
              ${formData.mapLink ? `
              <div class="field">
                <div class="label">🗺️ Google Maps Link:</div>
                <div class="value"><a href="${formData.mapLink}">${formData.mapLink}</a></div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">📝 Business Description:</div>
                <div class="value">${formData.description}</div>
              </div>
              
              ${formData.services ? `
              <div class="field">
                <div class="label">🛠️ Services Offered:</div>
                <div class="value">${formData.services}</div>
              </div>
              ` : ''}
              
              ${formData.template ? `
              <div class="field">
                <div class="label">🎨 Preferred Template:</div>
                <div class="value">${formData.template}</div>
              </div>
              ` : ''}
              
              ${formData.budget ? `
              <div class="field">
                <div class="label">💰 Budget:</div>
                <div class="value">${formData.budget}</div>
              </div>
              ` : ''}
              
              ${formData.timeline ? `
              <div class="field">
                <div class="label">⏰ Timeline:</div>
                <div class="value">${formData.timeline}</div>
              </div>
              ` : ''}
              
              ${formData.additionalNotes ? `
              <div class="field">
                <div class="label">📌 Additional Notes:</div>
                <div class="value">${formData.additionalNotes}</div>
              </div>
              ` : ''}
              
              ${formData.images && formData.images.length > 0 ? `
              <div class="field">
                <div class="label">📸 Business Photos (${formData.images.length}):</div>
                <div class="images">
                  ${formData.images.map(img => `<img src="${img}" alt="Business photo" />`).join('')}
                </div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">🕐 Submission Time:</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Use Brevo API instead of SMTP
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_SMTP_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          name: 'VezxTech Notifications',
          email: process.env.BREVO_FROM_EMAIL
        },
        to: [
          { email: process.env.NOTIFICATION_EMAIL }
        ],
        subject: `🔔 New Contact Submission: ${formData.shopName}`,
        htmlContent: emailContent
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Brevo API error: ${error}`);
    }

    const result = await response.json();
    console.log('✅ Email sent successfully via Brevo API:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Email send error:', error.message);
    // Don't throw - just log the error so form submission still succeeds
    return null;
  }
}
