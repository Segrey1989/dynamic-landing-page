// DOM elements
const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus');

const showTime = () => {
  const today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  hours = addZero(hours);
  minutes = addZero(minutes);
  seconds = addZero(seconds);
  time.innerHTML = `${hours}<span>:</span>${minutes}<span>:</span>${seconds}<span>${amPm}</span>`;
  setTimeout(showTime, 1000);
};

const addBackground = () => {
  const today = new Date();
  let hours = today.getHours();
  if (hours < 12) {
    document.body.style.backgroundImage = "url('../img/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hours < 18) {
    document.body.style.backgroundImage = "url('../img/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    document.body.style.backgroundImage = "url('../img/night.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
};

function addZero(param) {
  if (param < 10) return `0${param}`;
  return param;
}

function getName() {
  const savedName = localStorage.getItem('name');
  if (!savedName) name.textContent = '[Enter name]';
  else name.textContent = savedName;
}

function getFocus() {
  const savedFocus = localStorage.getItem('focus');
  if (!savedFocus) focus.textContent = '[Enter focus]';
  else focus.textContent = savedFocus;
}

function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

//run
showTime();
addBackground();
getName();
getFocus();
