// evento que dispara as validações
$("#botaoLogin").click(function (e) {

  e.preventDefault();

  let email = document.getElementById("Email");

  window.localStorage.setItem("usuarioLogado", email.value);

  location.reload();
});

$(document).ready(function(){
  let usuarioLogado = window.localStorage.getItem("usuarioLogado")
  
  if (usuarioLogado) {
    $('#usuario').text('Olá, '+ usuarioLogado);
  } else {
   $('#usuario').text("Olá, Visitante!");
  }
});