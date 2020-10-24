// dom elements

const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus');

//show time

function showTime() {
    let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds(),

      dayMonth = today.getDate();
      
    let month = new Array(12);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    
    let  weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";


   //output time

   date.innerHTML = `${weekday[today.getDay()]} ${dayMonth} ${month[today.getMonth()]}`

   time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

   setTimeout(showTime, 1000);
}

// add zero
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// set backround and greeting

let base = '';

function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 6) {
        //night
        document.body.style.backgroundImage = "url('../img/night/02.jpg')";
        greeting.textContent = 'Good Night';

        base = '../img/night/';
    }

    else if (hour < 12) {
        //morning
       document.body.style.backgroundImage = "url('../img/morning/07.jpg')";
        greeting.textContent = 'Good Morning';

        base = '../img/morning/';

    } else if (hour < 18) {
        //afternoon
        document.body.style.backgroundImage = "url('../img/day/04.jpg')";
        greeting.textContent = 'Good Afternoon';

        base = '../img/day/';
       
    } else if (hour < 24) {
        //evening
        document.body.style.backgroundImage = "url('../img/evening/12.jpg')";
        greeting.textContent = 'Good Evening';
        document.body.style.color = 'white';

        base = '../img/evening/';
    } 
}
    
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {      
      body.style.backgroundImage = `url(${src})`;
    }; 
  }
  function getImage() {
    const index = i % images.length;
    const imageSrc = base + images[index];
    viewBgImage(imageSrc);
    i++;
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1000);
  } 

// get name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }

    if (name.textContent === '' ) {
        name.textContent = '[Enter name]';
    } 
}

// set name
function setName(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keycode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }

}


// get focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter focus]';
    } else {
    focus.textContent = localStorage.getItem('focus');
    }

    if (focus.textContent === '' ) {
        focus.textContent = '[Enter focus]';
    }
}

//set focus
function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keycode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}
// clear 
function clearName() {
    name.textContent = '';
}
function clearFocus() {
    focus.textContent = '';
}

//get quote
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btnQuote = document.querySelector('#btnQuote');

async function getQuote() {  
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
    const res = await fetch(url);
    const data = await res.json(); 
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
  }
  document.addEventListener('DOMContentLoaded', getQuote);
  btnQuote.addEventListener('click', getQuote);

name.addEventListener('click', clearName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', getName);
name.addEventListener('blur', setName);

focus.addEventListener('click', clearFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', getFocus);
focus.addEventListener('blur', setFocus);

const btnbg = document.querySelector('#btnBg');
btnbg.addEventListener('click', getImage);


//run 
showTime();
setBgGreet();
getName();
getFocus();