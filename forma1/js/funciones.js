const teclas = document.querySelectorAll(".tecla"); //Almacena los divs de todas las teclas
const nota = document.querySelector(".teclaPresionada"); //div del HTML donde se mostrarán las notas al presionar en una tecla
const letrasTeclado = document.querySelectorAll(".letrasTeclado");//Almacena los span de todas las letras de las teclas

//Se encarga de reproducir el audio de la nota correspondiente
function tocarNota(e) {

    //Mediante la propiedad keyCode se obtiene el valor numérico de la tecla y del audio
    const audio = document.querySelector(`audio[data-tecla="${e.keyCode}"]`);
    const tecla = document.querySelector(`.tecla[data-tecla="${e.keyCode}"]`);

    if (!tecla) return;//Si no se encuentra una tecla, no hace nada

    const teclanota = tecla.getAttribute("data-nota");//Se obtiene la nota asociada a la tecla
    tecla.classList.add("playing");//Se le agrega la clase playing a la tecla presionada la cual tiene un css asociado
    nota.innerHTML = teclanota;//Se muestra la nota
    audio.currentTime = 0;//reestablece el tiempo del audio a cero
    audio.play();//Reproduce el audio
}

//Se encarga de quitar la transición del css de la tecla presionada
function quitarTransicion(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
}

//La función letrasTecladoOn se encarga de generar un tiempo de demora
//al momento de observar las letras de las teclas en el piano
function letrasTecladoOn(e, index) {
    e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
}

letrasTeclado.forEach(letrasTecladoOn);//Agrega el efecto letrasTecladoOn a cada letra de las teclas

//A cada tecla se le agrega la función quitarTransicion
teclas.forEach(tecla => tecla.addEventListener("transitionend", quitarTransicion));

window.addEventListener("keydown", tocarNota);//Al presionar una tecla se llama a la función tocarNota
