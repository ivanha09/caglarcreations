function showHamburgerMenu() {
  let items = Array.prototype.slice.apply(document.querySelectorAll(".item"));

  items.forEach((item) => {
    if (item.className === "item") {
      item.className += " responsive";
    } else {
      item.className = "item";
    }
  });
}

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("reviewCard");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

function cardSlide() {
  console.log(this.querySelector(".card"));
}

window.onload = function () {
  AOS.init();

  let addReviews = document.querySelector("#review-container");
  let reviewDataList = window.reviewData;
  let reviewDataCards = "";

  reviewDataList.forEach(function (review) {
    let starRating = "";
    for (let i = 0; i < review.stars; i++) {
      starRating += `<i class="fas fa-star"></i>`;
    }

    reviewDataCards += `<div class="reviewCard"
         data-aos="fade-up"
         data-aos-delay="200"
        >
        <img class="reviewer" src="${review.image}" alt="">
    <h3>
        ${review.name}
    </h3>
    <div>
    ${starRating}
    </div>
    <h4>
        ${review.product}
    </h4>
    <p class="reviewComment">
        ${review.comment}
    </p>
    </div>`;
  });
  addReviews.innerHTML += reviewDataCards;

  // Slide show
  var slideIndex = 0;
  showSlides(slideIndex);

  // First Letter
  var eachWord = document.getElementsByClassName("each-word");
  for (var i = 0; i < eachWord.length; i++) {
    eachWord[i].innerHTML = eachWord[i].innerHTML.replace(
      /([A-Z])/gm,
      "<span class='initial'>$1</span>"
    );
  }

  let products = document.querySelectorAll(".card");
  products.forEach(function (product) {
    product.addEventListener("mouseover", showCard);
    product.addEventListener("mouseleave", hideCard);
  });
};

function showCard() {
  let cardInfo = this.querySelector(".card-cost");
  let cardImg = this.querySelector("img");
  cardInfo.style.visibility = "visible";
  cardImg.classList.add("shadow");
}

function hideCard() {
  let cardInfo = this.querySelector(".card-cost");
  let cardImg = this.querySelector("img");
  cardInfo.style.visibility = "hidden";
  cardImg.classList.remove("shadow");
}

function expandImg(imgs) {
  console.log(imgs.src);
  let expandImg = "";
  if (imgs.src.includes("bookmark")) {
    expandImg = document.getElementById("expandedBookmarkImg");
  }
  if (imgs.src.includes("wallet")) {
    expandImg = document.getElementById("expandedWalletImg");
  }
  if (imgs.src.includes("airpod")) {
    expandImg = document.getElementById("expandedAirpodImg");
  }
  expandImg.src = "";
  expandImg.src = imgs.src;
  expandImg.parentElement.style.display = "block";
}

function selected(option) {
  let change = document.querySelector("#personalize");
  if (option.value == "Select an option" || option.value == "No Personalized") {
    change.style.display = "none";
  } else {
    change.style.display = "block";
  }
}

function colorSelect(option) {
  let removeSelected = document.querySelectorAll(".color > .selected");
  console.log(option.htmlFor);
  removeSelected.forEach((e) => {
    e.classList.remove("selected");
  });
  option.classList.add("selected");
}
