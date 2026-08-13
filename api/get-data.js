export default async function handler(req, res) {
    // שליפת מפתח ה-API המאובטח מתוך משתני הסביבה
    const apiKey = process.env.MY_API_KEY;

    // הגנה בסיסית: ודא שהמפתח אכן מוגדר
    if (!apiKey) {
        return res.status(500).json({ error: 'מפתח API אינו מוגדר בשרת' });
    }

    try {
        // ביצוע הקריאה לשירות החיצוני מתוך השרת
        const response = await fetch(`https://api.example.com/data?key=${apiKey}`);
        const data = await response.json();

        // החזרת הנתונים הנקיים לדפדפן
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'שגיאה בתקשורת מול השרת החיצוני' });
    }
      }
