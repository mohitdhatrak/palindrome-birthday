var inputDate = document.querySelector("#input-date");
var button = document.querySelector("#button");
var errorText = document.querySelector("#error-message");
var outputText = document.querySelector("#output-text");

function getDiffDateFormats(date) {
    var dateArr = date.split("-");
    var yyyy = dateArr[0];
    var mm = dateArr[1];
    var dd = dateArr[2];

    return [yyyy + mm + dd, mm + dd + yyyy, dd + mm + yyyy];
}

function isPalindrome(date) {
    for (var i = 0; i < date.length / 2; i++) {
        if (date[i] !== date[date.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

function checkDiffDateFormats(date) {
    var diffDateFormats = getDiffDateFormats(date);
    var palindromeFlag = false;

    for (var i = 0; i < diffDateFormats.length; i++) {
        if (isPalindrome(diffDateFormats[i]) === true) {
            palindromeFlag = true;
        }
    }
    return palindromeFlag;
}

function isLeapYear(year) {
    if (year % 400 === 0) return true;
    if (year % 100 === 0) return false;
    if (year % 4 === 0) return true;
    return false;
}

function incrementDate(date) {
    var dateArr = date.split("-");
    var year = dateArr[0];
    var month = Number(dateArr[1]);
    var day = Number(dateArr[2]);

    day++;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month == 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    day = "" + day;
    month = "" + month;
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }

    return year + "-" + month + "-" + day;
}

function decrementDate(date) {
    var dateArr = date.split("-");
    var year = dateArr[0];
    var month = Number(dateArr[1]);
    var day = Number(dateArr[2]);
    day--;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day == 0) {
        month--;

        if (month == 0) {
            month = 12;
            day = 31;
            year--;
        } else if (month == 2) {
            if (isLeapYear(year)) {
                day = 29;
            } else {
                day = 28;
            }
        } else {
            day = daysInMonth[month - 1];
        }
    }

    day = "" + day;
    month = "" + month;
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }

    return year + "-" + month + "-" + day;
}

function getNearestPalindrome(date) {
    var noOfDaysAhead = 0;
    var noOfDaysBehind = 0;
    var nextDate = incrementDate(date);
    var prevDate = decrementDate(date);

    while (true) {
        noOfDaysAhead++;
        noOfDaysBehind++;
        if (checkDiffDateFormats(nextDate)) {
            return [noOfDaysAhead, nextDate];
        }
        if (checkDiffDateFormats(prevDate)) {
            return [noOfDaysBehind, prevDate];
        }
        nextDate = incrementDate(nextDate);
        prevDate = decrementDate(prevDate);
    }
}

function mmddyyyyFormat(date) {
    var dateArr = date.split("-");
    var yyyy = dateArr[0];
    var mm = dateArr[1];
    var dd = dateArr[2];
    return dd + "-" + mm + "-" + yyyy;
}

function clickListner() {
    var birthdate = inputDate.value;

    outputText.innerText = "";
    errorText.innerText = "";
    if (birthdate === "") {
        errorText.innerText = "Please select your birthdate";
    } else {
        if (checkDiffDateFormats(birthdate) === true) {
            outputText.innerText = "Yay, your birthday is a palindrome !";
        } else {
            var arr = getNearestPalindrome(birthdate);
            var noOfDays = arr[0];
            var date = mmddyyyyFormat(arr[1]);
            var dayOrDays = noOfDays === 1 ? " day" : " days";
            outputText.innerText =
                "Your birthday is not a palindrome. The nearest palindrome is " +
                date +
                " you missed it by " +
                noOfDays +
                dayOrDays;
        }
    }
}

button.addEventListener("click", clickListner);
