var notas = [];                 //Almacena las notas del piano
var letrasTecladoArray = [];    //Almacena las letras del teclado
var sonidosTeclas = [];         //Almacena los sonidos de las teclas
var dataTeclas = [];            //Almacena los valores numéricos de las teclas

var nota = document.querySelector(".teclaPresionada");  //div del HTML donde se mostrarán las notas
var divTeclas = document.getElementById("teclas");      //div del HTML donde se crearan las teclas
var section = document.getElementById("sectionPiano");  //section donde se agregarán los audios

guardarDatos();
crearContenido();
var letrasTeclado = document.querySelectorAll(".letrasTeclado");//Almacena las letras de las teclas

//La función guardarDatos almacena toda la información necesaria en arrays
//para la creación del piano y su funcionamiento
function guardarDatos() {
    //Corresponden a las notas del piano
    notas.push("C");
    notas.push("D");
    notas.push("E");
    notas.push("F");
    notas.push("G");
    notas.push("A");
    notas.push("B");
    notas.push("C");
    notas.push("D");
    notas.push("E");
    notas.push("C#");
    notas.push("D#");
    notas.push("F#");
    notas.push("G#");
    notas.push("A#");
    notas.push("C#");
    notas.push("D#");

    //Corresponden a las letras del teclado
    letrasTecladoArray.push("A");
    letrasTecladoArray.push("S");
    letrasTecladoArray.push("D");
    letrasTecladoArray.push("F");
    letrasTecladoArray.push("G");
    letrasTecladoArray.push("H");
    letrasTecladoArray.push("J");
    letrasTecladoArray.push("K");
    letrasTecladoArray.push("L");
    letrasTecladoArray.push("M");
    letrasTecladoArray.push("W");
    letrasTecladoArray.push("E");
    letrasTecladoArray.push("T");
    letrasTecladoArray.push("Y");
    letrasTecladoArray.push("U");
    letrasTecladoArray.push("O");
    letrasTecladoArray.push("P");

    //Corresponden a los sonidos de las notas
    sonidosTeclas.push("040");
    sonidosTeclas.push("042");
    sonidosTeclas.push("044");
    sonidosTeclas.push("045");
    sonidosTeclas.push("047");
    sonidosTeclas.push("049");
    sonidosTeclas.push("051");
    sonidosTeclas.push("052");
    sonidosTeclas.push("054");
    sonidosTeclas.push("056");
    sonidosTeclas.push("041");
    sonidosTeclas.push("043");
    sonidosTeclas.push("046");
    sonidosTeclas.push("048");
    sonidosTeclas.push("050");
    sonidosTeclas.push("053");
    sonidosTeclas.push("055");

    //Corresponden a los valores numéricos de las teclas
    dataTeclas.push(65);
    dataTeclas.push(83);
    dataTeclas.push(68);
    dataTeclas.push(70);
    dataTeclas.push(71);
    dataTeclas.push(72);
    dataTeclas.push(74);
    dataTeclas.push(75);
    dataTeclas.push(76);
    dataTeclas.push(77);
    dataTeclas.push(87);
    dataTeclas.push(69);
    dataTeclas.push(84);
    dataTeclas.push(89);
    dataTeclas.push(85);
    dataTeclas.push(79);
    dataTeclas.push(80);
}

//La función crearContenido crea el piano y las etiquetas de audio
function crearContenido() {

    //Se crean las teclas
    for (let i = 0; i < 17; i++) {
        let teclaPiano = document.createElement("div");

        //Dependiendo de la tecla, se le asigna una clase u otra
        //por ejemplo las teclas negras tienen la clase sharp
        if (i < 10) {
            teclaPiano.setAttribute("class", "tecla");
        } else {
            teclaPiano.setAttribute("class", "tecla sharp");
        }

        //Se asocian las teclas con sus respectivas notas
        //data-tecla hace referencia al valor numérico de la tecla	
        teclaPiano.setAttribute("data-tecla", dataTeclas[i]);
        teclaPiano.setAttribute("data-nota", notas[i]);

        //Se crean las letras de las teclas
        let letrasTeclado = document.createElement("span");
        letrasTeclado.setAttribute("class", "letrasTeclado");
        letrasTeclado.innerHTML = letrasTecladoArray[i];

        //Se agregan las etiquetas al documento
        teclaPiano.appendChild(letrasTeclado);
        divTeclas.appendChild(teclaPiano);
    }

    //Se crean los audios
    for (let i = 0; i < 17; i++) {
        let audio = document.createElement("audio");

        //Se asocian los audios con sus respectivas teclas mediante el valor numérico de la tecla
        audio.setAttribute("data-tecla", dataTeclas[i]);
        audio.setAttribute("src", "http://carolinegabriel.com/demo/js-keyboard/sounds/" + sonidosTeclas[i] + ".wav");
        section.appendChild(audio);
    }
}

//La función tocarNota toca la nota correspondiente
function tocarNota(e) {

    //Mediante la propiedad keyCode se obtiene el valor numérico de la tecla y del audio
    let audio = document.querySelector(`audio[data-tecla="${e.keyCode}"]`);
    let tecla = document.querySelector(`.tecla[data-tecla="${e.keyCode}"]`);

    //Quita la transición del css de la tecla presionada
    tecla.addEventListener("transitionend", quitarTransicion);

    if (!tecla) return;//Si no se encuentra una tecla, no hace nada

    let teclanota = tecla.getAttribute("data-nota");//Se obtiene la nota asociada a la tecla

    //Se le agrega la clase playing a la tecla presionada
    //la cual tiene un css asociado
    tecla.classList.add("playing");
    nota.innerHTML = teclanota;//Se muestra la nota
    audio.currentTime = 0;//reestablece el tiempo del audio a cero
    audio.play();//Reproduce el audio
}

//La función quitarTransicion quita el efecto que se genera al
//momento de presionar una tecla
function quitarTransicion(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
}

//La función letrasTecladoOn se encarga de generar un tiempo de demora
//al momento de mostrarse las letras de las teclas en el piano
function letrasTecladoOn(e, index) {
    e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
}

//Por cada tecla del piano se agrega la funcion letrasTecladoOn
letrasTeclado.forEach(letrasTecladoOn);
window.addEventListener("keydown", tocarNota);//Al presionar una tecla se llama a la función tocarNota