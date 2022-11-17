import { poster } from "./modules/server.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const token = urlParams.get("token");
async function verifyer() {
  let data = await poster("register/verify", {
    token: token,
  });
  if (data["status"] === "Couldn't verify") {
    document.querySelector(
      ".status-cont"
    ).innerHTML = `<div class="welcome-text">Uh oh...😞</div>
        <div class="sub-text">Couldn't verify you at this moment...</div>`;
    setTimeout(() => {
      location.href = "login.html";
    }, 8000);
  }
  if (data["status"] === "verified successfully") {
    document.querySelector(
      ".status-cont"
    ).innerHTML = `<div class="welcome-text">வணக்கம் 🙏</div>
        <div class="sub-text">Let's know what's happening around us...</div>`;
    setTimeout(() => {
      location.href = "login.html";
    }, 8000);
  }
}
verifyer();
