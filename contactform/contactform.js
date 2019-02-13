    // Initialize Firebase (ADD YOUR OWN DATA)
var config = {
    apiKey: "AIzaSyDk7RA4IdXFC8WGhMP2nyBb1T6n3XIlaaw",
            authDomain: "prueba-c2b23.firebaseapp.com",
            databaseURL: "https://prueba-c2b23.firebaseio.com",
            projectId: "prueba-c2b23",
            storageBucket: "prueba-c2b23.appspot.com",
            messagingSenderId: "157749417053"
  };
  firebase.initializeApp(config);
  
  // Reference messages collection
  var messagesRef = firebase.database().ref('messages');
  
  // Listen for form submit
  document.getElementById('contactForm').addEventListener('submit', submitForm);
  
  // Submit form
  function submitForm(e){
    e.preventDefault();
  
    // Get values
    var name = getInputVal('name');
    var company = getInputVal('company');
    var email = getInputVal('email');
    var phone = getInputVal('phone');
    var ciudad = getInputVal('ciudad');
    var cedula = getInputVal('cedula');
    var message = getInputVal('message');
    var cedula = validarcedula('ced');

    // Save message
    saveMessage(name, company, email, phone, ciudad, cedula, message);
  
    // Show alert
    document.querySelector('.alert').style.display = 'block';
  
    // Hide alert after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').style.display = 'none';
    },3000);
  
    // Clear form
    document.getElementById('contactForm').reset();
  }
    

  // Function to get get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }
   // validar cedula
     
   function validarcedula(ced) {
    var i;
    var cedula = ced;
    nif_valido = 1;
    if (cedula.length != 10) {
        alert("Ingrese una cédula válida.");
        nif_valido = 0;
        return false;
    }
    var acumulado;
    var instancia;
    acumulado = 0;
    for (i = 1; i <= 9; i++) {
        if (i % 2 != 0) {
            instancia = cedula.substring(i - 1, i) * 2;
            if (instancia > 9) instancia -= 9;
        } else instancia = cedula.substring(i - 1, i);
        acumulado += parseInt(instancia);
    }
    while (acumulado > 0)
        acumulado -= 10;
    if (cedula.substring(9, 10) != (acumulado * -1)) {
        alert("La cédula ingresada no es válida.");
        nif_valido = 0;
        return false;
    }

    return true;
}
  // Save message to firebase
  function saveMessage(name, company, email, phone, ciudad, cedula, message){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      name: name,
      company:company,
      email:email,
      phone:phone,
      ciudad:ciudad,
      cedula:cedula,
      message:message
    });
  }
  