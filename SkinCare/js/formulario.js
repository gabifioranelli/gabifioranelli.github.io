// VALIDAÇÃO DE FORMULÁRIO

class Validator {

  validations = [];

  currentPassword = "";
  currentEmail = "";


  constructor() {
    this.validations = [
      'data-email',
      'data-password'
    ]
  }

  // iniciar a validação de todos os campos
  validate(form) {
    //  pegar os inputs e os selects
    let inputs = form.getElementsByTagName('input');

    // tranforma uma HTMLCollection -> array
    let inputsArray = [...inputs];

    // uma array com os resultados (true ou false) de cada validação
    let resultados = [];

    // loop nos inputs e validação dos dados
    inputsArray.forEach(function (input) {

      // loop com todas as validações
      for (let i = 0; this.validations.length > i; i++) {

        // verifica se a validação atual existe no input
        if (input.getAttribute(this.validations[i]) != null) {

          // limpando a string para se tornar num método
          let method = this.validations[i].replace('data-', '').replace('-', '');

          // valor do input
          let value = input.getAttribute(this.validations[i]);

          // invocar o método - retorna um resultado (true ou false)
          let resultado = this[method](input, value);

          // array resultados está recebendo todas as respostas das validações
          resultados.push(resultado);
        }
      }
    }, this);
    return resultados.every(function (elemento) {
      return elemento === true;
    });
  }

  // validar email
  email(input) {
    let regex = /\S+@\S+\.\S+/;

    let email = input.value;

    if (!regex.test(email)) {
      alert(`Insira um e-mail válido`);
      return false;
    }

    this.currentEmail = email;
    return true;
  }

  // validar senha
  password(input) {
    if(!input.value) {
      alert("Digite uma senha");
      return false;
    } 
    let idConfirmar = input.getAttribute("data-password");
    let confirmar = document.getElementById(idConfirmar);

    if(input.value === confirmar.value) {
      this.currentPassword = input.value;
      return true;
    }

    alert("Senhas diferentes");
    return false;
  }

}

let form = document.getElementById("registro");
let submit = document.getElementById("btnSubmit");
let validator = new Validator();

// evento que dispara as validações
submit.addEventListener('click', function (e) {

  e.preventDefault();

  if (validator.validate(form)) {
    window.localStorage.setItem("usuarioLogado", validator.currentEmail);
  }
});

$(document).ready(function(){
  let usuarioLogado = window.localStorage.getItem("usuarioLogado")
  
  if (usuarioLogado) {
    $('#usuario').text('Olá, '+ usuarioLogado);
  } else {
   $('#usuario').text("Olá, Visitante!");
  }
});