import { getter } from "./modules/server.js";

window.addEventListener("load",()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const url = urlParams.get("url");
    document.querySelector("iframe").src=url;
})

document.querySelector(".logout").addEventListener("click",()=>{
    getter("logout");
})