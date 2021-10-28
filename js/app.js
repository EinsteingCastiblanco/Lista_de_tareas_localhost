//variables
const formulario = document.querySelector('#formulario');
const lista = document.querySelector('#lista-tweets');


let tweet = [];


//eventlistener
eventListener();

function eventListener() {
    //cuando se agrega un tweet
    formulario.addEventListener('submit', agregarTweet );

    //cuando carge el documento
    document.addEventListener('DOMContentLoaded', () => {

        //traer lo que haya en el localStorage
        tweet = JSON.parse( localStorage.getItem('tweets') || []); //en caso de no existir asigna un arreglo vacio
        console.log(tweet)
        crearHTML();
    });
}


//funciones
function agregarTweet(e) { //como maneja un evento tiene que tener parametro
    e.preventDefault();
    
    //acceder al valor donde el usuario digita 
    const valor = document.querySelector('#tweet').value;

    //validar
    if (!valor) {
        mostrarError('Agrege contenido al mensaje');
        return; //evita que se ejecuten las siguientes lineas
    }
    
    //agregar id a los objetos mas el texto
    const tweetObj = {
        id: Date.now(), //trae milisegundos 
        mensaje: valor,
    } 
    //agregar al arreglo
    //sprind oparation agrega valores
    tweet = [...tweet, tweetObj];
    console.log(tweet)
    crearHTML();

    //reinciar el formulario para que se limpie el input
    formulario.reset();  
}

function mostrarError(msj) {
    const error = document.createElement('p');
    error.classList.add('error');
    error.textContent = msj;

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(error); //agrega mensaje de error

    //eliminar mensaje luego de cierto tiempo
    setTimeout( () => { //setTimeout solo se ejecuta una vez
        error.remove();
    }, 3000);
    
}

//listado de los tweets
function crearHTML() {
    limpiarHTML();

    if(tweet.length > 0){

        //iterar sobre el arreglo
        tweet.forEach( e => {
            
            //crear boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'x';

            //borrar lista
            btnEliminar.onclick = () => {
                borrarTweet(e.id);
            }
            
            
            //cada mensaje en un li
            const li = document.createElement('li');
            li.textContent = e.mensaje;

            lista.appendChild(li); //insertarlo en el html 
            //agregar el boton a la lista
            li.appendChild(btnEliminar);
            agregarAlLocalstorage();
        });
    }
}

function limpiarHTML() {
    //limpiar el html previo
    while(lista.firstChild){
        lista.removeChild(lista.firstChild); //elimina de la lista el primer hijo que encuentre
    }
}

//borrar tweet
function borrarTweet(id) {
    //eliminar elementos del arreglo por id
    tweet = tweet.filter( tweet =>  tweet.id !== id );

    crearHTML();
}

function agregarAlLocalstorage() {
    //agregar al localStorage convirtiendo el arrglo en un string
    localStorage.setItem('tweets', JSON.stringify(tweet))    
}