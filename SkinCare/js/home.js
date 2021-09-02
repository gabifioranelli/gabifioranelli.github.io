$(document).ready(function(){
  let usuarioLogado = window.localStorage.getItem("usuarioLogado")
  
  if (usuarioLogado) {
    $('#usuario').text('Olá, '+ usuarioLogado);
  } else {
   $('#usuario').text("Olá, Visitante!");
  }
});