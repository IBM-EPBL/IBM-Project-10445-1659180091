import { getter } from "./modules/server.js";
let apiData = {};
let heading = document.querySelectorAll(".menu_container h3");
let currHeading = "recommended";
let currPos = 0;
let arr = [
  "recommended",
  "headline",
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
  "cricket",
];
let verticalLoader = `        <div class="loading-cont">
<img src="../assets/newspaper-spinner.gif" alt="">
<h2>Loading...</h2>
</div>`;

async function fetcher() {
  let t = await getter("news/headline");
  for (const a of arr) {
    let t1 = await getter(`news/${a}`);
    apiData[a] = t1;
    if (a === "recommended") {
      document.querySelector(".vertical-wrapper").innerHTML = verticalLoader;
      verticalCardData(a, 0);
    }
  }
}

function verticalCardData(heading, start) {
  if (start === 0) {
    document.querySelector(".vertical-wrapper").innerHTML = "";
  }
  let data = apiData[heading];
  if (data === undefined) {
    document.querySelector(".vertical-wrapper").innerHTML = verticalLoader;
    return;
  }
  data = data["data"];
  data = data.slice(start, start + 6);
  console.log(data);
  let t = "";
  data.forEach((d) => {
    t += `<div class="news_wrapper" data-href="news.html?url=${d["url"]}">
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
    </div>
  </div>`;
  });
  document.querySelector(".vertical-wrapper").innerHTML += t;
  eventTriggerer();
}

function eventTriggerer() {
  document.querySelectorAll(".news_wrapper").forEach((t) => {
    t.addEventListener("click", (e) => {
      if (e.target.className === "bookmark") {
        return;
      } else {
        location.href = t.dataset.href;
      }
    });
  });
}

window.addEventListener("load", async () => {
  let t = await getter("islogin");
  console.log(t);
  if (t["status"] === "not logged in") {
    location.href = "login.html";
  } else {
    fetcher();
  }
});

let bookmarks = document.querySelectorAll(".bookmark");
bookmarks.forEach((bookmark) => {
  bookmark.addEventListener("click", () => {
    if (bookmark.src.match("../assets/bookmark-regular.svg")) {
      bookmark.src = "../assets/bookmark-solid.svg";
    } else {
      bookmark.src = "../assets/bookmark-regular.svg";
    }
  });
});

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight > scrollHeight - 5) {
    setTimeout(() => {
      currPos += 6;
      verticalCardData(currHeading, currPos);
    }, 400);
  }
});

heading.forEach((t) => {
  t.addEventListener("click", (e) => {
    let temp = e.target.textContent;
    temp = temp.toLowerCase();
    if (temp !== currHeading) {
      currHeading = temp;
      currPos = 0;
      scrollTo(0, 0);
      document.querySelector(".vertical-wrapper").innerHTML = verticalLoader;
      verticalCardData(currHeading, 0);
    }
  });
});
