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
let cuadrosVertical = 13;
let cuadrosHorizontal = 11;


//ubicar la nave en el tablero
cuadroTablero[posicionNave].classList.add("nave1")

//Funcion para mover la nave
function movernave(tecla){
    //detectar que tecla del teclado oprime
    //console.log(tecla.key+" "+tecla.keyCode);
    cuadroTablero[posicionNave].classList.remove("nave1")
    if(tecla.key == "ArrowLeft"){
        //console.log("mover a la izquierda")
        if((posicionNave % cuadrosHorizontal) !== 0){
            posicionNave = posicionNave -1;
        }
    }else if(tecla.key == "ArrowRight"){
        //console.log("mover a la derecha")
        if((posicionNave % cuadrosHorizontal) < (cuadrosHorizontal-1)){
            posicionNave = posicionNave +1;
        }

    }else if(tecla.key == "ArrowUp"){
        //console.log("mover a la arriba")
        if(Math.floor(posicionNave / cuadrosHorizontal) !== 0){
            posicionNave = posicionNave - cuadrosHorizontal;
        }

    }else if(tecla.key == "ArrowDown"){
        //console.log("mover a la abajo")
        if((posicionNave / cuadrosVertical) < (cuadrosHorizontal - 1)){
            posicionNave = posicionNave + cuadrosHorizontal;
        };
    };

    cuadroTablero[posicionNave].classList.add("nave1");

};

//Registrar evento teclado para la nave
document.addEventListener("keydown", movernave)


//Aliens
let aliens = [
    1,2,3,4,5,6,7,8,9,
    12,13,14,15,16,17,18,19,20,
    23,24,25,26,27,28,29,30,31
];

//guardar aliens muertos
let aliensMuertos = [];
let contarAliensMuertos = 0;
let mostrarAliensMuertos = document.querySelector(".muertos");

//Colocar los aliens
function ubicarAliens(){
    for (let index = 0; index < aliens.length; index++) {
        if(!aliensMuertos.includes(index)){
            cuadroTablero[aliens[index]].classList.add("aliens");
        }
        
    }
}

//Quitar los aliens
function quitarAliens(){
    for (let index = 0; index < aliens.length; index++) {
        cuadroTablero[aliens[index]].classList.remove("aliens");
    }
}

ubicarAliens();

//variables para mover los aliens
let irderecha = true;
let direccion = 1;
let aliensID;

//Funcion para mover los aliens
function moverAliens(){
    let limiteIzquierda = ((aliens[0] % cuadrosHorizontal) == 0); 
    let limiteDerecha = ((aliens[aliens.length-1] % cuadrosHorizontal) == cuadrosHorizontal-1);

    quitarAliens();
    //mover a la derecha
    if(limiteDerecha && irderecha){
        for (let i = 0; i < aliens.length; i++) {
            aliens[i] = aliens[i] + cuadrosHorizontal + 1;
            direccion = -1;
            irderecha = false; 
        }
    }
    //mover a la izquierda
    if(limiteIzquierda && !irderecha){
        for (let i = 0; i < aliens.length; i++) {
            aliens[i] = aliens[i] + cuadrosHorizontal - 1;
            direccion = 1;
            irderecha = true; 
        };
    };
    
    //automatizar proceso de mover aliens
    for (let index = 0; index < aliens.length; index++) {
        aliens[index] = aliens[index] + direccion;
    };
    ubicarAliens();
};
    aliensID = setInterval(moverAliens, 500);

//funcion para disparar
function disparaNave(teclado){
    let posicionLaser = posicionNave;
    let balaID;
    //console.log("tecla"+teclado.key+" "+teclado.keyCode)

    function moverLaser(){
        if(Math.floor(posicionLaser / cuadrosHorizontal) !== 0){
            cuadroTablero[posicionLaser].classList.remove("laser");
            posicionLaser = posicionLaser - cuadrosHorizontal;
            cuadroTablero[posicionLaser].classList.add("laser");
        }else{
            cuadroTablero[posicionLaser].classList.remove("laser");
        };

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
            
            //agregar aliens muerto al arreglo y contarlo como muerto
            let aliensEliminado = aliens.indexOf(posicionLaser);
            aliensMuertos.push(aliensEliminado);
            contarAliensMuertos++;
            mostrarAliensMuertos.textContent = contarAliensMuertos;
        
        }
    };
    //registrar la tecla para disparar
    if(teclado.keyCode === 32){
        balaID = setInterval(moverLaser, 100);
    }
}

document.addEventListener("keydown", disparaNave)