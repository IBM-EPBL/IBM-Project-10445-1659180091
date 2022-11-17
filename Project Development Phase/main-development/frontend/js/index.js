import { getter, poster } from "./modules/server.js";

//variables

let apiData = {};
let heading = document.querySelectorAll(".menu_container h3");
let currHeading = "recommended";
let currPos = 0;
let arr = [
  "headline",
  "recommended",
  "sport",
  "tech",
  "world",
  "finance",
  "politics",
  "business",
  "economics",
  "entertainment",
  "beauty",
  "travel",
  "music",
  "food",
  "science",
  "cricket"
];
let verticalLoader = document.createElement("div");
verticalLoader.className="loading-cont";
verticalLoader.innerHTML=`<img src="../assets/newspaper-spinner.gif" alt="">
<h2>⌛️</h2>`
let noDataLoader = `<div class="loading-cont">
<img src="../assets/no-data.gif" alt="">
<h2>Try again after some time...😔</h2>
</div>`;
let verticalWrapper = document.querySelector(".vertical-wrapper");
let horizontalWrapper = document.querySelector(".horizontal_content");
let bookmarks = document.querySelectorAll(".bookmark");
let bookmarkLoadingIcon=document.querySelector(".animation-container");
//Data fillers

function horizontalCardData() {
  horizontalWrapper.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    let heading = Math.floor(Math.random() * arr.length);
    let topic = arr[+heading];
    let data =
      apiData[topic]["data"][
        Math.floor(Math.random() * apiData[topic]["data"].length)
      ];
    let element = elementCreator(data);
    element.innerHTML = `
    <img class="bookmark" src="../assets/bookmark-regular.svg" alt="" />
    <div class="news_cont">
      <div class="img_cont">
        <img
          src=${data["img"] || data["image"]}
          alt=""
          class="news_thumbnail"
        />
      </div>
      <div class="news_content">
        <h2 class="news_heading">${data["title"]}</h2>
      </div>
    </div>`;
    addEventListeners(element);
    horizontalWrapper.appendChild(element);
  }
}

function verticalCardData(heading, start) {
  if(verticalWrapper.contains(verticalLoader)){
    verticalWrapper.removeChild(verticalLoader);
  }  
  if (start === 0) {
    document.querySelector(".vertical-wrapper").innerHTML = "";
  }
  let data = apiData[heading];
  if(data===undefined){
    verticalWrapper.innerHTML="";
    verticalWrapper.appendChild(verticalLoader);
  }
  if (data["data"] === undefined || data["data"].length === 0) {
    verticalWrapper.innerHTML = noDataLoader;
    return;
  }
  data = data["data"];
  data = data.slice(start, start + 6);
  data.forEach((d) => {
    let element = elementCreator(d);
    element.innerHTML = `
    <img class="bookmark" src="../assets/bookmark-regular.svg" alt="" />
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
    verticalWrapper.appendChild(element);
  });
}

//Event Listeners

function addEventListeners(t) {
  t.addEventListener("click",async(e) => {
    if (e.target.className === "bookmark") {
      bookmarkLoadingIcon.classList.remove("none");
      await poster("bookmark", { news: t.dataset.news });
      bookmarkLoadingIcon.classList.add("none");
      let img=t.querySelector("img");
      img.className+=" unbookmark";
      img.src="../assets/bookmark-solid.svg"
    } else {
      let a=document.createElement("a");
      a.href=t.dataset.href;
      a.target="_blank";
      a.click();
    }
  });
}

window.addEventListener("load", async () => {
  verticalWrapper.appendChild(verticalLoader);
  let t = await getter("islogin");
  if (t["status"] === "not logged in") {
    location.href = "login.html";
  } else {
    fetcher();
  }
});

bookmarks.forEach((bookmark) => {
  bookmark.addEventListener("click", () => {
    if (bookmark.src.match("../assets/bookmark-regular.svg")) {
      bookmark.src = "../assets/bookmark-solid.svg";
    } else {
      bookmark.src = "../assets/bookmark-regular.svg";
    }
  });
});

const scrollFunction=() => {
  const { scrollHeight} = document.documentElement;
  const scrollTop=window.pageYOffset;
  const clientHeight=window.innerHeight;
  if (scrollTop + clientHeight > scrollHeight - 5) {
    setTimeout(() => {
      currPos += 6;
      verticalCardData(currHeading, currPos);
    }, 400);
  }
}


window.addEventListener("scroll", scrollFunction);
window.addEventListener("touchmove",scrollFunction);

heading.forEach((t) => {
  t.addEventListener("click", (e) => {
    let temp = e.target.textContent;
    temp = temp.toLowerCase();
    if (temp !== currHeading) {
      currHeading = temp;
      currPos = 0;
      scrollTo(0, 0);
      while (verticalWrapper.lastElementChild) {
        verticalWrapper.removeChild(verticalWrapper.lastChild);
      }
      verticalCardData(currHeading, 0);
    }
  });
});

document.querySelector(".logout").addEventListener("click", () => {
  getter("logout");
});

//utils
function elementCreator(data) {
  let element = document.createElement("div");
  element.className = "news_wrapper";
  element.dataset.href = `news.html?url=${data["url"]}`;
  element.dataset.news = JSON.stringify(data);
  return element;
}

async function fetcher() {
  for (const a of arr) {
    let t1 = await getter(`news/${a}`);
    apiData[a] = t1;
    if(a===currHeading){
      verticalCardData(a,currPos);
    }
  }
  horizontalCardData();
}
