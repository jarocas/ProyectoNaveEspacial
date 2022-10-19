//tablero del juego
let tablero = document.querySelector(".tablero");

//crear los tableros del juego
for (let index = 0; index < 225; index++) {
    //crear cuadro
    let cuadro = document.createElement("div");
    //insertar cuadro en el tablero
    tablero.appendChild(cuadro);
}

//seleccionar todos los tableros del cuadro
let cuadroTablero = document.querySelectorAll(".tablero div");

//posicion inicial de la nave
let posicionNave = 202;

//ubicar la nave en el tablero 
cuadroTablero[posicionNave].classList.add("nave1");