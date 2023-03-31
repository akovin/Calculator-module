let seasonTrigger = true;

//функция расставляющая пробелы и умножающая на 12
let adaptNumbers = function (totVal, months) {
    totVal = totVal * months;
    // totalob.innerHTML = total*months.value;
    totalob.innerHTML = totVal;
    let len = totalob.innerHTML.length;
    let numberSpaces = totalob.innerHTML.length/3;
    numberSpaces = Math.floor(numberSpaces);
    
    // let totVal = '123456789';

    totVal = String(totVal);
    let numbers = [];
    for (let i = 0; i <= numberSpaces; i++) {
        let startVal = len - 3;
        let endVal = len;
        let subTotVal = totVal.substring(startVal,endVal);
        numbers.push(subTotVal);
        len = len - 3;
    }
    let total2 = numbers[numbers.length - 1];
    for ( i = numbers.length - 2; i >= 0 ; i-- ) {
        total2 = total2 + ' ' + numbers[i];
    }
    totalob.innerHTML = total2;
}

let  menu = document.querySelector('.mmenuu');
let  submenu = document.querySelector('.ssubmenuu');

menu.onclick = function () {
    if (submenu.style.display == 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
    
}

//навешивается функция на все элементы
let AllElements= document.querySelector('body');
AllElements.onclick = function(e) {
    let notMenuClicked = true;
    for (let i = 0; i < e.path.length; i++){
        if(e.path[i] == menu) {
            notMenuClicked = false;
        }
    }
    //если клик был по любому из элементов, кроме menu, то submenu закрывается, эмуляция работы blur
    if(notMenuClicked == true){
        if (submenu.style.display == 'block') {
            submenu.style.display = 'none';
        }         
    }
}
//навесил обработчик на ESC для закрытия submenu
window.addEventListener("keydown", function(e){
    if (e.keyCode == 27) {
        if (submenu.style.display == 'block') {
            submenu.style.display = 'none';
        }  
    }
});

let mainElement = document.querySelector('.mmenuu div a');
let element1 = document.querySelector('#first-el a');
let element2 = document.querySelector('#second-el a');;
let element3 = document.querySelector('#third-el a');
element1.onclick = function (event) {
    mainElement.innerHTML = element1.innerHTML; 
}
element2.onclick = function (event) {
    mainElement.innerHTML = element2.innerHTML; 
}
element3.onclick = function (event) {
    mainElement.innerHTML = element3.innerHTML; 
}

let halfYearButton = document.querySelector('.button-half-year');
let inputNumberMonths = document.querySelector('.input-number-months input');
inputNumberMonths.oninput = function (event) {
    total = 0;
        modules.forEach(module=>{       
            let label2 = module.querySelector('.chosen-label');
            let prise = module.querySelector('.prise-1')
            if (label2.innerHTML == "Выбрано") {
                let pr = prise.innerHTML;
                prnum = pr.replace(/,/,'.');
                total = total + Number(prnum);
            };               
        });; 
        totalob.innerHTML = total*months.value;

    //проверка на значение не равное 1,6,12
    if (!(this.value == 1 || this.value == 6 || this.value == 12)) {
        yearButton.childNodes[1].style.color = 'black';
        halfYearButton.childNodes[1].style.color = 'black';
        monthButton.childNodes[1].style.color = 'black';
        yearButton.style.backgroundColor = '';
        halfYearButton.style.backgroundColor = '';
        monthButton.style.backgroundColor = '';
    } else if (this.value == 1) {
        chose_button(monthButton, yearButton, halfYearButton, '1');
    } else if (this.value == 6) {
        chose_button(halfYearButton, yearButton, monthButton, '6');
    } else {
        chose_button(yearButton, halfYearButton, monthButton, '12');
    }

}


let monthButton = document.querySelector('.button-month');
monthButton.style.backgroundColor = '#3595B1';

let yearButton = document.querySelector('.button-year');

clck(halfYearButton, yearButton, monthButton, '6');
clck(yearButton, halfYearButton, monthButton, '12');
clck(monthButton, yearButton, halfYearButton, '1');

function clck (buttonMain, otherbutton1, otherbutton2, value) {
        buttonMain.onclick = function () {
        inputNumberMonths.value = value;
        this.style.backgroundColor = '#3595B1';
        this.childNodes[1].style.color = 'white';
        otherbutton1.childNodes[1].style.color = 'black';
        otherbutton2.childNodes[1].style.color = 'black';
        otherbutton1.style.backgroundColor = '';
        otherbutton2.style.backgroundColor = '';

        total = 0;
            modules.forEach(module=>{       
                let label2 = module.querySelector('.chosen-label');
                let prise = module.querySelector('.prise-1')
                if (label2.innerHTML == "Выбрано") {
                    let pr = prise.innerHTML;
                    prnum = pr.replace(/,/,'.');
                    total = total + Number(prnum);
                };               
            });
            totalob.innerHTML = total*months.value;
    }
}


let total = 5000;
let totalob = document.querySelector('.total span:nth-of-type(2)');
// totalob.innerHTML = total;
adaptNumbers(total, 12);
let months = document.querySelector('.input-number-months input');
months.value = '1';
let farmsInput = document.querySelector('.number-farms div input');
farmsInput.value = '1';
let modules = document.querySelectorAll('.module');
modules.forEach(module => {
    module.onclick = function (event) { 

        let label = this.querySelector('.chosen-label');
        if(!module.classList.contains('module-0')) {
            label.classList.toggle('is-chosen');
            this.classList.toggle('chosen');
            if (label.innerHTML == 'Не выбрано') {
                label.innerHTML = 'Выбрано';
            } else {
                label.innerHTML = 'Не выбрано';
            }
        }
        total = 0;
        modules.forEach(module=>{       
            let label2 = module.querySelector('.chosen-label');
            let prise = module.querySelector('.prise-1')
            if (label2.innerHTML == "Выбрано") {
                let pr = prise.innerHTML;
                prnum = pr.replace(/,/,'.');
                // prnum = parseInt(prnum, 10);
                prnum = prnum.replace(/\s+/g, '');
                total = total + Number(prnum);
            };               
        });
        let totVal = total*months.value;
        if (seasonTrigger) {
            adaptNumbers(totVal, 12);
        } else {
            adaptNumbers(totVal, 30);
        }
}});


//изменение inputa
let inputNumberFarms = document.querySelector('.number-farms div');
inputNumberFarms.onkeypress = function (e) {
    if (e.keyCode < 48 || e.keyCode > 57) {
        return false;
    }
}
inputNumberMonths.onkeypress = function (e) {
    if (e.keyCode < 48 || e.keyCode > 57) {
        return false;
    }
}

//
function chose_button(buttonMain, otherbutton1, otherbutton2) {
    buttonMain.style.backgroundColor = '#3595B1';
    buttonMain.childNodes[1].style.color = 'white';
    otherbutton1.childNodes[1].style.color = 'black';
    otherbutton2.childNodes[1].style.color = 'black';
    otherbutton1.style.backgroundColor = '';
    otherbutton2.style.backgroundColor = '';

    total = 0;
    modules.forEach(module=>{       
        let label2 = module.querySelector('.chosen-label');
        let prise = module.querySelector('.prise-1')
        if (label2.innerHTML == "Выбрано") {
            let pr = prise.innerHTML;
            prnum = pr.replace(/,/,'.');
            total = total + Number(prnum);
        };               
    });
    totalob.innerHTML = total*months.value;
}

//блок для period2 - нового блока
let season = document.querySelector('.season');
let unlimited = document.querySelector('.unlimited');
season.onclick = function () {
    //переключение стилей кнопок
    pushTheButton(season, unlimited, 12, true);
}
unlimited.onclick = function () {
    //переключение стилей кнопок
    pushTheButton(unlimited, season, 30, false);
}

let pushTheButton = function (chosenButton, otherButton, monthsNumber, trigger) {
    if (!chosenButton.classList.contains('chosen-button')) {
        otherButton.classList.toggle('chosen-button');
        chosenButton.classList.toggle('chosen-button');
        total = 0;
        modules.forEach(module=>{       
            let label2 = module.querySelector('.chosen-label');
            let prise = module.querySelector('.prise-1')
            if (label2.innerHTML == "Выбрано") {
                let pr = prise.innerHTML;
                prnum = pr.replace(/,/,'.');
                // prnum = parseInt(prnum, 10);
                prnum = prnum.replace(/\s+/g, '');
                total = total + Number(prnum);
            };               
        });
        let totVal = total*months.value;
        adaptNumbers(totVal, monthsNumber);
        seasonTrigger = trigger;
    }
}