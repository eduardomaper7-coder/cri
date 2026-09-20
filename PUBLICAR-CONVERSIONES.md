# Publicar WhatsApp y Pedir cita

La web ya no tiene formulario ni envío de correo. No necesita SMTP ni una función de Vercel.

La etiqueta base AW-17884011678 está incluida en las 55 páginas mediante assets/js/ads.js y se carga tras aceptar las cookies de medición.

Ambas conversiones están configuradas en assets/js/ads.js con los identificadores proporcionados por Google Ads: WhatsApp usa uNeICKDOyP4cEJ654c9C y Pedir cita usa V8xWCIS-y_4cEJ654c9C. No hace falta pegar otros fragmentos en los botones.

Los enlaces de WhatsApp y Doctoralia se detectan en toda la web, incluidos pie, cabecera y botones flotantes. Se miden clics, no mensajes enviados ni reservas confirmadas.

Sube las páginas y assets a GitHub. Si publicaste antes api/contact.js, publica también su eliminación. El sitio funciona como web estática, sin build ni configuración SMTP. No se ha desplegado desde esta tarea.

Tras publicar, comprueba ambos eventos con Tag Assistant aceptando cookies. Al rechazar no se carga Google Ads. Revisa recuento Una, optimización principal/secundaria y objetivos de las campañas. Las pruebas locales comprueban los dos identificadores reales sin enviar eventos a Google; queda pendiente validar la instalación en producción.

