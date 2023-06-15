//displays
const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
//
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");
//variables
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbersEl.forEach((number) => { //looping
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) { //si el caracter ingresado es un punto y no tenemos uno
      haveDot = true; //cambia el valor de la variable a true, para que no se vuelva a agregar otro punto
    } else if (e.target.innerText === "." && haveDot) { //si ya tenemos un punto lo evitamos
      return;
    }
    dis2Num += e.target.innerText;  //si no teníamos un punto, lo agregamos.
    display2El.innerText = dis2Num; //mostramos en el display lo que está en la variable dis2Num
  });
});

operationEl.forEach((operation) => { //looping
  operation.addEventListener("click", (e) => {
    if (!dis2Num) return;   //si lo que apretamos no es un numero, se evita.
    haveDot = false;    //se establece el punto en false para que se habilite el ponerle un punto al segundo número que ingresemos.
    const operationName = e.target.innerText;   //establecemos una constante con el nombre operationName que tome el valor del evento que pasamos por click
    if (dis1Num && dis2Num && lastOperation) {  //si tenemos los tres datos ingresados..
      mathOperation(); //los pasamos a una función
    } else {
      result = parseFloat(dis2Num);     //sino, luego el resultado temporal mostrará lo que está en result
    }
    clearVar(operationName); //limpiamos
    lastOperation = operationName;  //pasamos la operación que hicimos recientemente a la antigua (display 2 a display 1)
  });
});

function clearVar(name = "") {
  dis1Num += dis2Num + " " + name + " "; //número 1 será una concatenación del número 2 + un espacio + la operación + un espacio
  display1El.innerText = dis1Num;   //el display 1 mostrará al numero1
  display2El.innerText = "";    //el display 2 quedará vacío
  dis2Num = "";                 //se vaciará al número 2
  tempResultEl.innerText = result;      //el elemento resultado temporal mostrará el valor que quedó en la var result
}

function mathOperation() {
  if (lastOperation === "x") { //si la operación es igual a...
    result = parseFloat(result) * parseFloat(dis2Num); //el valor de result es..
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(dis2Num);
  } else if (lastOperation === "%") {
    result = (parseFloat(result) / 100) * parseFloat(dis2Num); //FUNCIONA YAY
  }
}
// operation();

equalEl.addEventListener("click", () => {
  if (!dis2Num || !dis1Num) return; //si no ingresamos ningún número, no evaluaremos.
  haveDot = false; //se resetea
  mathOperation(); //se realiza la operación
  clearVar(); //se limpia
  display2El.innerText = result; //se muestra el resultado en el display 2
  tempResultEl.innerText = "";  //se borra lo que esté en el resultado temporal
  dis2Num = result;     //el número dos es igual al resultado
  dis1Num = ""; //el número uno se vacía
});

clearAllEl.addEventListener("click", () => {
  dis1Num = ""; //se vacía el número 1
  dis2Num = ""; //se vacía el número 2
  display1El.innerText = ""; //se vacía el display 1
  display2El.innerText = "";    //se vacía el display 2
  result = ""; //se vacía el resultado
  tempResultEl.innerText = ""; //se vacía el resultado temporal
});

clearLastEl.addEventListener("click", () => {
  display2El.innerText = ""; //se borra el display 2
  dis2Num = ""; //se borra el último número ingresado
});

window.addEventListener("keydown", (e) => { //habilita el uso del teclado
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."       //no utilizar OR en el último
  ) {
    clickButtonEl(e.key); //función que habilita el uso de los números por pantalla

  } else if (e.key === "+" || 
             e.key === "-" || 
             e.key === "/" || 
             e.key === "%") {clickOperation(e.key); //si apretamos un operando, usamos la función clickOperation

  } else if (e.key === "*") {
    clickOperation("x"); //en el caso de multiplicar, le paso a la función 'x'

  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual(); //si ingresamos enter o igual, pasamos a la función clickEqual
  }
});

function clickButtonEl(key) {
  numbersEl.forEach((button) => { //para cada número ingresado
    if (button.innerText === key) { //chequeo si son keys válidas
      button.click();  //habilito el evento click
    }
  });
}
function clickOperation(key) {
  operationEl.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click(); //activa un evento click
    }
  });
}
function clickEqual() { //activa el evento equal
  equalEl.click();
}

//POPUP
function togglePopup(){
  document.getElementById("popup-1").classList.toggle("active");
}