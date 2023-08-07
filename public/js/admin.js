eye.addEventListener("click", () => {
  if (pass.type == "password") {
    pass.type = "text"
    eye.innerHTML = "visibility"
  } else {
    pass.type = "password"
    eye.innerHTML = "visibility_off"
  }
});
