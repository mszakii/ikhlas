// Contact Rive
new rive.Rive({
  src: "https://raw.githubusercontent.com/CoderCipher/cdn/main/uploads/contact_no_loop.riv",
  canvas: document.getElementById("canvas"),
  autoplay: false,
  stateMachines: "State Machine 1",
});

submit.onclick = function () {
  new rive.Rive({
    src: "https://raw.githubusercontent.com/CoderCipher/cdn/main/uploads/contact_no_loop.riv",
    canvas: document.getElementById("canvas"),
    autoplay: true,
    stateMachines: "State Machine 1",
  });
};

// https://rive.app/community/4501-9160-mail-send/

// price
/*btn30 = document.getElementById("btn30");
btn60 = document.getElementById("btn60");

div30 = document.getElementById("div30");
div60 = document.getElementById("div60");

btn30.addEventListener("click", () => {
  div60.style = "display :none";
  btn60.classList.remove("btn-blue");
  btn60.classList.add("btn-rounded");
  div30.style = "";
  btn30.classList.add("btn-blue");
  btn30.classList.remove("btn-rounded");
});

btn60.addEventListener("click", () => {
  div30.style = "display :none";

  btn30.classList.remove("btn-blue");

  btn30.classList.add("btn-rounded");
  div60.style = "";
  btn60.classList.add("btn-blue");

  btn60.classList.remove("btn-rounded");
});

// choose btn in pricing section
let cardsArr = Array.from(div30.children);
cardsArr.push(...Array.from(div60.children));

cardsArr.forEach((element) => {
  element.onclick = function () {
    location.href = "/done";
  };
});*/

// price end

// Get the button element
const scrollBtn = document.querySelector("#scroll-btn");

// Show the button if the user has scrolled down more than 20% of the page height
document.addEventListener("scroll", () => {
  const scrollHeight = window.scrollY;
  const pageHeight = document.body.scrollHeight - window.innerHeight;
  if (scrollHeight > pageHeight * 0.2) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

// Scroll the page to the top when the button is clicked
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const yearElement = document.getElementById("yearCopyright");

let date = new Date();

yearElement.innerHTML = date.getFullYear();

console.log(
  "Console is for developers only! Do not write anything there that you do not understant to prevent being attacked by Hackers!"
);

// doamin
document.getElementById("domain").innerHTML = "alikhlas-institute.com";
