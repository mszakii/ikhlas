// price
btn30 = document.getElementById("btn30");
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
});

// price end
