import { ReactElement } from "react"

interface Props { language: (val: boolean) => void }

export function AboutHe({ language }: Props): ReactElement {

    const scrol = (top: number) => {
        window.scrollTo({
            top,
            behavior: "smooth",
        })
    }

    return <section dir="rtl" >
        <section className='title'>
            <button className="button language" onClick={() => language(false)}>English</button>
            אודות המערכת</section>

        <section className="screen-continer">
            <div className="side-bar">
                <ul className="list">
                    <li><div className="key" onClick={() => scrol(20)}>כללי</div></li>
                    <li><div className="key" onClick={() => scrol(210)}>בקרת חדרים</div></li>
                    <li><div className="key" onClick={() => scrol(780)}>כניסת משתמשים</div></li>
                    <li><div className="key" onClick={() => scrol(1300)}>ניהול משתמשים</div></li>
                    <li><div className="key" onClick={() => scrol(1640)}>יומן אירועים</div></li>
                </ul>
            </div>
            <div className="text-continer">
                <p className="subtitle" >כללי</p>
                <p className="txt">אפליקציית מערכת הבקרה -
                    Fan Coil Units,
                    מתארת חלק מתוך מערכת בקרת מבנה,
                    ומספקת שליטה ובקרה על הטמפרטורות בכל חלקי במתחם, כולל קבלת התרעות על חריגות.
                    <br />
                    <br />
                    האפליקציה מדמה מתחם של ארבעה מגדלים, כל אחד בן ארבעים קומות,
                    בכל קומה אזורים וחדרים שונים עם יחידות קירור, המחוברות בתקשורת למערכת הבקרה הראשית.</p>

                <p className="subtitle" >בקרת חדרים</p>
                <p className="txt">מטרת המערכת לאפשר למתפעל לשלוט דרך האפליקציה על האקלים והפעלת המיזוג
                    בכל חדר, בכל קומה, בכל אחד מהבניינים במתחם.
                    <br />
                    <br />לכל יחידת מיזוג יש שורת תפעול המציגה את הטמפרטורה בחדר ואת סטטוס הפעולה.
                    בשורת התפעול ניתן לבצע: הפעלה וכיבוי של היחידה,
                    הגדרת טמפרטורה רצויה, בחירת מצב פעולה (חימום קירור וכו'), בחירת עוצמת מאוורר.
                    <br />
                    <br />כל התצוגות על המסך מתקבלות מבסיס הנתונים וכל הפקודות נשלחות לבסיס הנתונים,
                    המדמה כניסות ויציאות או חיבור בתקשורת למערכות מיזוג מציאותיות.
                    <br />
                    <br />בנוסף המערכת מתריעה על חריגה משמעותית בין הטמפרטורה הרצויה שהוגדרה לטמפרטורה בחדר,
                    המעידה על תקלה טכנית המצריכה טיפול של צוות האחזקה.
                    לצורך כך יש להגדיר בשורת ההפעלה את הפרש הטמפרטורה ומשך הזמן עד להעלאת התרעה.
                    <br />
                    <br />לדוגמא: אם נגדיר טמפרטורה רצויה ℃ 20, הפרש טמפרטורה ℃ 3, זמן להתרעה 20 שניות,
                    :אם הטמפרטורה בחדר תעמוד על ℃ 23 או יותר, למשך 20 שניות, המערכת תעלה התרעה.
                    תצוגת התרעה תופיע בשורת התפעול והתרעה חדשה תתוסף ליומן האירועים.
                    כאשר הטמפרטורה תשוב לטווח הרצוי,
                    תצוגת ההתרעה תעלם, והאירוע ביומן האירועים יעבור לסטטוס סגור (ע"ע).
                    <br />
                    <br />חשוב: מאחר ומדובר במערכת ווירטואלית, דהיינו שבסיס הנתונים איננו מחובר למערכת מיזוג אמיתית,
                    טמפרטורות  החדרים המוצגות במסך נוצרות באמצעות מחולל טמפרטורות חכם,
                    המדמה סיטואציה המזכירה מצבי אמת בחדרים ממוזגים, כולל חריגות.
                </p>

                <p className="subtitle" >משתמשים</p>
                <div className="txt">המערכת מסופקת עם שלוש קבוצות משתמשים:
                    <ul>
                        <li>View only: משתמשים לצפייה בלבד, אינם מורשים כלל לבצע שינויים.</li>
                        <br />
                        <li>Operation: משתמשים המורשים לתפעל את המערכת באופן מלא
                            אך אינם מורשים לבצע שינויי עריכה,
                            כגון הוספה ומחיקה של משתמשים.
                        </li>
                        <br />
                        <li>Administration: משתמשים עם הרשאה גורפת לכל הפונקציות באפליקציה.
                        </li>
                    </ul>
                    במערכת מוגדרים ברשימת המשתמשים שלושה משתמשים קבועים אשר אינם ניתנים למחיקה או לעריכה דרך הדפדפן:
                    <ul>
                        <li>View: משתמש לצפייה בלבד.
                            <br />פרטי כניסה - "User name: "view", password: "1111
                        </li>
                        <li>Operator: משתמש המורשה לתפעל את המערכת.
                            <br />פרטי כניסה - "User name: "operator" password: "2222
                        </li>
                        <li>Admin: משתמש עם הרשאת Administration.
                            <br />פרטי כניסה - "User name: "admin", password: "3333
                        </li>
                    </ul>
                    כניסת משתמש למערכת מתבצעת דרך הלחצן "Login user" בצד
                    ימין של התפריט העליון של המסך.
                </div>

                <p className="subtitle" >ניהול משתמשים</p>
                <p className="txt">מסך ניהול משתמשים מציג את כל רשימת המשתמשים הרשומים במערכת.
                    משתמש עם הרשאה מתאימה יוכל להגדיר משתמשים חדשים, להסיר לצמיתות משתמשים קיימים,
                    וכן לעדכן סיסמא או רמת הרשאה למשתמשים קיימים.
                    <br />
                    <br />
                    חשוב: שלושת משתמשי ברירת המחדל הקבועים, אינם ניתנים לשינוי או להסרה.
                    <br />
                    <br />
                    הוספת משתמש: בחלונית Add User יש להגדיר שם משתמש וסיסמא,
                    לבחור רמת הרשאה וללחוץ Aply.
                    <br />
                    <br />
                    עדכון פרטי משתמש: לחיצה על Update בשורת המשתמש תפתח את חלונית העידכון,
                    יש לשנות את הפרטים הרצויים, סיסמא, רמת הרשאה, או שניהם וללחוץ Aply.
                    <br />
                    <br />
                    הסרת משתמש לצמיתות: לחיצה על Delete בשורת המשתמש תגרום למחיקתו מהמערכת.</p>

                <p className="subtitle" >יומן אירועים</p>
                <p className="txt">
                    ביומן זה מוצגים 3000 האירועים האחרונים שנרשמו,
                    ומכילים תיעוד של חריגות הטמפרטורה בחדרים השונים במתחם.
                    <br />
                    <br />
                    פתיחת התרעה: כאשר ישנה חריגת טמפרטורה באיזור מסויים
                    ברמה ולמשך זמן כפי
                    שהוגדרו בניהול הבקרה תפתח התרעה ותתווסף ליומן עם חותמת זמן תחילת ההתרעה.
                    <br />
                    <br />
                    סגירת התרעה: כאשר הטמפרטורה חוזרת לטווח הרצוי
                    סטטוס ההתרעה הופך לסגור, עם חותמת הזמן של עיתוי הסגירה.
                    <br />
                    <br />
                    קבלת התרעה: כאשר המשתמש מאשר קבלת התרעה הסטטוס עובר למוכר,
                    עם חותמת הזמן ב-Acknolage time.
                    <br />
                    <br />
                    גווני רקע: רקע שורת ההתרעה משתנה לפי הסטטוס.
                    <br />
                    התרעה פתוחה ללא אישור קבלה - רקע אדום
                    <br />
                    התרעה פתוחה עם אישור קבלה - רקע סגול
                    <br />
                    התרעה סגורה ללא אישור קבלה - רקע ירוק
                    <br />
                    התרעה סגורה עם אישור קבלה - נמחקת מהיומן לצמיתות
                    <br />
                    <br />
                    ניהול אירוע - לחיצה על שורת ההתרעה תגרום לפתיחת החלונית ניהול אירוע עם האפשרויות הבאות:
                    <br />
                    <br />
                    Ack selected - אישור קבלת ההתרעה שנבחרה. ביצוע Ack
                    להתרעה שנמצא כבר בסטטוס "סגור" יגרום להסרתה לצמיתות מיומן האירועים.
                    <br />
                    <br />
                    Force End - העברת הסטטוס של ההתרעה לסגור באופן כפוי למרות שהטמפרטורה טרם חזרה לטווח הרצוי.
                    סיום כפוי של התרעה שנמצאת כבר בסטטוס "אישור קבלה" יגרום להסרתה מהיומן לצמיתות.
                    <br />
                    <br />
                    Ack all alarms: העברת הסטטוס של כל ההתרעות ביומן למצב "אישור קבלה".
                    פעולה זו תגרום לכל ההתרעות הנמצאות כבר בסטטוס "סגור" להימחק מהיומן.
                    ההתרעות הנמצאות בסטטוס פתוח יעברו כולן לגוון רקע סגול.
                </p>

                <section className="summary">סוף דבר: תקוותי שתפעול האפליקציה והפונקציות השונות ידידותיות למשתמש וברורות.
                    אם יש לכם השגות הערות או הארות אל תהססו להיות בקשר 052-7635935</section>

            </div>
        </section>
    </section>
}

