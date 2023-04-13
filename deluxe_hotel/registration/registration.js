let store = localStorage;

const form = document.getElementById("registrationForm");
const firstName = form.firstName.value,
lastName = form.lastName.value,
email = form.email.value,
password = form.password.value;

const button = document.getElementById("regButton");

function register () {
    // store.removeItem("user");
    const userObj = { 
        firstName: form.firstName.value, 
        lastName: form.lastName.value, 
        email: form.email.value, 
        password: form.password.value 
    };
    if (userObj.firstName === "" || userObj.lastName === "" || userObj.email === "" || userObj.password === "") {
        window.alert("All input fields are required");
        return;
       
    } else {
       store.setItem("user", JSON.stringify(userObj));
       window.location.href = "../login/loginform.html";
    }
    
}

button.addEventListener("click", () => {
    register();
})