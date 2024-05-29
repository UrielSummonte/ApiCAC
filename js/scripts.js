//Array para guarda los usuario cargados
const usuarios = [];

//Clase usuario
class Usuario {
  constructor({ nombre, apellido, email, contrasenia, nacimiento, pais }) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.contrasenia = contrasenia;
    this.nacimiento = nacimiento;
    this.pais = pais;
  }
}

//Funcion para validar las cadenas ingresadas en nombre y apellido
function validarApellidoNombre(input) {
  // Obtener el valor del input
  var valor = input.value;
  // Expresión regular para verificar el formato del apellido
  var regex = /^[A-Za-z][A-Za-z\s]*$/;
  // Verificar si el valor cumple con la expresión regular y no comienza con espacios en blanco
  if (!regex.test(valor) || /^\s/.test(valor)) {
    // Si no cumple, eliminar los caracteres no permitidos y los espacios iniciales
    input.value = valor.replace(/^\s+/, "").replace(/[^A-Za-z\s]/g, "");
  }
}

//Funcion que busca si un nombre y apellido ya se encuentra en el local storage
function busquedaLocal(nom, ape) {
  // Recuperar el array desde localStorage
  const storedUsuarios = localStorage.getItem("usuarios");
  // Parsear el array
  const usuariosLocal = storedUsuarios ? JSON.parse(storedUsuarios) : [];
  return usuariosLocal.find(
    (usuario) => usuario.nombre === nom && usuario.apellido === ape
  );
}

//Funcion que busca un email y password en el local storage
function busquedaLogin() {
  const mail = document.getElementById("emailLogin").value;
  const pass = document.getElementById("passwordLogin").value;
  // Recuperar el array desde localStorage
  const storedUsuarios = localStorage.getItem("usuarios");
  // Parsear el array
  const usuariosLocal = storedUsuarios ? JSON.parse(storedUsuarios) : [];
  return usuariosLocal.find(
    (usuario) => usuario.email === mail && usuario.contrasenia === pass
  );
}

// Permite eEsperar a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", function () {
  // Captar el formulario de registro por ID
  const formRegistro = document.getElementById("formularioRegistro");
  // Captar el formulario de inicio de sesión por ID
  const formLogin = document.getElementById("formularioLogin");
  // Añadir listener al formulario de registro
  if (formRegistro) {
    formRegistro.addEventListener("submit", function (event) {
      // Prevenir el envío del formulario
      event.preventDefault();
      cargarUsuario();
      // Se limpia el formulario
      formRegistro.reset();
    });
  }

  // Añadir listener al formulario de inicio de sesión
  if (formLogin) {
    formLogin.addEventListener("submit", function (event) {
      // Prevenir el envío del formulario
      event.preventDefault();

      const busquedaUsuario = busquedaLogin();
      if (!busquedaUsuario) {
        alert("Inicio de sesión no válido");
      } else {
        alert(
          "Inicio de sesión exitoso. Sera dirigido a la pagina correspondiente"
        );

        localStorage.setItem("estaLogueado", true);

        //location.href = "../index.html";

        //Al aceptar se dirige a la pagina apitest en 1.2seg
         setTimeout(() => {
           location.href = "apitest.html";
        }, 1200);
      }
      formLogin.reset();
    });
  }
});

//Funcion que permite la carga de un usuario, asignando a las variables las funciones de cada caso, luego genera un nuevo objeto y lo guarda en el arreglo de usuarios
function cargarUsuario() {
  // Se captura los valores de los inputs y se hacen los calculos correspondientes
  const nom = document.getElementById("nombreRegistro").value.toUpperCase();
  const ape = document.getElementById("apellidoRegistro").value.toUpperCase();
  const mail = document.getElementById("emailRegistro").value;
  const pass = document.getElementById("passwordRegistro").value;
  const nacimiento = document.getElementById("fechaNacimientoRegistro").value;
  const pais = document.getElementById("paisRegistro").value;

  const resultadoBusqueda = busquedaLocal(nom, ape);

  if (resultadoBusqueda) {
    alert("El usuario ya existe. Usuario no registrado");
  } else {
    const usuario = new Usuario({
      nombre: nom,
      apellido: ape,
      email: mail,
      contrasenia: pass,
      nacimiento: nacimiento,
      pais: pais,
    });
    // Se carga el alumno el array de usuarios
    usuarios.push(usuario);

    // Se guarda el array en el local storage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert(
      "Usuario Registrado. Ahora inicia sesion para acceder a la seccion premium"
    );

    location.href = "../pages/iniciosesion.html";
  }
}

function crearPost(post) {
  const elementoPost = document.createElement("a");

  elementoPost.href = `./detalles1.html?id=${post.id}`;
  console.log(elementoPost.href);

  //Se crea el enlace a insertar
  elementoPost.innerHTML = `
                    <a href="../pages/detalles1.html?id=${post.id}">
                         <div class="peliculaTendencia">
                             <img class="imgTendencia" src="https://image.tmdb.org/t/p/w500${post.poster_path}">
                             <div class="tituloPeliculaTendencia">
                                 <h4>${post.title}</h4>
                             </div>
                         </div>
                      </a> 
     `;
  elementoPost.className = "post";

  return elementoPost;
}

document.addEventListener("DOMContentLoaded", async function () {
  // Key obtenida en la pagina TMDB
  const apiKey = "f3c2f051ab40d0b642d471b072c779a6";
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=1`;

  // Funcion para obtener los datos de la api TMDB
  async function obtenerFilms() {
    try {
      const respuesta = await fetch(apiUrl);
      const data = await respuesta.json();
      displayMovies(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Funcion que muestra las peliculas en la pagina apitest
  function displayMovies(movies) {
    const elementosPost = document.getElementById("posts");

    // Limpiar cualquier contenido anterior
    elementosPost.innerHTML = "";

    // Recorre las peliculas y va creando los post y agregando a la pagina
    movies.forEach((movie) => {
      const ElementoFilm = crearPost(movie);
      elementosPost.appendChild(ElementoFilm);
    });
  }

  // Llamar a la función fetchMovies
  await obtenerFilms();
});
