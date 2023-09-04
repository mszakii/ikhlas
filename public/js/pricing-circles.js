div30 = document.getElementById("div30");

// choose btn in pricing section
let cardsArr = Array.from(div30.children);

cardsArr.forEach((element) => {
  element.onclick = function () {
    location.href = `${location.pathname}/register?plan=${element.getAttribute("plan")}`;
  };
});

// price end

const yearElement = document.getElementById("yearCopyright");

let date = new Date();

yearElement.innerHTML = date.getFullYear();

console.log(
  "Console is for developers only! Do not write anything there that you do not understant to prevent being attacked by Hackers!"
);

// doamin
document.getElementById("domain").innerHTML = "alikhlas-institute.com";
