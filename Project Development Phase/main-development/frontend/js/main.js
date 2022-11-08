// logout button

const profile_button = document.getElementById("user_icon");
const profile_div = document.querySelector(".profile_div");
profile_button.addEventListener('click', ()=>{
    profile_div.classList.toggle("display_none");
})

let nav_buttons = document.querySelectorAll(".nav_button");
nav_buttons.forEach(nav_button => {
    nav_button.addEventListener('click', () => {
        nav_buttons.forEach(nav_btn => {
            if(nav_btn.classList.contains("selected_nav_item")){
                nav_btn.classList.remove("selected_nav_item");
            }
            nav_button.classList.add("selected_nav_item");
        })
    })
});



