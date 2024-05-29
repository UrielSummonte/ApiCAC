const estaLogueado = localStorage.getItem("estaLogueado") || false

if(!estaLogueado){
    alert("Para ver contenido PREMIUM debes estar registrado")
    location.href = "../pages/registrarse.html";
}

