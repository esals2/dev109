// EC - Live Validation: Add event listeners for all fields
document.getElementById("FirstName").addEventListener("blur", firstName);
document.getElementById("LastName").addEventListener("blur", lastName);
document.getElementById("Email").addEventListener("blur", email);
document.getElementById("Phone").addEventListener("blur", phone);
document.getElementById("Username").addEventListener("blur", username);
document.getElementById("Password").addEventListener("blur", password);
document.getElementById("Address").addEventListener("blur", address);
document.getElementById("City").addEventListener("blur", city);
document.getElementById("State").addEventListener("change", state);
document.getElementById("Country").addEventListener("change", () => {
  country();
  zipCode(); // Also validate Zip when country changes
});
document.getElementById("Zip").addEventListener("blur", zipCode);

// EC - focus on first error: master form validator structure
function isValid(event) {
  let firstInvalid = null;

  const validators = [
    { fn: firstName, id: "FirstName" },
    { fn: lastName, id: "LastName" },
    { fn: email, id: "Email" },
    { fn: phone, id: "Phone" },
    { fn: username, id: "Username" },
    { fn: password, id: "Password" },
    { fn: address, id: "Address" },
    { fn: city, id: "City" },
    { fn: state, id: "State" },
    { fn: country, id: "Country" },
    { fn: zipCode, id: "Zip" }
  ];

  let valid = true;

  for (const v of validators) {
    const isFieldValid = v.fn();
    if (!isFieldValid && !firstInvalid) {
      firstInvalid = document.getElementById(v.id);
    }
    valid &= isFieldValid;
  }

  if (!valid) {
    document.getElementById("submiterror").innerHTML =
      "<p><strong>Error Submitting — See Above</strong></p>";
    if (firstInvalid) firstInvalid.focus();
    event.preventDefault();
    return false;
  }

  return true;
}

// Validate First Name
function firstName() {
  var firstname = document.getElementById("FirstName").value.trim();
  var errorMessages = "";
  var valid = true;

  if (firstname === "" || firstname.length > 20) {
    errorMessages +=
      "<p>The first name is required and cannot be greater than 20 characters</p>";
    valid = false;
  } else if (!firstname.match(/^[a-zA-Z ,.'-]+$/)) {
    errorMessages += "<p>Invalid characters in first name</p>";
    valid = false;
  }

  document.getElementById("fname").innerHTML = errorMessages;
  return valid;
}

// Validate Last Name
function lastName() {
  var lastname = document.getElementById("LastName").value.trim();
  var errorMessages = "";
  var valid = true;

  if (lastname === "" || lastname.length > 20) {
    errorMessages +=
      "<p>The last name is required and cannot be greater than 20 characters</p>";
    valid = false;
  } else if (!lastname.match(/^[a-zA-Z ,.'-]+$/)) {
    errorMessages += "<p>Invalid characters in last name</p>";
    valid = false;
  }

  document.getElementById("lname").innerHTML = errorMessages;
  return valid;
}

// Validate Email
function email() {
  var userEmail = document.getElementById("Email").value.trim();
  var errorMessages = "";
  var valid = true;

  var atpos = userEmail.indexOf("@");
  var dotpos = userEmail.lastIndexOf(".");
  if (
    userEmail === "" ||
    atpos < 1 ||
    dotpos < atpos + 2 ||
    dotpos + 2 >= userEmail.length
  ) {
    errorMessages += "<p>Invalid email address</p>";
    valid = false;
  }

  document.getElementById("emailerror").innerHTML = errorMessages;
  return valid;
}

// Validate Phone
function phone() {
  var phone = document.getElementById("Phone").value.trim();
  var errorMessages = "";
  var valid = true;

  if (!phone.match(/^\d{3}-\d{3}-\d{4}$/)) {
    errorMessages += "<p>Phone must be in format 123-456-7890</p>";
    valid = false;
  }

  document.getElementById("phoneerror").innerHTML = errorMessages;
  return valid;
}

// Validate Username
function username() {
  var user = document.getElementById("Username").value.trim();
  var valid = true;
  var errorMessages = "";

  if (user === "" || user.length > 12) {
    errorMessages += "<p>Username required (max 12 chars)</p>";
    valid = false;
  }

  document.getElementById("usernameerror").innerHTML = errorMessages;
  return valid;
}

// Validate Password
function password() {
  var pass = document.getElementById("Password").value.trim();
  var valid = true;
  var errorMessages = "";

  if (
    pass === "" ||
    pass.length > 7 ||
    !pass.match(/[A-Z]/) ||
    !pass.match(/[a-z]/) ||
    !pass.match(/[0-9]/) ||
    !pass.match(/[^A-Za-z0-9]/)
  ) {
    errorMessages +=
      "<p>Password must be ≤ 7 characters and contain upper, lower, number, and special character</p>";
    valid = false;
  }

  document.getElementById("passworderror").innerHTML = errorMessages;
  return valid;
}

// Validate Address
function address() {
  var val = document.getElementById("Address").value.trim();
  var valid = val !== "";
  document.getElementById("addresserror").innerHTML = valid
    ? ""
    : "<p>Address required</p>";
  return valid;
}

// Validate City
function city() {
  var val = document.getElementById("City").value.trim();
  var valid = val !== "";
  document.getElementById("cityerror").innerHTML = valid
    ? ""
    : "<p>City required</p>";
  return valid;
}

// Validate State
function state() {
  var val = document.getElementById("State").value;
  var valid = val !== "";
  document.getElementById("stateerror").innerHTML = valid
    ? ""
    : "<p>State required</p>";
  return valid;
}

// Validate Country
function country() {
  var val = document.getElementById("Country").value;
  var valid = val !== "";
  document.getElementById("countryerror").innerHTML = valid
    ? ""
    : "<p>Country required</p>";
  return valid;
}

// Validate Zip Code (only if USA)
function zipCode() {
  var country = document.getElementById("Country").value;
  var zip = document.getElementById("Zip").value.trim();
  var errorMessages = "";
  var valid = true;

  if (country === "USA") {
    if (!zip.match(/^\d{5}$/)) {
      errorMessages = "<p>Zip Code required (5 digits only)</p>";
      valid = false;
    }
  }

  document.getElementById("ziperror").innerHTML = errorMessages;
  return valid;
}

document.querySelector("form").addEventListener("submit", isValid);
