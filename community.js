// Retrieve posts from localStorage or start fresh
let posts = JSON.parse(localStorage.getItem("communityPosts")) || [];

const postBtn = document.getElementById("postBtn");
const postText = document.getElementById("postText");
const postsContainer = document.getElementById("postsContainer");

// Function to render all posts
function renderPosts() {
  postsContainer.innerHTML = "";
  posts.forEach((post, index) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    postDiv.innerHTML = `
      <div class="post-content">${post.text}</div>
      <div class="post-actions">
        <div class="action like">👍 <span>${post.likes}</span></div>
        <div class="action comment">💬 <span>${post.comments.length}</span></div>
      </div>
      <div class="comment-box">
        <input type="text" placeholder="Write a comment..." />
        <button class="addCommentBtn">Add</button>
      </div>
      <div class="comments">
        ${post.comments.map(c => `<div class="comment">💭 ${c}</div>`).join("")}
      </div>
    `;

    // Like button logic
    postDiv.querySelector(".like").addEventListener("click", () => {
      post.likes++;
      savePosts();
      renderPosts();
    });

    // Comment button toggle
    postDiv.querySelector(".comment").addEventListener("click", () => {
      const commentBox = postDiv.querySelector(".comment-box");
      commentBox.style.display =
        commentBox.style.display === "block" ? "none" : "block";
    });

    // Add comment logic
    postDiv.querySelector(".addCommentBtn").addEventListener("click", () => {
      const commentInput = postDiv.querySelector(".comment-box input");
      const comment = commentInput.value.trim();
      if (comment) {
        post.comments.push(comment);
        commentInput.value = "";
        savePosts();
        renderPosts();
      }
    });

    postsContainer.appendChild(postDiv);
  });
}

// Save posts to localStorage
function savePosts() {
  localStorage.setItem("communityPosts", JSON.stringify(posts));
}

// Add a new post
postBtn.addEventListener("click", () => {
  const text = postText.value.trim();
  if (text) {
    posts.unshift({ text, likes: 0, comments: [] });
    postText.value = "";
    savePosts();
    renderPosts();
  }
});

// Initial render
renderPosts();
