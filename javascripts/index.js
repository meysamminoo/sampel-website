// ! Selectors
const popup = document.querySelector('.popup');
const loginButton = document.querySelector('.global-login');
const closePopup = document.querySelector('.fa-times');
const overlay = document.querySelector('.overlay');
const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const openHamberger = document.getElementById('open-menu');
const closeHamberger = document.getElementById('close-menu');
const hamberger = document.getElementById('nav');
const globalHeader = document.querySelector('.global-header');
const container = document.querySelector('.container');

// ! Add Event Listeners
loginButton.addEventListener('click', showModal);
closePopup.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
form.addEventListener('submit', function(e){
  e.preventDefault();
  checkInput();
})
openHamberger.addEventListener('click', openHambergerMenu);
closeHamberger.addEventListener('click', closeHambergerMenu);


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
// todo: check input validation
function checkInput(){
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();
  if (usernameValue === "") {
    setErrorFor(username, "نام کاربری باید حتما وارد شود");
  } else if (!validateEmail(usernameValue)){
    setErrorFor(username, "ایمیل باید با فرمت صحیح وارد شود")
  } else {
    setSuccessFor(username);
  } 
  if (passwordValue === "") {
    setErrorFor(password, "رمز عبور باید حتما وارد شود");
  }
  if (passwordValue.length < 6){
    setErrorFor(password, "رمز عبور حداقل باید 6 کاراکتر باشد");
  } else {
    setSuccessFor(password);
  }
}
// todo: error validate form
function setErrorFor(input, message){
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.classList = " form-control error"
  return false;
}
// todo: success validate form
function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.classList = " form-control success"
  return false;
}
// todo: validate email with regEx
function validateEmail(email){
  const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
}
// todo: open hamberger menu
function openHambergerMenu(){
  hamberger.classList.add('active');
  const width = window.getComputedStyle(hamberger).getPropertyValue('width');
  globalHeader.style.transform = `translateX(${width})`;
  container.style.transform = `translateX(${width})`;
  document.body.style.overflow = 'hidden';
  closeHamberger.style.display = 'block';
  openHamberger.style.display = 'none';
}
// todo:
function closeHambergerMenu(){
  hamberger.classList.remove('active');
  globalHeader.style.transform = `translateX(0)`;
  container.style.transform = `translateX(0)`;
  document.body.style.overflow = 'visible';
  closeHamberger.style.display = 'none';
  openHamberger.style.display = 'block';
}