const API_KEY = "f3c2f051ab40d0b642d471b072c779a6";
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

// Funcion que crea el detalle de  la pelicula elegida
function crearDetalle(post) {
  const detallePost = document.createElement("div");

  //Se crea el div a insertar
  detallePost.innerHTML = `
                            <div class="" >
                                <div class="detalle-img">
                                    <img src="https://image.tmdb.org/t/p/w500${post.poster_path}">
                                </div>
                                <div class="textoDetalle">
                                    <h1>${post.title}</h1>
                                    <p> ${post.release_date}</p>
                                    <h2>Reseña</h2>
                                    <p class="resenia">${post.overview}</p>               
                                </div>
                            </div>
`;
  detallePost.className = "post";

  return detallePost;
}

// Función para cargar los detalles de la película en la página de detalles
function detalleFilm() {
  const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`;

  fetch(API_URL)
    .then((response) => response.json())
    .then((movie) => {
      const movieDetails = document.getElementById("movie-details");
      
      // Limpio el contenido
      movieDetails.innerHTML='';

      movieDetails.appendChild(crearDetalle(movie));
    })
    .catch((error) => {
      console.error("Error fetching movie details:", error);
      const movieDetails = document.getElementById("movie-details");
      movieDetails.innerHTML = `<p>Error al cargar los detalles de la película.</p>`;
    });
}

document.addEventListener("DOMContentLoaded", detalleFilm);
