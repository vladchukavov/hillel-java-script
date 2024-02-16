const BASE_URL = 'http://www.omdbapi.com/?apikey=21eac196&'
const searchMovieForm = document.forms.searchMovieForm
const queryField = document.querySelector('#query')
const results = document.querySelector('.search-results')
const lastSearchMovie = document.querySelector('.last_search__movie');
const webSocketMovie = `wss://socketsbay.com/wss/v2/1/b6bef236013782e8f64b66fb70c2e603/`
let webSocket = new WebSocket(webSocketMovie)
let loading = false
async function searchMovie(query) {
    loading = true
    let res = await fetch(`${BASE_URL}s=${query}`)
    let data = await res.json()
    data.Search.forEach(item => {
        results.appendChild(renderSearchItem(item))
    })
    loading = false
    return data
}
function renderSearchItem(item) {
    let wrap = document.createElement('article')
    wrap.classList.add('search-results__item')

    let poster = document.createElement('picture')
    poster.classList.add('search-results__poster')
    poster.innerHTML = `<img src="${item.Poster}}" alt="${item.Title}" >`
    wrap.appendChild(poster)

    let title = document.createElement('h2')
    title.classList.add('search-results__title')
    title.innerText = item.Title;
    wrap.appendChild(title)

    let about = document.createElement('p')
    about.classList.add('search-results__about')
    about.innerHTML += `<span class="search-results__year">${item.Year}</span>`
    about.innerHTML += `<span class="search-results__type">${item.Type}</span>`
    wrap.appendChild(about)

    let link = document.createElement('a')
    link.setAttribute('href',`single.html?i=${item.imdbID}`)
    link.innerText = 'About'
    link.innerHTML += '<span class="material-symbols-outlined">arrow_forward_ios</span>'
    wrap.appendChild(link)

    return wrap
}

searchMovieForm.addEventListener('submit', function (event) {
    event.preventDefault()
    if(event.target.elements.query.value.length > 2) {
        searchMovie(event.target.elements.query.value)
    }
})

searchMovie('iron man')

document.addEventListener('scroll', function () {
    let mainHeight = document.querySelector('.search-results').clientHeight

    if(document.querySelector('.search-results').getBoundingClientRect().bottom - 100 < window.innerHeight && !loading) {
       // searchMovie(query)
        loading = true
        console.log('start request')
   }
})

webSocket.onmessage = function (event) {
    const movieInput = event.data
    lastSearchMovie.innerHTML += lastSearch(movieInput)
}
document.querySelector(`.last_search__movie`).addEventListener(`submit`, function (event){
    event.preventDefault()
    webSocket.send(event.target.elements.text.value)
})

function lastSearch(text) {
    return `<li class="last-search-item"><span class="now-search">Now search: ${text}</span></li>`
}

