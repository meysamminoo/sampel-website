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
container;
const wrapperCourse = document.querySelector(".wrapper-course");

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
const courseContent = document.querySelector(".course-content");
const studyMode = document.querySelector(".study-mode");
const courseInfo = document.querySelector(".course-info");
const courseDetailInfo = document.querySelector(".course-detail-info");

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
  // fix button study mode
  if (
    window.scrollY > courseContent.offsetTop + 80 &&
    window.scrollY + 60 < courseInfo.offsetHeight
  ) {
    studyMode.style.position = "fixed";
    studyMode.style.right = "45px";
    studyMode.style.top = `${studyMode.offsetHeight / 4}px`;
  } else if (window.scrollY < courseContent.offsetTop + 80) {
    studyMode.style.position = "absolute";
    studyMode.style.right = "-50px";
    studyMode.style.top = `0`;
  } else if (window.scrollY + 60 > courseInfo.offsetHeight) {
    studyMode.style.position = "absolute";
    studyMode.style.right = "-50px";
    studyMode.style.top = `0 `;
  }
});

// ! shopping cart
const shoppingCartIcon = document.querySelector(".fa-shopping-bag");
const shoppingCartBox = document.querySelector(".shopping-cart-box");
const shoppingCartItem = document.querySelector(".shopping-cart-items");
const products = document.querySelectorAll(".wrapper-course .add-to-card-btn");

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
// todo: remove shopping cart item
function deleteCartItem(e) {
  const item = e.target;
  if (item.className === "fas fa-times") {
    const cartItem = item.parentElement;
    cartItem.remove();
    calculaterSumShoppingItem();
  }
}

//
products.forEach((item) => {
  item.addEventListener("click", addToBasket);
});
// todo: add to basket item
function addToBasket(e) {
  e.preventDefault();
  const course = e.target.parentElement.parentElement.parentElement;
  const courseImage = course.querySelector("img").src;
  const courseTitle = course.querySelector(".course-title a").innerText;
  let coursePriceItem = course.querySelector(".course-price .amount").innerText;
  if (coursePriceItem === "رایگان!") {
    coursePriceItem = 0;
  } else {
    coursePriceItem = Number(coursePriceItem.match(/\d+/));
  }
  createItem(courseImage, courseTitle, coursePriceItem);
}

// todo: create item and add to shopping cart
function createItem(courseImage, courseTitle, coursePriceItem) {
  const cartItemElement = document.createElement("div");
  cartItemElement.className = "shopping-cart-item";
  cartItemElement.innerHTML = `
    <i class="fas fa-times"></i>
    <div class="cart-item-content">
      <span class="item-title">${courseTitle}</span>
      <span class="item-price">${coursePriceItem} تومان</span>
    </div>
    <img
    src="${courseImage}"
    alt="${courseTitle}"
    />
    `;
  shoppingCartItem.appendChild(cartItemElement);
  calculaterSumShoppingItem();
}

// magnify IISE
const magnify = (function () {
  const picCourse = document.querySelector(".course-info .pic-course");
  const img = picCourse.querySelector("img");
  const glass = document.createElement("div");
  const isDimention = 150;
  let isVisible = false;

  glass.classList.add("glass");
  glass.style.width = `${isDimention}px`;
  glass.style.height = `${isDimention}px`;
  glass.style.backgroundImage = `url(${img.src})`;
  picCourse.append(glass);
  img.addEventListener("mouseover", function () {
    glass.style.display = "block";
    isVisible = true;
  });
  img.addEventListener("mouseout", function () {
    glass.style.display = "none";
    isVisible = false;
  });
  picCourse.addEventListener("mousemove", function (event) {
    if (isVisible) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const imgCordinates = img.getBoundingClientRect();
      const { left, top } = imgCordinates;
      const bgX = (100 * (mouseX - left)) / img.offsetWidth;
      const bgY = (100 * (mouseY - top)) / img.offsetHeight;
      glass.style.left = `${mouseX - left - isDimention / 2}px`;
      glass.style.top = `${mouseY - top - isDimention / 2}px`;
      glass.style.backgroundPosition = `${bgX}% ${bgY}%`;
    }
  });
})();

// study mode
const studyModeBtn = document.querySelector(".study-mode-btn");
let isActive = false;

studyModeBtn.addEventListener("click", function () {
  isActive = !isActive;
  if (isActive) {
    courseInfo.style.width = "80%";
    courseDetailInfo.style.display = "none";
  } else {
    courseInfo.style.width = "60%";
    courseDetailInfo.style.display = "block";
  }
});
// study mode
// accordion
const accordionIcin = document.querySelectorAll(
  ".course-section .fa-chevron-down"
);
accordionIcin.forEach((item) =>
  item.addEventListener("click", accordionToggle)
);
function accordionToggle(event) {
  const icon = event.target;
  const courseSection = icon.parentElement.parentElement;
  const panelGroup = courseSection.querySelector(".panel-group");
  const height = window.getComputedStyle(panelGroup).getPropertyValue("height");
  if (height === "0px") {
    panelGroup.style.height = "auto";
    panelGroup.style.transform = "scaleY(1)";
    icon.style.transform = "rotate(180deg)";
  } else {
    panelGroup.style.height = "0";
    panelGroup.style.transform = "scaleY(0)";
    icon.style.transform = "rotate(0)";
  }
}
// accordion
