const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const bodyParse = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

const email = "brandonfuentes025@gmail.com"
const destinatario = "edel.meza@uttt.edu.mx" 
const con = "fwogvyxnbcqdvbzg"

app.get('/generar-pdf', (req, res) => {
  // Creamos una instancia de pdfkit
  const doc = new PDFDocument();

  // Nombre que tendra nuestro archivo
  const filename = 'documento.pdf';
  
  // Configurar las cabeceras de la respuesta
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  // Enlazar el documento PDF a la respuesta
  doc.pipe(res);

  // Agregar un texto al PDF
  doc.text('Este es un ejemplo de PDF generado con Express.js y pdfkit.');

  // Finalizar el documento
  doc.end();
});

app.get('/', (req, res) => {
  res.render('index.ejs', { title: 'Página principal' });
});

app.get('/welcome', (req, res) => {
  res.status(200).send({msg: 'Hola mundo'}); 
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
      to: destinatario,
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