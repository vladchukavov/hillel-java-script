const chat = $('.chat__messages')

const wsUri = "wss://socketsbay.com/wss/v2/1/137dd49667bf3ab48d12d9eae8ce1f07/";

let chatSocket = new WebSocket(wsUri)

chatSocket.onopen = function (event) {
    chat.append(showMsg('socket is open', 'open'))

    // chat.innerHTML += showMsg('socket is open', 'open')
}
chatSocket.onclose = function (event) {
    chat.append(showMsg('socket is closed', 'close'))
}
chatSocket.onmessage = function (event) {
    chat.append(showMsg(event.data, 'inbound'))
}
chatSocket.onerror = function (event) {
    chat.append(showMsg(event.data, 'error'))
}

document.querySelector('.chat__exit').onclick = function () {
    chatSocket.close()
}

$('.chat__form').on('submit', function(event) {
    event.preventDefault()
    let userName = localStorage.getItem('userName')
    if(!userName) {
        userName = prompt('Enter your name')
    } else {
        localStorage.setItem('userName', userName)
        chatSocket.send(userName+": " + event.target.elements.msg.value)
        chat.append(showMsg("You:" + event.target.elements.msg.value, 'outcome'))
        event.target.reset()
    }
})

function showMsg(msg, type) {

    return $('<span></span>').addClass(['msg', `msg--${type}`]).text(msg)

}


$( "#selectable" ).selectable();
