import Cookies from "js-cookie";

export function setEmail(email){
    sessionStorage.setItem("email",email)
}

export function getEmail(){
    return sessionStorage.getItem("email")
}

export function unauthorized(code){
    if(code===401){
        sessionStorage.clear();
        localStorage.clear();
        window.location.href="/auth/admin/sub-login"
    }
}


export const isLoggedIn = () => {
    let token = Cookies.get('token')
    if(token){
        return !!Cookies.get('token');
    }
    else{
        sessionStorage.clear()
        localStorage.clear()
        return false
    }
}

