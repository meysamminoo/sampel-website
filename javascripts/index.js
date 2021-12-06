// ! Selectors
const popup = document.querySelector(".popup");
const loginButton = document.querySelector(".global-login");
const closePopup = document.querySelector(".fa-times");
const overlay = document.querySelector(".overlay");
const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const openHamberger = document.getElementById("open-menu");
const closeHamberger = document.getElementById("close-menu");
const hamberger = document.getElementById("nav");
const globalHeader = document.querySelector(".global-header");
const container = document.querySelector(".container");
const dropdownMenu = document.querySelector(".sub-menu-hamberger");
const faUser = document.querySelector(".fa-user");
const topbar = document.querySelector(".top-bar");
const toggleSearch = document.getElementById("search-icon");
const wrapperHeader = document.querySelector(".wrapper-header");
const wrapperSearch = document.querySelector(".wrapper-search");
const searchInput = document.querySelector(".search-input");
const backToTop = document.querySelector(".back-to-top");

// ! Add Event Listeners
loginButton.addEventListener("click", showModal);
closePopup.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkInput();
});
openHamberger.addEventListener("click", openHambergerMenu);
closeHamberger.addEventListener("click", closeHambergerMenu);
dropdownMenu.addEventListener("click", toggleHambergerMenu);
faUser.addEventListener("click", showModal);
toggleSearch.addEventListener("click", toggleSearchHandler);
backToTop.addEventListener("click", backTotopPage);

// ! Functions
// todo: show popup on click login button
function showModal() {
  popup.classList.add("active");
  document.body.style.overflow = "hidden";
  overlay.classList.add("active");
}

// todo: close popup on click close item in header popup
function closeModal() {
  popup.classList.remove("active");
  document.body.style.overflow = "visible";
  overlay.classList.remove("active");
}
// todo: check input validation
function checkInput() {
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();
  if (usernameValue === "") {
    setErrorFor(username, "نام کاربری باید حتما وارد شود");
  } else if (!validateEmail(usernameValue)) {
    setErrorFor(username, "ایمیل باید با فرمت صحیح وارد شود");
  } else {
    setSuccessFor(username);
  }
  if (passwordValue === "") {
    setErrorFor(password, "رمز عبور باید حتما وارد شود");
  }
  if (passwordValue.length < 6) {
    setErrorFor(password, "رمز عبور حداقل باید 6 کاراکتر باشد");
  } else {
    setSuccessFor(password);
  }
}
// todo: error validate form
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.classList = " form-control error";
  return false;
}
// todo: success validate form
function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.classList = " form-control success";
  return false;
}
// todo: validate email with regEx
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
}
// todo: open hamberger menu
function openHambergerMenu() {
  hamberger.classList.add("active");
  const width = window.getComputedStyle(hamberger).getPropertyValue("width");
  globalHeader.style.transform = `translateX(${width})`;
  container.style.transform = `translateX(${width})`;
  topbar.style.transform = `translateX(${width})`;
  document.body.style.overflow = "hidden";
  closeHamberger.style.display = "block";
  openHamberger.style.display = "none";
}
// todo: close hamberger menu
function closeHambergerMenu() {
  hamberger.classList.remove("active");
  globalHeader.style.transform = `translateX(0)`;
  container.style.transform = `translateX(0)`;
  topbar.style.transform = `translateX(0)`;
  document.body.style.overflow = "visible";
  closeHamberger.style.display = "none";
  openHamberger.style.display = "block";
}
// todo: toggle drop down inner hamberger menu
function toggleHambergerMenu() {
  const iElement = this.querySelector("i");
  if (iElement.className === "fas fa-angle-left") {
    this.querySelector("i").classList = "fas fa-angle-down";
  } else {
    this.querySelector("i").classList = "fas fa-angle-left";
  }
  const ulElement = this.querySelector("ul");
  ulElement.classList.toggle("active");
}
// todo: toggle header and search form
function toggleSearchHandler() {
  if (this.className === "fas fa-search") {
    wrapperHeader.classList.add("disabled");
    wrapperSearch.classList.add("active");
    this.className = "fas fa-times";
    addSearchSpeech();
  } else {
    wrapperHeader.classList.remove("disabled");
    wrapperSearch.classList.remove("active");
    this.className = "fas fa-search";
  }
}
// todo: use SpeechRecognition for sound search
function addSearchSpeech() {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "fa-IR";
  recognition.intreimResults = true;
  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    console.log(transcript);
    if (e.results[0].isFinal) {
      searchInput.value = transcript;
    }
  });
  recognition.addEventListener("end", recognition.start);
  recognition.start();
}
// todo: back to top page
function backTotopPage() {
  window.scrollTo({ top: 0, behavior: `smooth` });
}

// ?stick nav
window.addEventListener("scroll", function () {
  if (window.scrollY >= globalHeader.offsetHeight) {
    globalHeader.style.position = "fixed";
  } else {
    globalHeader.style.position = "relative";
  }
  if (window.scrollY > 100) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }
});

// ? count down
const dayElement = document.getElementById("days");
const hourElement = document.getElementById("hours");
const minuteElement = document.getElementById("minutes");
const secondElement = document.getElementById("seconds");
const publishDate = "10 feb 2022";
function coundown() {
  const newPublishDate = new Date(publishDate);
  const currentDate = new Date();
  const totalSeconds = (newPublishDate - currentDate) / 1000;
  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minute = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds % 60);
  dayElement.innerText = days;
  hourElement.innerText = hours;
  minuteElement.innerText = minute;
  secondElement.innerText = seconds;
}
coundown();
setInterval(coundown, 1000);

// ! shopping cart
const shoppingCartIcon = document.querySelector(".fa-shopping-bag");
const shoppingCartBox = document.querySelector(".shopping-cart-box");
const shoppingCartItem = document.querySelector(".shopping-cart-items");

// todo: show and hide shopping card box
shoppingCartIcon.addEventListener("click", toggleShoppingCartBox);
function toggleShoppingCartBox() {
  shoppingCartBox.classList.toggle("active");
}
// todo: calculater sum shopping item
function calculaterSumShoppingItem() {
  const coursePrice = shoppingCartBox.querySelectorAll(".item-price");
  const totalShoppingCart = shoppingCartBox.querySelector(
    ".shopping-cart-total"
  );
  const cartNumber = topbar.querySelector(".cart-number");
  const mobileCartNumber = topbar.querySelector(
    ".top-bar-items-mobile .cart-number"
  );
  let sum = 0;
  coursePrice.forEach((course) => {
    sum += Number(course.innerText.match(/\d+/));
  });
  totalShoppingCart.innerText = `جمع کل: ${sum} تومان`;
  cartNumber.innerText = coursePrice.length;
  mobileCartNumber.innerText = coursePrice.length;
}
calculaterSumShoppingItem();

shoppingCartItem.addEventListener("click", deleteCartItem);
// todo:
function deleteCartItem(e) {
  const item = e.target;
  if (item.className === "fas fa-times") {
    const cartItem = item.parentElement;
    cartItem.remove();
    calculaterSumShoppingItem();
  }
}
