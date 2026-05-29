import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Myra, a friendly and professional AI assistant for SalaryUncle — India's trusted salary loan platform.

About SalaryUncle:
- Instant salary loans up to ₹5 Lakhs
- Interest rate: 10.5% per annum
- Tenure: 3 to 60 months
- Approval in 24 hours
- 100% online, no collateral
- Eligibility: Age 21-58, Salary ₹20,000+/month, Salaried employee
- Documents needed: PAN card, Aadhaar card, salary slip, bank statement
- Contact: +91 87960 41166, support@salaryuncle.com
- Office: NN Mall, Mangolpuri, Delhi-110085
- Apply at: salaryuncle.vercel.app/apply

Your personality:
- Friendly, warm, and professional
- Speak in simple English (mix Hindi words occasionally like "aap", "bilkul", "zaroor" to feel natural)
- Keep responses SHORT and crisp (2-4 lines max)
- Always guide users toward applying for a loan
- If asked about EMI, calculate it: EMI = P × r × (1+r)^n / ((1+r)^n - 1) where r = rate/12/100
- Never make up information — only use facts given above
- End responses with a helpful follow-up question or CTA

Important rules:
- Do NOT discuss competitors
- Do NOT give legal or financial advice beyond loan info
- If asked something unrelated, politely redirect to loan topics
- Keep responses under 60 words`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages' });
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10), // last 10 messages for context
    });

    return res.status(200).json({
      reply: response.content[0].text,
    });
  } catch (err) {
    console.error('Chat API error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
