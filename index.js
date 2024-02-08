const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const bodyParse = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

const email = "brandonfuentes025@gmail.com"
const con = "fwogvyxnbcqdvbzg"

app.get('/generar-pdf', (req, res) => {
  const doc = new PDFDocument();

  const filename = 'documento.pdf';
  
  res.setHeader('Content-Type', 'application/pdf');
  
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  doc.pipe(res);

  doc.text('Este es un ejemplo de PDF generado con Express.js y pdfkit.');

  doc.end();
});

app.get('/', (req, res) => {
  res.status(200).send({msg: `Hola mundo`});
});

app.post('/welcome', (req, res) => {
  const { username } = req.body;
  res.status(200).send({msg: `Hola, ${username}`}); 
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: email,
      pass: con,
  },
});

app.get('/enviar-correo', (req, res) => {
  const mailOptions = {
      from: email,
      to: email, //Destinatiario
      subject: 'Hola desde Express.js',
      text: 'Probando sistema de correo con Espress.js y nodemailer',
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error al enviar el correo:', error);
          res.status(500).send('Error al enviar el correo');
      } else {
          console.log('Correo enviado con éxito:', info.response);
          res.send('Correo enviado con éxito');
      }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});