const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', ()=>{
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return 
    } 

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
})

generateEl.addEventListener('click',()=>{
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;

    // console.log(hasLower, hasUpper, hasNumbers, hasSymbols);we're goint to use object dot values of that particular item and we want the first itemdot
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumbers, hasSymbols, length);
    // console.log(resultEl);

})


function generatePassword(lower, upper, number, symbol, length){
    let generatePassword = '';
    const typesCount = lower + upper + number + symbol;
    //filter recorre el arreglo (de objetos en este caso), devolviendo los que cumplan verdadero el resultado de la funcion flecha (siempre recibe una funcion ), en este caso se pone [0] ya que necesitamos los objetos en su posicion 0
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item=>Object.values(item)[0]);
    // console.log(typesArr);

    if(typesCount === 0){
        return '';
    }

    for(let i= 0; i < length; i+=typesCount){
        typesArr.forEach(type => {
            // console.log(type);

            const funcName = Object.keys(type)[0];
            // console.log(funcName);
            generatePassword += randomFunc[funcName]();
        })
    }
    const finalPassword = generatePassword.slice(0, length);
    return finalPassword;
}


//Funcion para obtener de manera random letras de la a a la z en minuscula
function getRandomLower(){

    //Cada elemento separado para ver su funcionamiento

    //Devuelve un numero entre 0 y 1 (incluido 0 pero no 1)
    // let mat = Math.random();
    // console.log(mat);

    //Se multiplica por 26 ya que es el npumero más alto que quiero obtener
    // let mult = mat * 26;
    // console.log(mult);

    //Devuelve el numero entrero más bajo
    // let red = Math.floor(mult);
    // console.log(red);

    //Se suma 97 para obtener otro codio ASCII ya que 97 es la "a" minuscula
    // let sum = red + 97;
    // console.log(sum);

    return String.fromCharCode(Math.floor(Math.random()*26) + 97);

}


//Funcion para obtener de manera random letras de la A a la Z en mayusculas
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26) + 65);
}


function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10) + 48);
}


function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}


// console.log(getRandomLower());
// console.log(getRandomUpper());
// console.log(getRandomNumber());
// console.log(getRandomSymbol());


