'use strict';

const searchInputNode = document.getElementById('js-input__search');
const btnSearchMovieNode = document.getElementById('js-btn__search');
const movieCardContainerNode = document.getElementById('moviesContainer');
const movieNotFoundContainerNode = document.getElementById('movieNotFound');

btnSearchMovieNode.addEventListener('click', function (e) {
  e.preventDefault();

  if (searchInputNode.value === '') {
    movieNotFound();
  }
  if (searchInputNode.value) {
    movieFound();

    const movieNameFromUser = getMovieNameFromUser();
    getMovieInfoFromServer(movieNameFromUser);
    searchInputNode.value = '';
  }
});

function getMovieNameFromUser() {
  const movieName = searchInputNode.value;
  return movieName;
}

function movieNotFound() {
  btnSearchMovieNode.classList.add('btn_active');
  movieNotFoundContainerNode.classList.add('movie__not-found__wrapper_active');
}

function movieFound() {
  btnSearchMovieNode.classList.remove('btn_active');
  movieNotFoundContainerNode.classList.remove(
    'movie__not-found__wrapper_active'
  );
}

function getMovieInfoFromServer(movie) {
  let movieCardHTML = '';

  fetch(`https://www.omdbapi.com/?id=1&apikey=12f4eda4&t=${movie}`)
    .then(responce => responce.json())
    .then(res => {
      if (res.Response === 'False') {
        movieNotFound();
        return;
      }
      if (res.Response) {
        movieFound();

        movieCardHTML = `
        <a class="movie__link" href="movie.html?id=${res.imdbID}">
          <div id="movieCard" class="movie__row movie__row_search">
              <div class="movie__col">
                  <img class="movie__img" src="${res.Poster}" alt="">
              </div>
              <div class="movie__col">
                  <div class="movie__title">${res.Title}</div>
                  <div class="movie__year">${res.Year}</div>
                  <div class="movie__type">${res.Type}</div>
              </div>
              </div>
          </a>
        `;
        movieCardContainerNode.innerHTML += movieCardHTML;
      }
    });
}
