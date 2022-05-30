
// MENU 

const menu = document.querySelector(".toggle-menu-button");
const navigation = document.querySelector(".navigation");
const closeMenu = document.querySelector(".close-button");

menu.addEventListener("click", function openNav() {
    navigation.classList.add('navigation-active');
})

closeMenu.addEventListener("click", function closeNav() {
    navigation.classList.remove('navigation-active');
})


// FORM VALIDATION

const errorSpan1 = document.querySelector(".error-span-1")
const errorSpan2 = document.querySelector(".error-span-2")
const errorSpan3 = document.querySelector(".error-span-3")
const errorSpan4 = document.querySelector(".error-span-4")

const nameInput = document.querySelector("#name");
const mailInput = document.querySelector("#mail");
const subjectInput = document.querySelector("#subject");
const textarea = document.querySelector("#textarea");

const form = document.querySelector("#contactForm");

const formComplete = document.querySelector(".form-complete-span");

form.onsubmit = () => {
    displayMessage();
    form.reset();
    return false
};

// Name input 

nameInput.addEventListener("input", () => {
    formComplete.innerText = ""
    displayError(errorSpan1, nameInput);
})

// Mail input

mailInput.addEventListener("input", () => {
    formComplete.innerText = ""
    displayError(errorSpan2, mailInput);
})

// Subject input

subjectInput.addEventListener("input", () => {
    formComplete.innerText = ""
    displayError(errorSpan3, subjectInput);
})

// Textarea

textarea.addEventListener("input", () => {
    formComplete.innerText = ""
    displayError(errorSpan4, textarea);
})

// VALIDITY FUNCTION

function displayError(span, input) {
    span.innerText = input.validationMessage;
    if (input.validity.valid) {
        input.style.backgroundColor = "#dfffe1";
    }
    else {
        input.style.backgroundColor = "white";
    }
}

console.dir(nameInput)


// Due to the discovery that HTML5 validation can be bypassed by auto-inputs, i had to add the following code:

// --------------------------- ADDITIONAL JS VALIDATION ----------------------------

const button = document.querySelector(".cta-button");

// CALLING FUNCTION ON "Keyup"

nameInput.addEventListener("keyup", checkIfButtonIsDisabled)
mailInput.addEventListener("keyup", checkIfButtonIsDisabled)
subjectInput.addEventListener("keyup", checkIfButtonIsDisabled)
textarea.addEventListener("keyup", checkIfButtonIsDisabled)


// CHECK BUTTON FUNCTION

function checkIfButtonIsDisabled() {

    if (checkLength(nameInput.value, 5, nameInput) && checkLength(subjectInput.value, 15, subjectInput) && checkLength(textarea.value, 25, textarea) && validateEmail(mailInput.value)) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

// CHECK LENGTH FUNCTION

function checkLength(value, len, input) {
    if (value.trim().length >= len) {
        input.style.backgroundColor = "#dfffe1";
        return true;
    }
    else {
        input.style.backgroundColor = "white";
        return false;
    }
}

// EMAIL REGEX VALIDATION

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

// DISPLAY SUBMISSION MESSAGE 

function displayMessage() {
    formComplete.innerText = "Submitted!"
}