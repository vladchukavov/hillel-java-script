const lastSearchMovie = document.querySelector('.last_search__movie');
const webSocketMovie = `wss://socketsbay.com/wss/v2/searchMovie/6cec6f56ef0d1d06678d360ec4bfdbab/`
let webSocket = new WebSocket(webSocketMovie)

webSocket.onmessage = function (event) {
    const movieInput = document.querySelector('.form__input').value;
    console.log(lastSearch(movieInput))
    lastSearchMovie.innerHTML = lastSearch(movieInput);
}

function lastSearch(text) {
    return `<span class="now-search">Now search: ${text}</span>`;
}
console.log(document.querySelector('.last_search__movie'));
console.log(document.querySelector('.form__input'));