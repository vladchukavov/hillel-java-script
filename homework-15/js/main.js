document.querySelector(`.btn`).onclick = () => {
    toggleModal(`Привіт 1`);
    toggleModal(`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, officiis sed.
        Fugit ipsam non sequi.`);
    toggleModal(`Привіт 2`);
}
function toggleModal (content) {
    let existedModals = document.querySelectorAll(`dialog[open]`);
    let offset = 0;
    if (existedModals[0]) {
        offset = Array.from(existedModals).reduce(callback, 0);
    }
    let modal = createModal(content, offset);
    document.querySelector(`body`).appendChild(modal)
}
function callback(acc, modal) {
    // - your code - //
    return acc + modal.clientHeight;
}
function createModal(content, top = 0) {
    let modal = document.createElement(`dialog`);
    modal.innerText = content;
    modal.classList.add(`active`);
    modal.style.transform = `translate(0, ${top}px)`;
    modal.setAttribute(`open`, ``);
    return modal
}