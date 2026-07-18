// Deck 4 — Hebrew / Israeli deck: curated well-known Israeli songs
// Titles + artists in Hebrew script for best Deezer match rate.
// `year` = original release year (drives the timeline gameplay).
// Same shape as the other decks: { title, artist, year }

const SONGS4 = [
  // ── זמר עברי קלאסי (60s–70s) ───────────────────────────────────────────────
  { title: "ירושלים של זהב", artist: "נעמי שמר", year: 1967 },
  { title: "לו יהי", artist: "חוה אלברשטיין", year: 1973 },
  { title: "אני ואתה", artist: "אריק איינשטיין", year: 1971 },
  { title: "סע לאט", artist: "אריק איינשטיין", year: 1970 },
  { title: "עוף גוזל", artist: "אריק איינשטיין", year: 1987 },
  { title: "כמה טוב שבאת הביתה", artist: "אריק איינשטיין", year: 1979 },
  { title: "אתה ואני", artist: "אריק איינשטיין", year: 1971 },
  { title: "יו יא חביבי", artist: "כוורת", year: 1974 },
  { title: "נתתי לה חיי", artist: "כוורת", year: 1974 },
  { title: "שיר המכולת", artist: "כוורת", year: 1974 },
  { title: "בעקבות היום", artist: "כוורת", year: 1975 },
  { title: "מדברים על שלום", artist: "כוורת", year: 1975 },
  { title: "הללויה", artist: "גלי עטרי", year: 1979 },
  { title: "אבניבי", artist: "יזהר כהן", year: 1978 },
  { title: "בשנה הבאה", artist: "אילנית", year: 1970 },

  // ── רוק / פופ ישראלי (80s) ─────────────────────────────────────────────────
  { title: "מחכים למשיח", artist: "שלום חנוך", year: 1985 },
  { title: "רק בן אדם", artist: "שלום חנוך", year: 1985 },
  { title: "לילה", artist: "שלום חנוך", year: 1984 },
  { title: "רכבת לילה לקהיר", artist: "משינה", year: 1987 },
  { title: "הכוכבים דולקים על אש קטנה", artist: "משינה", year: 1985 },
  { title: "רחוב האגס 1", artist: "משינה", year: 1988 },
  { title: "עד מתי", artist: "משינה", year: 1990 },
  { title: "פרחים בקנה", artist: "יהודה פוליקר", year: 1988 },
  { title: "עיניים שלי", artist: "יהודה פוליקר", year: 1985 },
  { title: "שביל הבריחה", artist: "ריטה", year: 1988 },
  { title: "בואי בואי", artist: "ריטה", year: 1986 },
  { title: "יורה", artist: "ריטה", year: 1994 },
  { title: "כמו צמח בר", artist: "שלמה ארצי", year: 1988 },
  { title: "תחת שמי ים תיכון", artist: "שלמה ארצי", year: 1984 },
  { title: "ציפור נודדת", artist: "יהודית רביץ", year: 1987 },
  { title: "צליל מכוון", artist: "אריק איינשטיין", year: 1988 },

  // ── מזרחי קלאסי ─────────────────────────────────────────────────────────────
  { title: "הפרח בגני", artist: "זוהר ארגוב", year: 1982 },
  { title: "אלינור", artist: "זוהר ארגוב", year: 1980 },
  { title: "נתתי לה חיי", artist: "זוהר ארגוב", year: 1983 },
  { title: "גלבי", artist: "עפרה חזה", year: 1984 },
  { title: "אים ננעלו", artist: "עפרה חזה", year: 1988 },
  { title: "שיר השירים", artist: "עפרה חזה", year: 1986 },
  { title: "כמו הרוח", artist: "זהבה בן", year: 1995 },
  { title: "טיפ טיפה", artist: "זהבה בן", year: 1993 },

  // ── פופ / רוק (90s) ─────────────────────────────────────────────────────────
  { title: "מבוא לספרות", artist: "אתניקס", year: 1996 },
  { title: "אחכה לך", artist: "אתניקס", year: 1997 },
  { title: "אנשים טובים", artist: "משינה", year: 1993 },
  { title: "שלח לי מלאך", artist: "משינה", year: 1996 },
  { title: "אחת", artist: "אביב גפן", year: 1993 },
  { title: "שיר תקווה", artist: "אביב גפן", year: 1997 },
  { title: "יש לי חור בגרב", artist: "טיפקס", year: 1995 },
  { title: "הליקופטר", artist: "טיפקס", year: 1998 },
  { title: "בואי", artist: "אהוד בנאי", year: 1987 },
  { title: "עיר מקלט", artist: "אהוד בנאי", year: 1997 },
  { title: "יורם", artist: "מוקי", year: 2003 },
  { title: "בלדה לסמל", artist: "אריק לביא", year: 1968 },

  // ── היפ-הופ / הדג נחש ───────────────────────────────────────────────────────
  { title: "שירת הסטיקר", artist: "הדג נחש", year: 2004 },
  { title: "לא פראייר", artist: "הדג נחש", year: 2000 },
  { title: "זמן להתעורר", artist: "הדג נחש", year: 2006 },
  { title: "לצאת מדיכאון", artist: "הדג נחש", year: 2008 },

  // ── מזרחי / פופ שנות ה-2000 ─────────────────────────────────────────────────
  { title: "אתה תותח", artist: "שרית חדד", year: 2002 },
  { title: "קח אותי איתך", artist: "שרית חדד", year: 2001 },
  { title: "אחת", artist: "שרית חדד", year: 2003 },
  { title: "מלכת היופי של עולמי", artist: "אייל גולן", year: 2001 },
  { title: "אם אתה גבר", artist: "אייל גולן", year: 2007 },
  { title: "רק אלוהים יודע", artist: "אייל גולן", year: 2010 },
  { title: "טעות של החיים", artist: "עדן בן זקן", year: 2015 },
  { title: "המלכה", artist: "עדן בן זקן", year: 2016 },
  { title: "נגן לי חבר", artist: "משה פרץ", year: 2009 },
  { title: "אחשוב על מחר", artist: "משה פרץ", year: 2008 },

  // ── פופ עכשווי (2010s) ──────────────────────────────────────────────────────
  { title: "תל אביב", artist: "עומר אדם", year: 2016 },
  { title: "מלכה שלי", artist: "עומר אדם", year: 2018 },
  { title: "אני לא בנוי לזה", artist: "עומר אדם", year: 2019 },
  { title: "בסוף מתרגלים להכל", artist: "פאר טסי", year: 2018 },
  { title: "עולם חדש", artist: "פאר טסי", year: 2020 },
  { title: "טודו בום", artist: "סטטיק ובן אל תבורי", year: 2018 },
  { title: "שברירי", artist: "סטטיק ובן אל תבורי", year: 2017 },
  { title: "ליבי", artist: "סטטיק ובן אל תבורי", year: 2020 },
  { title: "Toy", artist: "נטע ברזילי", year: 2018 },
  { title: "בשבילך", artist: "אושר כהן", year: 2019 },
  { title: "מנגו", artist: "אנה זק", year: 2019 },

  // ── פופ עכשווי (2020s) ──────────────────────────────────────────────────────
  { title: "Unicorn", artist: "נועה קירל", year: 2023 },
  { title: "פוסט אפוקליפטי", artist: "נועה קירל", year: 2020 },
  { title: "מיליון דולר", artist: "נועה קירל", year: 2021 },
  { title: "כל הכבוד", artist: "עדן חסון", year: 2021 },
  { title: "לא נגמר", artist: "עדן חסון", year: 2022 },

  // ── סינגלים אהובים / שירי ארץ ישראל ─────────────────────────────────────────
  { title: "יש לי חג", artist: "קורין אלאל", year: 1990 },
  { title: "אור גדול", artist: "עדן מיכאלי", year: 2016 },
  { title: "פנים אל פנים", artist: "עידן רייכל", year: 2002 },
  { title: "ממעמקים", artist: "עידן רייכל", year: 2005 },
  { title: "בואי", artist: "עידן רייכל", year: 2005 },
  { title: "מלאך", artist: "עברי לידר", year: 2005 },
  { title: "היום", artist: "עברי לידר", year: 2007 },
  { title: "כמו סרט הודי", artist: "עברי לידר", year: 2013 },
  { title: "בא לי אליך", artist: "אסף אמדורסקי", year: 2001 },
  { title: "ורוד", artist: "יסמין מועלם", year: 1998 },
  { title: "שנה טובה", artist: "מירי מסיקה", year: 2006 },
  { title: "לו יכולתי", artist: "מירי מסיקה", year: 2008 },
  { title: "אין לי ארץ אחרת", artist: "גלי עטרי", year: 1986 },
  { title: "עטור מצחך", artist: "אריק איינשטיין", year: 1977 },
  { title: "שיר לשלום", artist: "מירי אלוני", year: 1969 },
  { title: "אנשים טובים באמצע הדרך", artist: "נורית גלרון", year: 1979 },

  // ── רוק / אלטרנטיבי ─────────────────────────────────────────────────────────
  { title: "כשהלב בוכה", artist: "כנסיית השכל", year: 1996 },
  { title: "אמצע החיים", artist: "מוניקה סקס", year: 1996 },
  { title: "בשבילה", artist: "בית הבובות", year: 1994 },
  { title: "בואי נדבר", artist: "היהודים", year: 2003 },
  { title: "אני רוצה", artist: "דני סנדרסון", year: 1980 },
];

module.exports = SONGS4;
