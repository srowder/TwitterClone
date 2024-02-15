/* Token Retrieval */
let token = getCookie("loginToken");

function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })
    return cookie[cookieName];
  }

/* Existing User List Retrieval */
getUsers()
let existingUsers = JSON.parse(localStorage.getItem("userArray"))

async function getUsers(){
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const res = await fetch("http://localhost:3000/api/v1/users", requestOptions)
    if(res.status==200){
      const data = await res.text();
      localStorage.setItem('userArray', data)
    } else {
      console.log("Error")
    }
}

/* Window Onload Functions */
window.onload=function(){
  populateUserList()
}

function logOut(){
    document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    localStorage.clear();
    window.location.href = "..";
  }
