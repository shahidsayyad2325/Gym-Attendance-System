function validateLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var errorMessage = document.getElementById("error-message");

    // Perform simple validation (you should implement proper authentication logic)
    if (username === "user" && password === "password") {
        errorMessage.innerHTML = "Login successful!";
        errorMessage.style.color = "green";
    } else {
        errorMessage.innerHTML = "Invalid username or password.";
        errorMessage.style.color = "red";
    }
}
