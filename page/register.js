import { InputCommon } from '../common/inputCommon.js'
import { setScreen } from '../index.js'
import { Login } from '../page/login.js'
import { InputCheckBox } from '../common/inputCheckBox.js'

class Register {
    container = document.createElement("div");
    title = document.createElement("h3");

    form = document.createElement("form");
    inputName = new InputCommon("Name: ", "name", "Enter your name", "inputName");
    inputEmail = new InputCommon("Email: ", "email", "Enter your email", "inputEmail");
    inputPassword = new InputCommon("Password: ", "password", "Enter your password", "inputPassword");
    inputConfirmPassword = new InputCommon("Confirm password: ", "password", "Enter your confirm password", "inputConfirmPassword");
     
    lableCheckBox = document.createElement("span");
    inputCheckBox = new InputCheckBox("checkbox", "remember", "Agree");

    actionContainer = document.createElement("div");
    btnLogin = document.createElement("button");
    btnRegister = document.createElement("button");

    constructor() {
        this.title.innerHTML = "Register";
        this.title.classList.add("title");

        this.container.appendChild(this.form);
        this.lableCheckBox.innerHTML = "I agree all statement in terms of service";
        this.lableCheckBox.classList.add("tick");

        this.form.appendChild(this.title);
        this.form.appendChild(this.inputName.container);
        this.form.appendChild(this.inputEmail.container);
        this.form.appendChild(this.inputPassword.container);
        this.form.appendChild(this.inputConfirmPassword.container);

        this.form.classList.add("form");
        this.inputName.container.classList.add("text");
        this.inputEmail.container.classList.add("text");
        this.inputPassword.container.classList.add("text");
        this.inputConfirmPassword.container.classList.add("text");

        this.form.appendChild(this.inputCheckBox.container);
        this.inputCheckBox.container.appendChild(this.lableCheckBox);
        this.inputCheckBox.container.classList.add("tick");

        this.btnLogin.innerHTML = "login";
        this.btnRegister.innerHTML = "Register";
        this.btnLogin.classList.add("button");
        this.btnRegister.classList.add("button");

        this.btnLogin.addEventListener("click", (e) => {
            e.preventDefault();
            const loginScreen = new Login();
            setScreen(loginScreen.container);
        })
        this.btnRegister.addEventListener("click", this.handleRegister)

        this.form.appendChild(this.btnLogin);
        this.form.appendChild(this.btnRegister);
    }

    handleRegister = (e) => {
        e.preventDefault();
            // Get Vallue and Check email password
        const nameValue = this.inputName.getValue();
        const regexName = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g;
        if (!nameValue) {
            this.inputName.setErrorMessage("Name cannot be empty");
        }else if (nameValue === regexName) {
            this.inputName.setErrorMessage("");
        }else {
            this.inputName.setErrorMessage("Wrong name");
        }
        
        const emailValue = this.inputEmail.getValue();
        const regexEmail = /^\w+@[a-zA-Z]{3,}\.com$/i;

        if (!emailValue) {
            this.inputEmail.setErrorMessage("Email cannot be empty");
        } else if(emailValue === regexEmail) {
            this.inputEmail.setErrorMessage("");
        }else {
            this.inputEmail.setErrorMessage("Wrong email, Please re-enter the email");
        }

        const passwordValue = this.inputPassword.getValue();

        if (!passwordValue) {
            this.inputPassword.setErrorMessage("Password cannot be empty");
        }else if (passwordValue.length < 6) {
            this.inputPassword.setErrorMessage("Password must be more than 6 characters")
        }else {
            this.inputPassword.setErrorMessage("");
        }

        const confirmPassword = this.inputConfirmPassword.getValue();

        if (confirmPassword === passwordValue) {
            this.inputConfirmPassword.setErrorMessage("")
        }else {
            this.inputConfirmPassword.setErrorMessage("Wrong password, Please enter the correct password")
        }

            // Register
        firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
              .then((userCredential) => {
                 // Signed in 
                 var user = userCredential.user;
                 // ...
                 console.log(`User ${emailValue} is created`);
              })
              .catch((error) => {
                 var errorCode = error.code;
                 var errorMessage = error.message;
                 // ..
                 console.log(errorMessage);
              });
    }
}

export { Register }