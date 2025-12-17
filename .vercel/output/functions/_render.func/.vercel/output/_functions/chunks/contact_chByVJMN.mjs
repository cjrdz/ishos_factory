const phoneNumber = "+5037645-4347";
const phoneNumberClean = "50376454347";
const addressLines = ["El Salvador","Ahuachapán"];
const hours = [{"label":"Lun - Viernes","value":"10:30 AM - 6:30 PM"},{"label":"Domingo","value":"10:30 AM - 6:30 PM"}];
const socialLinks = [{"name":"Instagram","url":"https://www.instagram.com/ishos_factory/?hl=en","icon":"fab fa-instagram","color":"#E4405F"},{"name":"Facebook","url":"https://www.facebook.com/ishosfactory/","icon":"fab fa-facebook","color":"#1877F2"},{"name":"TikTok","url":"https://www.tiktok.com/@ishosfactory","icon":"fab fa-tiktok","color":"#000000"}];
const contact = {
  phoneNumber,
  phoneNumberClean,
  addressLines,
  hours,
  socialLinks,
};

export { addressLines, contact as default, hours, phoneNumber, phoneNumberClean, socialLinks };
