'use strict';

const movieInfoPageContainerNode =
  document.getElementById('moviePageContainer');

console.log(movieInfoPageContainerNode);
getMovieInfoById();

function getMovieInfoById() {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  fetch(`https://www.omdbapi.com/?i=${id}&apikey=12f4eda4&`)
    .then(res => res.json())
    .then(movieInfo => {
      console.log(movieInfo);

      let movieFullInfoHTML = `
      <div class="movie__row movie__row_page">
      <div class="movie__col">
          <img class="movie__img movie__img_page" src="${movieInfo.Poster}" alt="">
      </div>
      <div class="movie__col">

          <div class="movie__title movie__title_page">${movieInfo.Title}</div>
          <div id="movie__info-year" class="movie__info_page movie__info-low-margin">Год: <span class="movie-span__info">${movieInfo.Year}</span></div>
          <div id="movie__info-rating" class="movie__info_page movie__info-low-margin">Рейтинг: <span class="movie-span__info">${movieInfo.Rated}</span></div>
          <div id="movie__info-date" class="movie__info_page movie__info-low-margin">Дата выхода: <span class="movie-span__info">${movieInfo.Released}</span></div>
          <div id="movie__info-duration" class="movie__info_page movie__info-low-margin">Продолжительность: <span class="movie-span__info">${movieInfo.Runtime}</span></div>
          <div id="movie__info-genre" class="movie__info_page movie__info-low-margin">Жанр: <span class="movie-span__info">${movieInfo.Genre}</span></div>
          <div id="movie__info-director" class="movie__info_page movie__info-low-margin">Режиссер: <span class="movie-span__info">${movieInfo.Director}</span></div>
          <div id="movie__info-script" class="movie__info_page movie__info-low-margin">Сценарий: <span class="movie-span__info">${movieInfo.Writer}</span></div>
          <div id="movie__info-actors" class="movie__info_page movie__info-low-margin">Актеры: <span class="movie-span__info">${movieInfo.Actors}</span></div>
          
            </div>
        </div>
      <div class="movie__description">${movieInfo.Plot}</div> 
      
      `;
      movieInfoPageContainerNode.innerHTML += movieFullInfoHTML;
    });
}
