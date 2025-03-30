const nodemailer = require('nodemailer');

// Transportador que hace uso de Gmail, sirve para indicar los datos de la cuenta de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ad.gamer.cave@gmail.com', 
    pass: 'uprf trsa iwfo qeqn' //COntraseña de aplicación creara en google. La que hay que liar... 
  }
});

/*
    Parece ser que se tiene que llamar sendMail porque es una función del transporter
    y así evitamos errores
*/
const enviarEmail = async (to, subject, message) => {
  const mailOptions = {
    from: 'ad.gamer.cave@gmail.com',
    to,
    subject,
    text: message
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, message: 'Correo enviado con éxito' };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, message: 'Error al enviar el correo', error };
  }
};

module.exports = { enviarEmail };
