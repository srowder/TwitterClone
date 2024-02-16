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
      // console.log(data + "This is RES TEXT");   
    } else{
      console.log("Cannot retrieve followed users.")
    }

}
async function populateUserList() {
  if (!existingUsers || existingUsers.length === 0) {
      console.error('existingUsers is null or empty');
      window.location.reload();
      return;
  }

  await getFollowedUsers();

  const followedUsers = JSON.parse(localStorage.getItem('followedUsers')) || [];
  // console.log(localStorage.getItem('followedUsers'))
  console.log(followedUsers);

  for (let i = 0; i < existingUsers.length; i++) {
      if (existingUsers[i] === username) {
          continue;
      }

      let userDiv = document.createElement('div');
      userDiv.className = "userDiv";
      userDiv.id = existingUsers[i];
      document.getElementById("user-list").appendChild(userDiv);

      let userDivText = document.createElement('p');
      userDivText.className = "userNameText";
      userDivText.textContent = existingUsers[i];
      document.getElementById(existingUsers[i]).appendChild(userDivText);

      let followBtn = document.createElement('button');
      followBtn.className = "userFollowBtn";
      followBtn.value = existingUsers[i];

      // console.log(followedUsers);
      // console.log(existingUsers[i]);

      // Check if the user is followed and set button text accordingly
      if (followedUsers.includes(existingUsers[i])) {
          followBtn.textContent = "Unfollow";
      } else {
          followBtn.textContent = "Follow";
      }

      followBtn.onclick = () => CheckButton(followBtn);
      document.getElementById(existingUsers[i]).appendChild(followBtn);
  }
}
let hasReloaded = false;

function reloadOnce() {
    if (!hasReloaded) {
        window.location.reload();
        hasReloaded = true;
    }
}

async function CheckButton(followBtn) {
  let userId = followBtn.value;
  let buttonText = followBtn.textContent;

  if (buttonText === "Follow") {
      followBtn.textContent = "Unfollow";
      await click_followUser(userId);
      // Update the followed users list in localStorage
      updateFollowedUsers(userId, true);
      reloadOnce();
  } else if (buttonText === "Unfollow") {
      followBtn.textContent = "Follow";
      await click_unfollowUser(userId);
      // Update the followed users list in localStorage
      updateFollowedUsers(userId, false);
      reloadOnce();
  }
}

function updateFollowedUsers(userId, followStatus) {
  let followedUsers = JSON.parse(localStorage.getItem('followedUsers')) || [];
  if (followStatus) {
      followedUsers.push(userId);
  } else {
      followedUsers = followedUsers.filter(user => user !== userId);
  }
  localStorage.setItem('followedUsers', JSON.stringify(followedUsers));
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