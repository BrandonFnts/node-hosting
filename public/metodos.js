function descargar() {
    axios({
      url: 'https://node-hosting-production.up.railway.app/generar-pdf',
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ticket.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch(error => console.error(error));
}
  
function enviar() {
    axios.get('https://node-hosting-production.up.railway.app/enviar-correo')
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
}
  
let botonDescargar = document.getElementById("descargar");
botonDescargar.addEventListener("click", descargar);
  
let botonEnviar = document.getElementById("enviar");
botonEnviar.addEventListener("click", enviar);
  