import { useEffect, useState } from 'react';

export default function T({ children, to = 'fr' }) {
  const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
  const [translated, setTranslated] = useState([]);

  useEffect(() => {
    const fetchTranslation = async () => {
      if (!API_KEY || !children) return;

      const textArray = Array.isArray(children)
        ? children.filter((c) => typeof c === 'string' && c.trim() !== '')
        : [children].filter((c) => typeof c === 'string' && c.trim() !== '');

      if (to === 'en' || textArray.length === 0) {
        setTranslated(textArray);
        return;
      }

      try {
        const res = await fetch(
          `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              q: textArray,
              source: 'en',
              target: to,
              format: 'text',
            }),
          }
        );

        const data = await res.json();
        const result = data?.data?.translations?.map((t) => t.translatedText) || [];
        setTranslated(result.length ? result : textArray);
      } catch (error) {
        console.error('Translation error:', error);
        setTranslated(textArray); // fallback
      }
    };

    fetchTranslation();
  }, [children, to, API_KEY]);

  return (
    <>
      {Array.isArray(translated) ? translated.map((t, i) => <span key={i}>{t}</span>) : translated}
    </>
  );
}
