import { getter } from "./modules/server.js";
async function fetcher(){
    let arr=["recommended","headline","sport", "tech", "world", "finance", "politics", "business","economics", "entertainment", "beauty", "travel", "music", "food", "science", "cricket"]
    let t=await getter("news/headline");
    for(const a of arr){
        console.log(a)
        let t1=await getter(`news/${a}`);
        console.log(t1);
    }
}

window.addEventListener("load",async()=>{
  let t=await getter("islogin");
  console.log(t)
  if(t["status"]==="not logged in"){
    location.href="login.html";
  }
  else{
    fetcher()
  }
})

let bookmarks = document.querySelectorAll(".bookmark");
bookmarks.forEach( bookmark => {
    bookmark.addEventListener("click", () => {
        if(bookmark.src.match("../assets/bookmark-regular.svg")){
            bookmark.src = "../assets/bookmark-solid.svg";
        }
        else {
            bookmark.src = "../assets/bookmark-regular.svg";
        }
        
    })
})