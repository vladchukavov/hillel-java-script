let timer = null
let interval = 1000
const input = document.querySelector(`#text`)
let inputText
input.addEventListener('input', function(event) {
    inputText = event.target.value;
    debounce()
    });
function startTimer() {
        clearTimeout(timer)
   timer = setTimeout(() => {
        console.log(interval,`test`)
        console.log(inputText)
       timer = null
    }, interval);
}
function debounce() {
    if (inputText && inputText !== '') {
        startTimer()
    }
}
