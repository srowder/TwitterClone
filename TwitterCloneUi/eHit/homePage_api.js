/* Token Retrieval */
let token = getCookie("loginToken")
function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })
    return cookie[cookieName];
  }

function getPost(){
    
}

function logOut(){
  document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  localStorage.clear();
  window.location.href = "../Login-Signup/login.html";
}