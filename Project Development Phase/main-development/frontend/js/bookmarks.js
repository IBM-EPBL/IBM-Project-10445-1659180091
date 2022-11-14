import { getter, poster } from "./modules/server.js";

let verticalWrapper = document.querySelector(".vertical-wrapper");
let bookmarkLoadingIcon = document.querySelector(".animation-container");

async function fetcher() {
  let data = await getter("bookmark");
  verticalWrapper.innerHTML = "";
  data["data"].forEach((d, i) => {
    d = JSON.parse(d);
    let element = elementCreator(d, data["id"][i]);
    verticalWrapper.appendChild(element);
  });
}

function elementCreator(d, id) {
  console.log(d);
  let element = document.createElement("div");
  element.className = "news_wrapper";
  element.dataset.href = `news.html?url=${d["url"]}`;
  element.dataset.id = id;
  element.innerHTML = `
    <img class="bookmark" src="../assets/bookmark-solid.svg" alt="" />
    <div class="news_cont">
      <div class="img_cont">
        <img
          src=${d["img"] || d["image"]}
          alt=""
          class="news_thumbnail"
        />
      </div>
      <div class="news_content">
        <h2 class="news_heading">
          ${d["title"]}
        </h2>
        <div class="news-footer">
          <h3 class="date">${d["date"]}</h3>
          <h3 class="topic">${d["topic"]}</h3>
        </div>
      </div>
    </div>`;
  addEventListeners(element);
  return element;
}

function addEventListeners(t) {
  t.addEventListener("click", async (e) => {
    if (e.target.className === "bookmark") {
      bookmarkLoadingIcon.classList.remove("none");
      await poster("unbookmark", { id: t.dataset.id });
      bookmarkLoadingIcon.classList.add("none");
      verticalWrapper.removeChild(t);
    } else {
      location.href = t.dataset.href;
    }
  });
}

document.querySelector(".logout").addEventListener("click",()=>{
    getter("logout");
})

fetcher();
