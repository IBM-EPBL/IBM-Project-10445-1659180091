const signupbutton=document.getElementById("signup");
const signinbutton=document.getElementById("signin");
const container=document.getElementById("container");

signupbutton.addEventListener('click',()=>{
    console.log("button");
    container.classList.add("right-panel-active");
})
signinbutton.addEventListener('click',()=>{
    console.log("button");
    container.classList.remove("right-panel-active");
})