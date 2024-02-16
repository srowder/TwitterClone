/* FOLLOW-RELATED FUNCTIONS */
async function getFollowedUsers() {
  const currUser = localStorage.getItem('username');
  const endpoint = `http://localhost:3000/api/v1/users/${currUser}/following`

  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const res = await fetch(endpoint, requestOptions)
    if(res.status==200){
      const data = await res.text();
      localStorage.setItem('followedUsers', data)
    } else{
      console.log("Cannot retrieve followed users.")
    }
}

function populateUserList() {

  if (!existingUsers || existingUsers.length === 0) {
    console.error('existingUsers is null or empty');
    window.location.reload(); 
    return;
  }


  for (let i = 0; i < existingUsers.length; i++){

    if (existingUsers[i] === username) {
      continue;
    }

    let userDiv = document.createElement('div');
    userDiv.className = "userDiv"; // Use className instead of class
    userDiv.id = existingUsers[i];
    document.getElementById("user-list").appendChild(userDiv);

    let userDivText = document.createElement('p');
    userDivText.textContent = existingUsers[i];
    document.getElementById(existingUsers[i]).appendChild(userDivText);

    let followBtn = document.createElement('button');
    followBtn.textContent = "Follow";
    followBtn.value = existingUsers[i];
    followBtn.onclick = () => CheckButton(followBtn);
    // followBtn.onclick = () => click_followUser(followBtn.value);
    document.getElementById(existingUsers[i]).appendChild(followBtn);
  }
}


function CheckButton(followBtn) {
  // Access the button properties
  let userId = followBtn.value;
  let buttonText = followBtn.textContent;

  if (buttonText === "Follow") {
    // Change button text to "Unfollow"
    followBtn.textContent = "Unfollow";
    click_followUser(followBtn.value);
  } else if (buttonText === "Unfollow") {
    // Change button text to "Follow"
    followBtn.textContent = "Follow";
    click_unfollowUser(followBtn.value);
  }
}

/*  FETCH REQUESTS: */
async function followUser() {
    const currUser = localStorage.getItem('username');
    const userToFollow = document.getElementById('search-user-1').value;
    const endpoint = `http://localhost:3000/api/v1/users/${currUser}/following/${userToFollow}`;
  
    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`);
  
    let raw = "";
  
    let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
  
    if(existingUsers.includes(userToFollow)){
      const res = await fetch(endpoint, requestOptions)
      if(res.status==201){
        alert("User followed.")
      } else {
        alert("Something went wrong.")
      }
    } else {
      alert("User to follow does not exist")
    }
  }

async function click_followUser(user){
    const currUser = localStorage.getItem('username');
    const userToFollow = user;
    const endpoint = `http://localhost:3000/api/v1/users/${currUser}/following/${userToFollow}`;

    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`);

    let raw = "";

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const res = await fetch(endpoint, requestOptions)
    if(res.status==201) {
        alert(`Successfully followed ${user}`)
    } else {
        alert("Something went wrong.")
    }
}
  
async function click_unfollowUser(user){
    const currUser = localStorage.getItem('username');
    const userToUnfollow = user;
    const endpoint = `http://localhost:3000/api/v1/users/${currUser}/following/${userToUnfollow}`;

    let myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`);

    let raw = "";

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const res = await fetch(endpoint, requestOptions)
    if(res.status==201) {
        alert("User unfollowed.")
    } else {
        alert("Something went wrong.")
    }
}