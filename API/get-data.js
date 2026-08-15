export default async function handler(req, res) {
    // מאפשר קריאה רק בשיטת POST (זה מה ש-ai-widget.html שולח)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // שליפת מפתח ה-API המאובטח מתוך משתני הסביבה (מוגדר ב-Vercel, לא בקוד)
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'מפתח API אינו מוגדר בשרת (בדוק Environment Variables ב-Vercel)' });
    }

    try {
        // req.body מגיע מה-fetch ב-ai-widget.html: { contents: chatHistory }
        const { contents } = req.body || {};

        if (!contents) {
            return res.status(400).json({ error: 'לא התקבל תוכן הודעה' });
        }

        const upstream = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents,
                    systemInstruction: {
                        parts: [{ text: 'אתה עוזר וירטואלי ידידותי באתר. ענה בעברית בקצרה ובבהירות.' }]
                    }
                })
            }
        );

        const data = await upstream.json();

        if (!upstream.ok) {
            return res.status(upstream.status).json({ error: data.error?.message || 'שגיאה מול Gemini' });
        }

        // מחזירים בדיוק את הפורמט ש-ai-widget.html מצפה לו (data.candidates[0]...)
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'שגיאה בתקשורת מול השרת החיצוני: ' + error.message });
    }
}
