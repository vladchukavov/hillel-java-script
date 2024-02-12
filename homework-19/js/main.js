const BASE_URL = 'http://www.omdbapi.com/?apikey=21eac196&'
const searchMovieForm = document.forms.searchMovieForm
const queryField = document.querySelector('#query')
const results = document.querySelector('.search-results')
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

searchMovieForm.addEventListener('submit', function () {
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
