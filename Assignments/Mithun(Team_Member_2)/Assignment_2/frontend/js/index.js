const baseURL = "http://localhost:5000"

const endpoint = {
    "login": `${baseURL}/api/auth/login`,
    "logout": `${baseURL}/api/auth/logout`,
}

const logoutBtn = document.querySelector(".user-logout");

const logoutUser= async () => {
    const res = await fetch(endpoint.logout, {
        credentials: 'include'
    })
    if(res.status === 200){
        toggleUserLogged(false, '')
    }
}

logoutBtn.addEventListener("click", logoutUser);

const isUserLoggedIn = async () => {
    const res = await fetch(endpoint.login, {
        method: "GET",
        credentials: "include"
    });
    return res;
}

const toggleUserLogged = (isLoggedIn, username) => {
    const navLogin = document.querySelector(".login");
    const navUser = document.querySelector(".user");
    if(isLoggedIn){
        navLogin.classList.add("none");
        navUser.classList.remove("none");
        username = username.split('@');
        navUser.querySelector(".user-name").innerText = username[0];

    }
    else{
        navLogin.classList.remove("none");
        navUser.classList.add("none");
        navUser.querySelector(".user-name").innerText = '';
        document.querySelector(".username span").innerText = '';
        document.querySelector(".rollno span").innerText = '';
    }
}

window.addEventListener("load", async () => {
    const res = await isUserLoggedIn();
    const data = await res.json();
    console.log(data);
    if(res.status == 200){
        toggleUserLogged(true, data['email'])
        document.querySelector(".username span").innerText = data.username;
        document.querySelector(".rollno span").innerText = data.rollno.toUpperCase();
    }

});