async function handleLikeButtonClick(postId, likeButton, likeCount) {
    const action = likeButton.textContent === 'Like' ? 'like' : 'unlike';
  
    try {
        const res = await fetch(`/api/v1/posts/${postId}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: action
            })
        });
  
        if (!res.ok) {
            console.error(`Error: ${res.status} ${res.statusText}`);
            return;
        }
  
        
        const responseText = await res.text();
  
        // checks if the response text contains "Post liked" or "Post unliked" (referencing TwitterCloneAPI)
        if (responseText.includes("Post liked") || responseText.includes("Post unliked")) { 
            if (likeCount) {
                const currentLikes = parseInt(likeCount.textContent);
                //if action is like, likeCount + 1, else - 1
                likeCount.textContent = action === 'like' ? currentLikes + 1 : currentLikes - 1;
            } else {
                console.error('Something wrong with likecountn');
            }
            //changes the text of likeButton
            likeButton.textContent = action === 'like' ? 'Unlike' : 'Like';
        } else {
            console.error(`Unexpected response: ${responseText}`);
        }
  
    } catch (error) {
        console.error(`Error:`, error);
    }
  }
