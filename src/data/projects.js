const projects = [
  {
    id: 1,
    key: "coffee",
    title: "OrderFlow",
    subtitle: {
      en: "Cafe Order System",
      fa: "سیستم سفارش کافه",
      es: "Sistema de Pedidos de Café"
    },
    status: "LIVE",
    color: "#1a1a2e",
    accent: "#e94560",
    emoji: "☕",
    url: "https://hegolz-coffee.onrender.com",
    summary: {
      en: "Built a modern real-time cafe ordering system with a full order flow from menu selection to payment. Features include live cart updates, tax calculation by US state, order history with local storage, invoice printing, and a responsive mobile-first design with horizontal scroll navigation.",
      fa: "یک سیستم سفارش‌دهی مدرن و آنی برای کافه ساخته‌ام که شامل فرآیند کامل سفارش از انتخاب منو تا پرداخت است. ویژگی‌ها شامل به‌روزرسانی سبد خرید، محاسبه مالیات، تاریخچه سفارشات، چاپ فاکتور و طراحی موبایل‌محور می‌شود.",
      es: "Construí un sistema moderno de pedidos en tiempo real para cafeterías con flujo completo desde la selección del menú hasta el pago. Incluye actualizaciones en vivo del carrito, cálculo de impuestos por estado, historial de pedidos e impresión de facturas."
    },
    skills: ["React", "JavaScript", "CSS Variables", "LocalStorage", "Responsive Design"]
  },
  {
    id: 2,
    key: "english",
    title: "ReadLearn",
    subtitle: {
      en: "Learning Reader App",
      fa: "اپلیکیشن یادگیری زبان انگلیسی",
      es: "App de Lectura para Aprender Inglés"
    },
    status: "LIVE",
    color: "#0f3460",
    accent: "#e94560",
    emoji: "📖",
    url: "https://english-learning-reader-app.onrender.com",
    summary: {
      en: "Developed a minimal reading app for learning English vocabulary. Features include a book library with grid layout, Text-to-Speech with sentence highlight sync, word selection with grammar analysis, Persian translation, and vocabulary saving.",
      fa: "یک اپلیکیشن مینیمال برای یادگیری لغات انگلیسی توسعه داده‌ام. ویژگی‌ها شامل کتابخانه با طراحی شبکه‌ای، تبدیل متن به گفتار با هایلایت جمله، تحلیل دستور زبان، ترجمه فارسی و ذخیره لغات می‌شود.",
      es: "Desarrollé una app minimalista para aprender vocabulario en inglés. Incluye biblioteca de libros, texto a voz con resaltado de oraciones, análisis gramatical, traducción al persa y guardado de vocabulario."
    },
    skills: ["React.js", "JavaScript", "HTML", "CSS", "Vite", "React Router", "REST API", "Web Speech API"]
  },
  {
    id: 3,
    key: "booking",
    title: "Appointa",
    subtitle: {
      en: "SaaS Booking System",
      fa: "سیستم رزرواسیون",
      es: "Sistema de Reservas SaaS"
    },
    status: "LIVE",
    color: "#16213e",
    accent: "#0f3460",
    emoji: "📅",
    url:"https://appointa-fm1n.onrender.com",
    summary: {
       en: "Developed a full-stack appointment booking platform with secure authentication, role-based access control, appointment scheduling, reminders, and an analytics dashboard.",
        fa: "یک پلتفرم کامل رزرو نوبت توسعه داده‌ام که شامل احراز هویت امن، مدیریت نقش‌ها، زمان‌بندی نوبت‌ها، سیستم یادآوری و داشبورد تحلیلی است.",
         es: "Desarrollé una plataforma completa de reservas con autenticación segura, control de roles, programación de citas, recordatorios y panel de análisis." 
        },
    skills: ["Next.js", "TypeScript", "PostgreSQL", "Prisma ORM", "NextAuth.js", "Tailwind CSS", "REST API", "Authentication", "Role-Based Access Control", "Appointment Scheduling", "Analytics Dashboard", "Audit Logging", "Resend"]
  },
  {
    id: 4,
    key: "airline",
    title: "SkyBook",
    subtitle: {
      en: "Internal Operations Platform",
      fa: "پلتفرم عملیات داخلی",
      es: "Plataforma de Operaciones Internas"
    },
    status: "COMING SOON",
    color: "#1b1b2f",
    accent: "#e94560",
    emoji: "✈️",
    url: null,
    summary: { en: "", fa: "", es: "" },
    skills: []
  }
]

export default projects