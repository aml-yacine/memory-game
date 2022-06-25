var card_img = document.getElementsByClassName("cardImg");
var back_img = document.getElementsByClassName("backImg");
var hintbtn = document.getElementById("hint");
var newGamebtn = document.getElementById("newgame");

// to flip img when click
function flip() {
  this.classList.toggle("flip");
  this.classList.add("flip");
}

for (var i = 0; i < card_img.length; i++) {
  card_img[i].addEventListener("click", flip)
}


// shuffiled images ....
var cards_arr = Array.from(card_img);
window.addEventListener("load", shuffle);

function shuffle() {
  cards_arr.forEach(card => {
    var random_card = Math.floor(Math.random() * card_img.length);
    card.style.order = random_card
  });
}

// to show two images only ....
var flag = true;
var twoImgArr = [];

for (var i = 0; i < card_img.length; i++) {
  card_img[i].addEventListener("click", flipclick)
}

function flipclick() {
  if (flag) {
    if (twoImgArr.length == 0) {
      twoImgArr[0] = this.children[1];
      twoImgArr[0].parentElement.removeEventListener("click", flipclick);

    } else if (twoImgArr.length == 1) {
      twoImgArr[1] = this.children[1];
      twoImgArr[1].parentElement.removeEventListener("click", flipclick);
      flag = false;
      setTimeout(checkTwoImg, 1000);
      
    }
    else if (twoImgArr.length == 2) {
      this.classList.remove("flip")
    }
  } else {
    this.classList.remove("flip")
    return;
  }
}
function addClick(arr) {
  arr.forEach((i) => {
    i.addEventListener("click", flipclick);
  })
}
hintbtn.addEventListener("click", hint);
var hintNumber = 0;
function hint() { // hint 3 times only 
  hintNumber++;
  if (hintNumber == 3) {
    hintbtn.disabled = true;
  }
  cards_arr.forEach((i) => {
    i.classList.add("flip")
  })
  setTimeout(() => {
    cards_arr.forEach((i) => {
      i.classList.remove("flip")
    })
  }, 1000)
}
function newgame() {
  shuffle();
  twoImgArr = [];
  flag = true;
  addClick(cards_arr);
  cards_arr.forEach((i) => {
    i.classList.remove("identical");
    i.classList.remove("flip");
  })
}
newGamebtn.addEventListener("click", newgame);


// to check two images ....
function checkTwoImg() {
  if (twoImgArr[0].children[0].getAttribute('src') === twoImgArr[1].children[0].getAttribute('src')) {
    twoImgArr[0].parentElement.classList.add("identical");
    twoImgArr[1].parentElement.classList.add("identical");
  } else {
    twoImgArr[0].parentElement.classList.remove("flip")
    twoImgArr[1].parentElement.classList.remove("flip")
  }

  twoImgArr = [];
  flag = true;
  addClick(cards_arr);
}









