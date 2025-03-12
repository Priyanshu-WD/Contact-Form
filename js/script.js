const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const emailInput = document.querySelector("#emailAddress");
const form = document.querySelector("#form");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    const fName = firstName.value.trim();
    const lName = lastName.value.trim();
    const eInput = emailInput.value.trim().toLowerCase();
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    let isValid = true;

    if (fName === "") {
        errorFunc(firstName, "This field is required", "errorFname");
        isValid = false;
    } else {
        successFunc(firstName, "errorFname");
    }

    if (lName === "") {
        errorFunc(lastName, "This field is required", "errorLname");
        isValid = false;
    } else {
        successFunc(lastName, "errorLname");
    }

    if (eInput === "") {
        errorFunc(emailInput, "This field is required", "errorEmail");
        isValid = false;
    } else if (!emailPattern.test(eInput)) {
        errorFunc(emailInput, "Please provide a valid email address", "errorEmail");
        isValid = false;
    } else {
        successFunc(emailInput, "errorEmail");
    }

    if (!validateButton()) isValid = false;
    if (!validateMessage()) isValid = false;
    if (!validateConsent()) isValid = false;

    if (isValid) {
        console.log("Form is valid! Submitting...");
        document.querySelector("#container").classList.remove("hidden");
        form.reset();
        submitButton.disabled = false;

        // Reload after showing success message
        setTimeout(() => {
            location.reload();
        }, 1000); // Adjust delay as needed
    } else {
        document.querySelector("#container").classList.add("hidden");
        submitButton.disabled = false;
    }
});

// Validation functions 
function validateButton() {
    const isChecked = document.querySelector('input[name="queryType"]:checked');
    if (!isChecked) {
        document.querySelector("#radioError").innerText = "Please select a query type";
        return false;
    } else {
        document.querySelector("#radioError").innerText = "";
        return true;
    }
}

function validateMessage() {
    const message = document.querySelector("#message");
    if (message.value.trim() === "") {
        document.querySelector("#messageError").innerText = "The field is required";
        message.style.border = "1px solid hsl(0, 66%, 54%)";
        return false;
    } else {
        document.querySelector("#messageError").innerText = "";
        message.style.border = "";
        return true;
    }
}

function validateConsent() {
    const checkBox = document.querySelector("#checkBox:checked");
    const consentError = document.querySelector("#consentError");
    if (!checkBox) {
        consentError.innerText = "To submit this form, please consent to be contacted";
        return false;
    } else {
        consentError.innerText = "";
        return true;
    }
}

function errorFunc(req, message, errorId) {
    const errorDiv = document.getElementById(errorId);
    errorDiv.innerText = message;
    req.classList.add("error");
    if (req !== emailInput) {
        req.value = "";
    } else {
        req.style.color = "hsl(0, 66%, 54%)";
        req.style.border = "1px solid hsl(0, 66%, 54%)";
        firstName.style.border = "1px solid hsl(0, 66%, 54%)";
        lastName.style.border = "1px solid hsl(0, 66%, 54%)";
    }
}

function successFunc(req, errorId) {
    const errorDiv = document.getElementById(errorId);
    errorDiv.innerText = "";
    req.classList.remove("error");
    req.style.border = "";
    req.style.color = "";
}