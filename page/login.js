import { InputCommon } from "../common/inputCommon.js"
import { setScreen } from '../index.js'
import { Register } from '../page/register.js'
import { InputCheckBox } from "../common/inputCheckBox.js"

class Login {
  container = document.createElement("div");
  title = document.createElement("h3");
  form = document.createElement("form");

  inputEmail = new InputCommon(
    "Email: ",
    "email",
    "Enter your email",
    "inputEmail"
  );
  inputPassword = new InputCommon(
    "Password: ",
    "password",
    "Enter your password",
    "inputPassword"
  );

  lableCheckBox = document.createElement("span");
  inputCheckBox = new InputCheckBox("checkbox", "remember", "Remember me");

  actionContainer = document.createElement("div");
  btnLogin = document.createElement("button");
  btnRegister = document.createElement("button");

  constructor() {
    this.title.innerHTML = "Login";
    this.title.classList.add("title");

    this.container.appendChild(this.form);
    this.inputEmail.container.classList.add("text");
    this.inputPassword.container.classList.add("text");
    this.form.classList.add("form");
    this.lableCheckBox.innerHTML = "Remember me";
    this.lableCheckBox.classList.add("tick");

    this.form.appendChild(this.title);
    this.form.appendChild(this.inputEmail.container);
    this.form.appendChild(this.inputPassword.container);
    this.form.appendChild(this.inputCheckBox.container);

    this.btnLogin.innerHTML = "Login";
    this.btnRegister.innerHTML = "Register";
    this.btnLogin.classList.add("button");
    this.btnRegister.classList.add("button");
    this.inputCheckBox.container.appendChild(this.lableCheckBox);
    this.inputCheckBox.container.classList.add("tick");

    this.btnLogin.addEventListener("click", this.handleLogin);
    this.btnRegister.addEventListener("click", this.handleRedirectRegister);

    this.form.appendChild(this.btnLogin);
    this.form.appendChild(this.btnRegister);
  }

  handleRedirectRegister = (e) => {
    e.preventDefault();
    const registerScreen = new Register();
    setScreen(registerScreen.container);
  };

  handleLogin = (e) => {
    e.preventDefault();

    // Validation
    const emailValue = this.inputEmail.getValue();

    if (!emailValue) {
      this.inputEmail.setErrorMessage("Email cannot be empty");
    } else {
      this.inputEmail.setErrorMessage("");
    }

    const passwordValue = this.inputPassword.getValue();

    if (!passwordValue) {
      this.inputPassword.setErrorMessage("Password cannot be empty");
    } else {
      this.inputPassword.setErrorMessage("");
    }

    // Login
    firebase
      .auth()
      .signInWithEmailAndPassword(emailValue, passwordValue)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        console.log("Login is successful");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);
      });
  };
}

export { Login };
