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

//TO USE POST API. APPENDS THE POSTS TO POST.JSON
async function userPost() {
    console.log(token);
    console.log(username);
    var getNewPost = document.getElementById('postContent').value;
    try {
        const res = await fetch("/api/v1/posts", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: getNewPost
            })
        });

        console.log(await res.text());
    } catch (error) {
        console.error('Error posting:', error);
    }
}

async function displayUserPosts() {
  try {
    const res = await fetch(`/api/v1/posts?username=${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      console.error(`Error fetching all following posts: ${res.status} ${res.statusText}`);
      return;
    }

    const posts = await res.json();

    // Map through posts to generate HTML for each post
    const userPostHTML = posts.reverse().map(post => {
      var content = post.content; // Assuming your post object has a 'content' property
      var postDiv = document.createElement('div');
      postDiv.className = 'post';
      var profilePicture = document.createElement('img');
      profilePicture.className = 'profile-picture';
      profilePicture.src = post.profilePictureURL; // Assuming your post object has a 'profilePictureURL' property
      var postContent = document.createElement('p');
      postContent.textContent = content;
      var likeButton = document.createElement('button');
      likeButton.className = 'likeBtn';
      likeButton.textContent = 'Like';
      var likeCount = document.createElement('span');
      likeCount.className = 'likeCount'; 
      likeCount.textContent = '0';

      postDiv.appendChild(profilePicture);
      postDiv.appendChild(postContent);
      postDiv.appendChild(likeButton);
      postDiv.appendChild(likeCount); 

      likeButton.addEventListener('click', function() {
          if (likeButton.textContent === 'Like') {
              var currentLikes = parseInt(likeCount.textContent);
              likeCount.textContent = currentLikes + 1;
              likeButton.textContent = 'Unlike';
          } else {
              var currentLikes = parseInt(likeCount.textContent);
              likeCount.textContent = currentLikes - 1;
              likeButton.textContent = 'Like';
          }
      });

      return postDiv.outerHTML; // Return the HTML content for this post
      }).join(''); // Join all HTML content into a single string

      postsContainer.innerHTML += userPostHTML;
    } catch (error) {
      console.error('Error fetching all following posts:', error);
    }
}

/* Follow Related Fetch Requests */
async function followUser(){
  let userToFollow = document.getElementById('search-user-1').value;
  let currUser = localStorage.getItem('username');
  let endpoint = `http://localhost:3000/api/v1/users/${currUser}/following/${userToFollow}`;

  console.log(userToFollow)
  console.log(currUser)
  console.log(endpoint)

  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${token}`);

  var raw = "";

  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
  };

  const res = await fetch(endpoint, requestOptions)
  if(res.status==201){
    alert("User followed")
  } else if (res.status==400){
    alert("User does not exist.")
  } else {
    alert("Something went wrong.")
  }
}

function logOut(){
  document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  localStorage.clear();
  window.location.href = "../Login-Signup/login.html";
}