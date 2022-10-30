const endpoint = {
    "register": "http://localhost:5000/api/auth/register",
    "login": "http://localhost:5000/api/auth/login",
    "resendMail": "http://localhost:5000/api/auth/verify"
}

const loginSubmit = document.querySelector(".login-submit");
const signupSubmit = document.querySelector(".signup-submit");
const authLoader = document.querySelectorAll(".auth-loader");
const authErr = document.querySelectorAll(".auth-err"); 
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");

const reSendTemplate = '<div class="re-send-msg">Please Verify the Email</div><button class="btn resend-btn">Resend</button><div class="msg"></div>'

let isFormBtnEnalbed = true;
let isResendBtnEnabled = true;
let intervalUid = 0;

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if(!isFormBtnEnalbed)
        return

    toggleLoader(1, loginSubmit, authLoader[0]);

    const req_data = {
        email: e.target[0].value,
        password: e.target[1].value
    }
    const res = await fetch(endpoint.login, {
        method:"POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req_data)
    });
    const res_data = await res.json();
    console.log(res)
    if(res.status === 401){
        console.log('data', res_data)
        const cnt = document.querySelector(".auth-container")
        cnt.innerHTML = reSendTemplate;

        document.querySelector(".resend-btn").addEventListener("click", resendMail.bind(null, req_data.email));
        
    }
    else if(res.status !== 200){
        showMessage(authErr[0], res_data.message);
        toggleLoader(0, loginSubmit, authLoader[0]);
    }
    else{
        window.location.href = "index.html"
    }
});

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if(!isFormBtnEnalbed)
        return
    
    toggleLoader(1, signupSubmit, authLoader[1]);

    const req_data = {
        email: e.target[0].value,
        password: e.target[1].value,
        re_password: e.target[2].value,
        username: e.target[3].value,
        rollno: e.target[4].value
    }
    const res = await fetch(endpoint.register, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req_data)
    });
    const res_data = await res.json();

    if(res.status !== 201){
        showMessage(authErr[1], res_data.message);
    }
    else{
        const msgElem = document.querySelector(".msg");
        showMessage(msgElem, "Successfully Registered Please Login");
        setTimeout(showMessage.bind(null, msgElem, ''), 4000)
        loginBtn.click();
    }
    toggleLoader(0, signupSubmit, authLoader[1]);
});

const showMessage = (elem, msg) => {
    elem.innerText = msg;
    setTimeout(() => elem.innerText = "", 2000);
}

const toggleLoader = (toEnable, submitBtn, loader) => {
    if(toEnable){
        isFormBtnEnalbed = false;
        submitBtn.disabled = true;
        loader.classList.remove("none");
    }
    else{
        isFormBtnEnalbed = true;
        submitBtn.disabled = false;
        loader.classList.add("none");
    }
}

// To change views
const loginBtn = document.querySelector('.btn-login');
const signUpBtn = document.querySelector('.btn-signup');
const authBtn = document.querySelectorAll('.auth-header h3');
const formCnt = document.querySelectorAll('.auth-form-cnt');

loginBtn.addEventListener("click" ,(e) => {
    authBtn[0].classList.add("active");
    authBtn[1].classList.remove("active");
    formCnt[0].classList.remove("none");
    formCnt[1].classList.add("none");
});
signUpBtn.addEventListener("click", (e) => {
    authBtn[1].classList.add("active");
    authBtn[0].classList.remove("active");
    formCnt[1].classList.remove("none");
    formCnt[0].classList.add("none");
});

window.addEventListener("load", async () => {
    toggleLoader(1, loginSubmit, authLoader[0]);
    toggleLoader(1, signupSubmit, authLoader[1]);

    const res = await fetch(endpoint.login, {
        method: "GET",
        credentials: "include"
    });
    const data = await res.json();
    console.log(data, res);
    if(res.status == 200){
        window.location.href = "index.html"
    }

    toggleLoader(0, loginSubmit, authLoader[0]);
    toggleLoader(0, signupSubmit, authLoader[1]);
});