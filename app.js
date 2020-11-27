var firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "PROJECT_ID.firebaseapp.com",
    databaseURL: "https://PROJECT_ID.firebaseio.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
    measurementId: "G-MEASUREMENT_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let titleElement = document.getElementById('movie-title');
let yearElement = document.getElementById('movie-year');
let imdbElement = document.getElementById('movie-imdb');
let imgElement = document.getElementById('movie-img');
let addBtnElement = document.getElementById('add-movie-btn');

let moviesElement = document.getElementById('movie-list');
let movieListElement = document.getElementById('movie-list-ul');

let movieDetailsElement = document.getElementById('movie-details');

let baleUrl = `https://movie-list-7755.firebaseio.com`;

fetch(`${baleUrl}/.json`)
    .then(res => res.json())
    .then(data => {
        let movieTitles = Object
            .keys(data)
            .map(key => `<li class="movie-item" data-key=${key}>${data[key].title}</li>`)
            .join('');
        
        movieListElement.innerHTML = movieTitles;
    });

movieListElement.addEventListener('click', e => {
    let movieId = e.target.dataset.key;

    fetch(`${baleUrl}/${movieId}.json`)
        .then(res => res.json())
        .then(movie => {
            movieDetailsElement.innerHTML = `${movie.title} - ${movie.year} - <a href="${movie.imdb}" target="_blank">IMDB</a> - <a href="${movie.img}" target="_blank">See Poster</a>`;
            console.log(movie);
        });

});

addBtnElement.addEventListener('click', addNewMovie)

function addNewMovie () {

    let newMovie = {
        title: titleElement.value,
        year: yearElement.value,
        imdb: imdbElement.value,
        img: imgElement.value,
    };
    
    fetch(`${baleUrl}/.json`, {
        method: "POST",
        body: JSON.stringify(newMovie)})
            .then(res => res.json())
            .then(id => {
                console.log(id.name);
                let newAddedMovieElement = document.createElement('li');
                newAddedMovieElement.innerText = newMovie.title;
                newAddedMovieElement.dataset['key'] = id.name;
                movieListElement.appendChild(newAddedMovieElement);})
            .catch(err => console.log(err));


    titleElement.value = '';
    yearElement.value = '';
    imdbElement.value = '';
    imgElement.value = '';

}

