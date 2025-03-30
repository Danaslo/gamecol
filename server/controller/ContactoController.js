/* Tenemos que recordar que, como es un servicio que me manda correos a mí mismo, noi hace falta
    que se valide el correo. Porque parece ser que gmail tiene problemillas mandándolos desde otros.
*/
const { enviarEmail } = require('../servicios/ServicioEmail');

const enviarCorreo = async (req, res) => {
  const { subject, message } = req.body;
  
  // Vemos si se ha seleccionado un asunto y un mensaje.
  if (!subject || !message) {
    return res.status(400).json({ success: false, message: 'Rellena todos los campos' });
  }

  try {
    const to = 'ad.gamer.cave@gmail.com';  
    const resultado = await enviarEmail(to, subject, message);

    if (resultado.success) {
      return res.status(200).json({ success: true, message: 'Correo enviado con éxito' });
    } else {
      throw new Error(resultado.message || 'Error desconocido');
    }
  } catch (error) {
    console.error('Error en el envío:', error);
    return res.status(500).json({ success: false, message: 'Error al enviar el correo', error: error.message });
  }
};

module.exports = { enviarCorreo };
