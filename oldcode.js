var inputDate = document.querySelector("#input-date");
var button = document.querySelector("#button");
var errorText = document.querySelector("#error-message");
var outputText = document.querySelector("#output-text");

function fixedDateFormat(date) {
    var newFixedDate =
        date[0] +
        date[1] +
        date[2] +
        date[3] +
        date[6] +
        date[7] +
        date[4] +
        date[5];
    return newFixedDate;
}

function clickListner() {
    var birthdate = inputDate.value;

    var updatedBirthdate = "";
    outputText.innerText = "";
    errorText.innerText = "";

    if (birthdate === "") {
        errorText.innerText = "Please select your birthdate";
    } else {
        for (var i = 0; i < birthdate.length; i++) {
            if (birthdate[i] !== "-")
                updatedBirthdate = updatedBirthdate + birthdate[i];
        }

        updatedBirthdate = fixedDateFormat(updatedBirthdate);

        var isPalindrome = true;

        for (var i = 0; i < updatedBirthdate.length / 2; i++) {
            if (
                updatedBirthdate[i] !==
                updatedBirthdate[updatedBirthdate.length - 1 - i]
            ) {
                isPalindrome = false;
                outputText.innerText =
                    "Sorry, your birthday is not a palindrome";
                break;
            }
        }

        if (isPalindrome === true) {
            outputText.innerText = "Yay, your birthday is a palindrome !";
        }
    }
}

button.addEventListener("click", clickListner);
