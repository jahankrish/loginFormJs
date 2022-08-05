//let isPasswordValid = false;
function printMessage(Id, value, isError) {
  const element = document.getElementById(Id);
  element.innerHTML = value;

  //Add class to this element based on validation
  if (isError) {
    element.classList.remove("success");
    element.classList.add("error");
  } else {
    element.classList.remove("error");
    element.classList.add("success");
  }
}

// form validation
function validate() {
  let isNameValid = false;
  let isPasswordValid = false;

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  var regex = /^[a-zA-Z]+$/;
  var regexPassword = /(?=.*[A-Z]+ ?=.*[a-z]+ ?=.*[0-9]+ ?=.*[~`!@#$%^&*₹])/;

  // "username condition Apply"
  if (username.trim() == "") {
    printMessage("userMessage", "*Please enter a name*", true);
  } else if (username.length > 10) {
    printMessage("userMessage", "*Name maximum 10 character*", true);
  } else if (username.length < 3) {
    printMessage("userMessage", "*Name minimum 3 character*", true);
  } else if (regex.test(username) === false) {
    printMessage("userMessage", "*Please Enter a valid name*", true);
  } else {
    printMessage("userMessage", "*success*", false);
    isNameValid = true;
  }

  // "password condition Apply"
  if (password.trim() == "") {
    printMessage("passwordMessage", "*Please enter a  password*", true);
  } else if (password.length < 8) {
    printMessage("passwordMessage", "password must be 8 character", true);
  } else if (regexPassword.test(password) === true) {
    printMessage(
      "passwordMessage",
      "*Password must incluid one upercase, one lower case, one special charter, one number*",
      true
    );
  } else {
    printMessage("passwordMessage", "success", false);
    isPasswordValid = true;
  }

  if (isNameValid == true && isPasswordValid == true) {
    authenticate(username, password);
  }
}

// jquery ajax used get method
function authenticate(username, password) {
  $.getJSON("loginDetails.json", function (data) {
    let isValid = false;

    for (let i = 0; i < data.details.length; i++) {
      const detail = data.details[i];

      if (detail.username == username && detail.password == password) {
        isValid = true;
        break;
       
      }
      //console.log(data.details[i]);
    }

    if (isValid) {
      alert("Login SuccessFull");
    } else {
      alert("Invalid Credentials");
    }
  });
}
