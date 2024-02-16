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


     // Clear the postsContainer before appending new posts
     postsContainer.innerHTML = '';

    // Map through posts to generate HTML for each post
    const userPostHTML = posts.reverse().map(post => {
      var content = post.content; // Assuming your post object has a 'content' property

      const timestamp = post.dateTimePosted;
      const date = new Date(timestamp);


      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);

      //For Speciific Date with Time
      // const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      // const formattedDate = date.toLocaleString('en-US', options);

      var dateTimePosted = formattedDate;

      var postDiv = document.createElement('div');
            postDiv.className = 'post';

            var postHead = document.createElement('div')
            postHead.className = 'post-head'

            var postUser = document.createElement('span')
            postUser.className = "post-head-user"
            postUser.textContent = username;
            console.log(postUser + "hello");

            var postTime = document.createElement('span')
            postTime.className = "post-head-user"
            postTime.textContent = dateTimePosted;
            
            var profilePicture = document.createElement('img');
            profilePicture.className = 'profile-picture';
            profilePicture.src = '../eHit/Images/'+username+'.png'; //change to pfp set by the userr
          
            postHead.appendChild(profilePicture);
            postHead.appendChild(postUser);
            postHead.appendChild(postTime);

            var postContent = document.createElement('p');
            postContent.textContent = content;
            var likeButton = document.createElement('button');
            likeButton.className = 'likeBtn';
            likeButton.textContent = 'Like';
            var likeCount = document.createElement('span');
            likeCount.className = 'likeCount'; 
            likeCount.textContent = '0';

            postDiv.appendChild(postHead);
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

async function DisplayFollowing() {
  try {
    const res = await fetch(`/api/v1/posts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      console.error(`Error fetching all following posts: ${res.status} ${res.statusText}`);
      return;
    }

     // Clear the postsContainer before appending new posts
     postsContainer.innerHTML = '';

    const posts = await res.json();

    // Map through posts to generate HTML for each post
    const userPostHTML = posts
      .filter(post => post.postedBy !== username)
      .sort((a, b) => new Date(b.dateTimePosted) - new Date(a.dateTimePosted))
      .map(post => {
      var content = post.content; // Assuming your post object has a 'content' property

      const timestamp = post.dateTimePosted;
      const date = new Date(timestamp);


      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);

      //For Speciific Date with Time
      // const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      // const formattedDate = date.toLocaleString('en-US', options);

      var dateTimePosted = formattedDate;


      var postedBy = post.postedBy;
      var postDiv = document.createElement('div');
            postDiv.className = 'post';

            var postHead = document.createElement('div')
            postHead.className = 'post-head'

            var postUser = document.createElement('span')
            postUser.className = "post-head-user"
            postUser.textContent = postedBy;
            console.log(postUser + "hello");

            var postTime = document.createElement('span')
            postTime.className = "post-head-user"
            postTime.textContent = dateTimePosted;
            
            var profilePicture = document.createElement('img');
            profilePicture.className = 'profile-picture';
            profilePicture.src = '../eHit/Images/'+postedBy+'.png'; //change to pfp set by the userr
          
            postHead.appendChild(profilePicture);
            postHead.appendChild(postUser);
            postHead.appendChild(postTime);

            var postContent = document.createElement('p');
            postContent.textContent = content;
            var likeButton = document.createElement('button');
            likeButton.className = 'likeBtn';
            likeButton.textContent = 'Like';
            var likeCount = document.createElement('span');
            likeCount.className = 'likeCount'; 
            likeCount.textContent = '0';

            postDiv.appendChild(postHead);
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

async function DisplayUserAndFollowing() {
  try {
    const res = await fetch(`/api/v1/posts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      console.error(`Error fetching all following posts: ${res.status} ${res.statusText}`);
      return;
    }

     // Clear the postsContainer before appending new posts
     postsContainer.innerHTML = '';

    const posts = await res.json();

    // Map through posts to generate HTML for each post
    const userPostHTML = posts
      .sort((a, b) => new Date(b.dateTimePosted) - new Date(a.dateTimePosted))
      .map(post => {
      var content = post.content; // Assuming your post object has a 'content' property
      const timestamp = post.dateTimePosted;
      const date = new Date(timestamp);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);

      //For Speciific Date with Time
      // const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      // const formattedDate = date.toLocaleString('en-US', options);

      var dateTimePosted = formattedDate;
      var postedBy = post.postedBy;
      var postDiv = document.createElement('div');
            postDiv.className = 'post';

            var postHead = document.createElement('div')
            postHead.className = 'post-head'

            var postUser = document.createElement('span')
            postUser.className = "post-head-user"
            postUser.textContent = postedBy;
            console.log(postUser + "hello");

            var postTime = document.createElement('span')
            postTime.className = "post-head-user"
            postTime.textContent = dateTimePosted;
            
            var profilePicture = document.createElement('img');
            profilePicture.className = 'profile-picture';
            profilePicture.src = '../eHit/Images/'+postedBy+'.png'; //change to pfp set by the userr
          
            postHead.appendChild(profilePicture);
            postHead.appendChild(postUser);
            postHead.appendChild(postTime);

            var postContent = document.createElement('p');
            postContent.textContent = content;
            var likeButton = document.createElement('button');
            likeButton.className = 'likeBtn';
            likeButton.textContent = 'Like';
            var likeCount = document.createElement('span');
            likeCount.className = 'likeCount'; 
            likeCount.textContent = '0';

            postDiv.appendChild(postHead);
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