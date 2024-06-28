function redirectToRegister() {
  window.location.href = "http://127.0.0.1:5500/./registration/register.html";
}

function redirectToLogin() {
  window.location.href = "http://127.0.0.1:5500/index.html";
}

signupButton.onclick = (e) => {
  const loginData = {
    username: username.value,
    password: password.value,
    fullName: fullName.value,
  };

  const options = {
    method: "POST",
    headers: {
      // This header specifies the type of content we're sending.
      // This is required for endpoints expecting us to send
      // JSON data.
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  };

  return fetch(apiBaseURL + "/api/users", options)
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
      window.location.assign("../index.html"); // redirect

      return loginData;
    });
};
