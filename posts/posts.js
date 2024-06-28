/* Posts Page JavaScript */
// ${d.toDateString()} ${d.toTimeString()}

"use strict";

const loginData = getLoginData()

function getLoginData () {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}



function getMessage(message) {
    const d = new Date(message.createdAt)
    return `
    
     <div class="post">
          <div class="user--details">
            <img
              class="profile--picture"
              src="../assets/default-avatar-icon-of-social-media-user-vector.jpg"
              alt=""
            />
            <div class="name--date">
              <h5 class="user--name">${message.username}</h5>
              <span class="date"> ${d.toDateString()} </span>
            </div>
          </div>
          <p class="user--message">
          ${message.text}
          </p>
          <span class="like--count">${message.likes.length} likes</span>
          <div class="interaction--container">
            <button>
              <img
                class="post--icon"
                src="../assets/favorite_24dp_FILL0_wght200_GRAD0_opsz24.png"
                alt=""
              />
            </button>
            <button>
              <img
                class="post--icon"
                src="../assets/chat_bubble_24dp_FILL0_wght200_GRAD0_opsz24.png"
                alt=""
              />
            </button>
            <button class="flip">
              <img
                class="post--icon"
                src="../assets/reply_24dp_FILL0_wght300_GRAD0_opsz24.png"
                alt=""
              />
            </button>
          </div>
        </div>
    
    `
}



function showMessages(data) {
    messages.innerHTML = data.map(getMessage).join("")
}



postButton.onclick = (e) => {
  const data = {
    text: postInput.value,
  };

  const options = {
    method: "POST",
    headers: {
      // This header specifies the type of content we're sending.
      // This is required for endpoints expecting us to send
      // JSON data.
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginData.token}`
    },
    body: JSON.stringify(data),
  };

  return fetch(apiBaseURL + "/api/posts", options)
    .then((response) => response.json())
    .then((loginData) => {
      if (loginData.message === "Invalid username or password") {
        console.error(loginData);
        // Here is where you might want to add an error notification
        // or other visible indicator to the page so that the user is
        // informed that they have entered the wrong login info.
        return null;
      }

      window.localStorage.setItem("login-data", JSON.stringify(loginData));
      location.reload()

      return loginData;
    });
} 


function showPosts() {
    
    fetch(apiBaseURL + "/api/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${loginData.token}`}
    }).then(response => {
        if(response.statusCode >= 400) {
            console.log(response)
            
        }
        return response.json()
    }).then(showMessages)
    
}
showPosts()

