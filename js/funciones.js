//tablero del juego
let tablero = document.querySelector(".tablero");

//crear los tableros del juego
for (let index = 0; index < 143; index++) {
    //crear cuadro
    let cuadro = document.createElement("div");
    //insertar cuadro en el tablero
    tablero.appendChild(cuadro);
}

//seleccionar todos los tableros del cuadro
let cuadroTablero = document.querySelectorAll(".tablero div");

//posicion inicial de la nave
let posicionNave = 126;

//ubicar la nave en el tablero 
cuadroTablero[posicionNave].classList.add("nave1");

//variable para los cuadros del tablero
let cuadros = 11;


//ubicar la nave en el tablero
cuadroTablero[posicionNave].classList.add("nave1")

//Funcion para mover la nave
function movernave(tecla){
    //detectar que tecla del teclado oprime
    //console.log(tecla.key+" "+tecla.keyCode);
    cuadroTablero[posicionNave].classList.remove("nave1")
    if(tecla.key == "ArrowLeft"){
        //console.log("mover a la izquierda")
        if((posicionNave % cuadros) !== 0){
            posicionNave = posicionNave -1;
        }


    }else if(tecla.key == "ArrowRight"){
        //console.log("mover a la derecha")
        if((posicionNave % cuadros) < (cuadros-1)){
            posicionNave = posicionNave +1;
        }

    }else if(tecla.key == "ArrowUp"){
        //console.log("mover a la arriba")
        if(Math.floor(posicionNave / cuadros) !== 0){
            posicionNave = posicionNave - 11;
        }

    }else if(tecla.key == "ArrowDown"){
        //console.log("mover a la abajo")
        if((posicionNave / cuadros) < (cuadros - 1)){
            posicionNave = posicionNave - cuadros;
        }
    }

    cuadroTablero[posicionNave].classList.add("nave1")

}

//Registrar evento teclado para la nave
document.addEventListener("keydown", movernave)


//Aliens
let aliens = [
    1,2,3,4,5,6,7,8,9,
    12,13,14,15,16,17,18,19,20,
    23,24,25,26,27,28,29,30,31
]

//Colocar los aliens
function ubicarAliens(){
    for (let index = 0; index < aliens.length; index++) {
        cuadroTablero[aliens[index]].classList.add("aliens")
    }
}

//Quitar los aliens
function quitarAliens(){
    for (let index = 0; index < aliens.length; index++) {
        cuadroTablero[aliens[index]].classList.remove("aliens")
    }
}

ubicarAliens();

//variables para mover los aliens
let irderecha = true;
let direccion = 1;
let aliensID;

//Funcion para mover los aliens
function moverAliens(){
    let limiteIzquierda = ((aliens[0]%cuadros) === 0)
    let limiteDerecha = ((aliens[aliens.length-1]%cuadros)<cuadros-1)
}

//funcion para disparar
function disparaNave(teclado){
    let posicionLaser = posicionNave;
    let balaID;
    //console.log("tecla"+teclado.key+" "+teclado.keyCode)

    function moverLaser(){
        if(Math.floor(posicionLaser / cuadros) !== 0){
            cuadroTablero[posicionLaser].classList.remove("laser");
            posicionLaser = posicionLaser - cuadros;
            cuadroTablero[posicionLaser].classList.add("laser");
        }else{
            cuadroTablero[posicionLaser].classList.remove("laser");
        }

        //quitar el alien que toque la bala
        if(cuadroTablero[posicionLaser].classList.contains("aliens")){
            cuadroTablero[posicionLaser].classList.remove("aliens");
            cuadroTablero[posicionLaser].classList.remove("laser");
            cuadroTablero[posicionLaser].classList.add("explosion");
        
            setTimeout (()=>{
                cuadroTablero[posicionLaser].classList.remove("explosion");
            }, 300);

        //parar la bala de la nave
        clearInterval(balaID);

        }
        
    }
    //registrar la tecla para disparar
    if(teclado.keyCode === 32){
        balaID = setInterval(moverLaser, 100);
    }
}

document.addEventListener("keydown", disparaNave);