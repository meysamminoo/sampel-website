// ! Selectors
const popup = document.querySelector('.popup');
const loginButton = document.querySelector('.global-login');
const closePopup = document.querySelector('.fa-times');
const overlay = document.querySelector('.overlay');

// ! Add Event Listeners
loginButton.addEventListener('click', showModal);
closePopup.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// ! Functions
// todo: show popup on click login button
function showModal(){
  popup.classList.add('active');
  document.body.style.overflow = 'hidden';
  overlay.classList.add('active');
}

// todo: close popup on click close item in header popup
function closeModal(){
  popup.classList.remove('active');
  document.body.style.overflow = 'visible';
  overlay.classList.remove('active');
}