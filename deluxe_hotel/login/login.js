let store = localStorage;

const form = document.getElementById("loginForm");

const button = document.getElementById("loginButton");

function login () {
    let user = store.getItem("user");
    if (!user) {
        window.alert("No records found");
        return
    } else {
        user = JSON.parse(user);
        console.log(user, " the parse user")
        console.log(email, password, " email and password")
        if (user.email.toLowerCase() === form.email.value.toLowerCase() && user.password === form.password.value) {
            window.location.href = "../dashboard/dashboard.html";
        }
        window.alert("Invalid credential");
    }
}

button.addEventListener("click", () => {
    login();
})
