'use strict';

const searchInputNode = document.getElementById('js-input__search');
const btnSearchMovieNode = document.getElementById('js-btn__search');
const movieCardContainerNode = document.getElementById('moviesContainer');

btnSearchMovieNode.addEventListener('click', function () {
  if (searchInputNode.value === '') {
    let notFoundHTML = `
    <div class="moive__not-found">Фильмы не найдены</div>`;
    movieCardContainerNode.innerHTML = notFoundHTML;
  }
  if (searchInputNode.value) {
    movieCardContainerNode.innerHTML = '';
    const movieNameFromUser = getMovieNameFromUser();
    getMovieInfoFromServer(movieNameFromUser);
  }
});

function validation() {
  if (!searchInputNode) {
    return null;
  }
}

function getMovieNameFromUser() {
  const movieName = searchInputNode.value;
  return movieName;
}

function getMovieInfoFromServer(movie) {
  let movieCardHTML = '';

  fetch(`http://www.omdbapi.com/?id=1&apikey=12f4eda4&t=${movie}`, {
    method: 'POST',
  })
    .then(responce => {
      console.log(responce);
      return responce.json();
    })
    .then(res => {
      //   console.log(res.Response);
      console.log(res);

      const params = new URLSearchParams(location.search);
      const id = params.get('id');
      console.log(id);

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
    });
}
