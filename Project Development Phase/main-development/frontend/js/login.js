import { poster } from "./modules/server.js";
const signupbutton = document.getElementById("signup");
const signinbutton = document.getElementById("signin");
const container = document.getElementById("container");

let signupVal = false;

signupbutton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});
signinbutton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

const signupForm = document.querySelector("#signup-form");
signupForm.querySelector("button").addEventListener("click", async (e) => {
  const name = signupForm.elements[0].value;
  const email = signupForm.elements[1].value;
  const password = signupForm.elements[2].value;
  const repassword = signupForm.elements[3].value;
  if (
    name === "" ||
    email === "" ||
    password === "" ||
    repassword === "" ||
    !signupVal
  ) {
    return;
  }
  if (password !== repassword) {
    signupForm.querySelector("h2").innerText = "⚠️ Password doesn't match";
    return;
  } else {
    signupForm.querySelector("h2").innerText = "";
  }
  const checkboxes = document.querySelectorAll(
    ".container-checkbox input[type='checkbox']"
  );
  let favArr = [];
  checkboxes.forEach((t) => {
    if (t.checked) {
      favArr.push(t.value);
    }
  });
  signupForm.querySelector("h2").innerText = "⏳ Saving data in Server...";
  let postData = {
    name: name,
    email: email,
    password: password,
    favourite: favArr,
  };
  let response = await poster("register", postData);
  if (response.status === "Successfully registered") {
    signupForm.querySelector("h2").innerText =
      "User registered successfully ✅...";
  }
  setTimeout(() => {
    signupForm.querySelector("h2").innerText =
      "⚠️ Please verify your email before log in";
  }, 1000);
  setTimeout(() => {
    location.reload();
  }, 3000);
});

signupForm.elements[2].addEventListener("change", (e) => {
  let passwordRegex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
  if (!e.target.value.match(passwordRegex)) {
    e.target.setCustomValidity(
      "Your password should be of 8 character with atleast one uppercase, one lowercase, one number and one special digit"
    );
    e.target.value = "";
  } else {
    e.target.setCustomValidity("");
  }
});

signupForm.elements[1].addEventListener("change", async (e) => {
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (e.target.value.match(emailRegex)) {
    let data = await poster("register/check", {
      email: e.target.value,
    });
    signupVal = false;
    if (data["status"] === false) {
      signupForm.querySelector("h2").innerText = "⚠️ Email already in use";
      signupForm.elements[1].value = "";
    } else {
      signupForm.querySelector("h2").innerText = "";
      signupVal = true;
    }
  } else {
    e.target.value = "";
    signupVal = false;
  }
});

const signinForm = document.querySelector(".sign-in-container form");
signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signinForm.elements[0].value;
  const password = signinForm.elements[1].value;
  const data = {
    email: email,
    password: password,
  };
  let retdata;
  let emailCheckData = await poster("register/check", {
    email: email,
  });
  if (emailCheckData["status"] === false) {
    retdata = await poster("login", data);
    if(retdata["status"]==="Not verified"){
      signinForm.querySelector("h2").innerText="⚠️ Please verify your mail by clicking the link sent to your mail ID"
    }
    else if(retdata["status"]==="Wrong credentials"){
      signinForm.querySelector("h2").innerText="⚠️ Wrong credentials"
    }
    else if(retdata["status"]==="Successfully Logged in"){
      signinForm.querySelector("h2").innerText="Logged In ✅...Redirecting⏳"
    }
    else{
      signinForm.querySelector("h2").innerText=""
    }
  }
  else{
    signinForm.querySelector("h2").innerText="⚠️ Email not registered"
  }
});
