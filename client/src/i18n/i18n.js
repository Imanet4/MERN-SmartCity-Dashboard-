import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      "nav.dashboard": "Dashboard",
      "nav.weather": "Weather",
      "nav.events": "Events",
      "nav.map": "Map",
      "nav.profile": "Profile",
      "nav.login": "Login",
      "nav.logout": "Logout",
      "nav.register": "Register",

      // Common
      "common.loading": "Loading...",
      "common.error": "Error",
      "common.success": "Success",
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.view": "View",

      // Dashboard
      "dashboard.title": "Smart City Dashboard - Agadir",
      "dashboard.welcome": "Welcome to Agadir Smart City",
      "dashboard.subtitle": "Building the future of urban management",

      // Weather
      "weather.title": "Weather Forecast",
      "weather.current": "Current Weather",
      "weather.temperature": "Temperature",
      "weather.humidity": "Humidity",
      "weather.wind": "Wind Speed",

      // Events
      "events.title": "City Events",
      "events.upcoming": "Upcoming Events",
      "events.create": "Create Event",
      "events.date": "Date",
      "events.location": "Location",

      // Auth
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.confirmPassword": "Confirm Password",
      "auth.firstName": "First Name",
      "auth.lastName": "Last Name",
      "auth.loginTitle": "Login to Your Account",
      "auth.registerTitle": "Create New Account",
      "auth.forgotPassword": "Forgot Password?",
      "auth.noAccount": "Don't have an account?",
      "auth.hasAccount": "Already have an account?",
    },
  },
  ar: {
    translation: {
      // Navigation
      "nav.dashboard": "لوحة التحكم",
      "nav.weather": "الطقس",
      "nav.events": "الأحداث",
      "nav.map": "الخريطة",
      "nav.profile": "الملف الشخصي",
      "nav.login": "تسجيل الدخول",
      "nav.logout": "تسجيل الخروج",
      "nav.register": "إنشاء حساب",

      // Common
      "common.loading": "جاري التحميل...",
      "common.error": "خطأ",
      "common.success": "نجح",
      "common.save": "حفظ",
      "common.cancel": "إلغاء",
      "common.delete": "حذف",
      "common.edit": "تعديل",
      "common.view": "عرض",

      // Dashboard
      "dashboard.title": "لوحة تحكم المدينة الذكية - أكادير",
      "dashboard.welcome": "مرحباً بكم في أكادير المدينة الذكية",
      "dashboard.subtitle": "بناء مستقبل الإدارة الحضرية",

      // Weather
      "weather.title": "توقعات الطقس",
      "weather.current": "الطقس الحالي",
      "weather.temperature": "درجة الحرارة",
      "weather.humidity": "الرطوبة",
      "weather.wind": "سرعة الرياح",

      // Events
      "events.title": "أحداث المدينة",
      "events.upcoming": "الأحداث القادمة",
      "events.create": "إنشاء حدث",
      "events.date": "التاريخ",
      "events.location": "الموقع",

      // Auth
      "auth.email": "البريد الإلكتروني",
      "auth.password": "كلمة المرور",
      "auth.confirmPassword": "تأكيد كلمة المرور",
      "auth.firstName": "الاسم الأول",
      "auth.lastName": "اسم العائلة",
      "auth.loginTitle": "تسجيل الدخول إلى حسابك",
      "auth.registerTitle": "إنشاء حساب جديد",
      "auth.forgotPassword": "نسيت كلمة المرور؟",
      "auth.noAccount": "ليس لديك حساب؟",
      "auth.hasAccount": "لديك حساب بالفعل؟",
    },
  },
  fr: {
    translation: {
      // Navigation
      "nav.dashboard": "Tableau de bord",
      "nav.weather": "Météo",
      "nav.events": "Événements",
      "nav.map": "Carte",
      "nav.profile": "Profil",
      "nav.login": "Connexion",
      "nav.logout": "Déconnexion",
      "nav.register": "S'inscrire",

      // Common
      "common.loading": "Chargement...",
      "common.error": "Erreur",
      "common.success": "Succès",
      "common.save": "Enregistrer",
      "common.cancel": "Annuler",
      "common.delete": "Supprimer",
      "common.edit": "Modifier",
      "common.view": "Voir",

      // Dashboard
      "dashboard.title": "Tableau de bord Ville Intelligente - Agadir",
      "dashboard.welcome": "Bienvenue à Agadir Ville Intelligente",
      "dashboard.subtitle": "Construire l'avenir de la gestion urbaine",

      // Weather
      "weather.title": "Prévisions météo",
      "weather.current": "Météo actuelle",
      "weather.temperature": "Température",
      "weather.humidity": "Humidité",
      "weather.wind": "Vitesse du vent",

      // Events
      "events.title": "Événements de la ville",
      "events.upcoming": "Événements à venir",
      "events.create": "Créer un événement",
      "events.date": "Date",
      "events.location": "Lieu",

      // Auth
      "auth.email": "Email",
      "auth.password": "Mot de passe",
      "auth.confirmPassword": "Confirmer le mot de passe",
      "auth.firstName": "Prénom",
      "auth.lastName": "Nom de famille",
      "auth.loginTitle": "Connectez-vous à votre compte",
      "auth.registerTitle": "Créer un nouveau compte",
      "auth.forgotPassword": "Mot de passe oublié ?",
      "auth.noAccount": "Vous n'avez pas de compte ?",
      "auth.hasAccount": "Vous avez déjà un compte ?",
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
