// Utility to send WhatsApp message using Twilio
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM; // e.g. 'whatsapp:+14155238886'
const client = twilio(accountSid, authToken);

export async function sendWhatsAppMessage(to, message) {
  try {
    console.log(`📤 Sending WhatsApp from ${whatsappFrom} to whatsapp:${to}`);
    const res = await client.messages.create({
      from: whatsappFrom,
      to: `whatsapp:${to}`,
      body: message
    });
    console.log(`✅ WhatsApp sent successfully. SID: ${res.sid}`);
    return res;
  } catch (err) {
    console.error('❌ WhatsApp send error:', err.message);
    console.error('Error code:', err.code);
    console.error('Error details:', err);
    throw err;
  }
}
