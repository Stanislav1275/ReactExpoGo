import i18n from "i18next";
import { initReactI18next } from "react-i18next";

//empty for now
const resources = {};

i18n.use(initReactI18next).init({
    resources,
    //language to use if translations in user language are not available
    fallbackLng: "ru",
   
});

export default i18n;
