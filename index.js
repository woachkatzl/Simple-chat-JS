// FORM ELEMENTS
const nameInput = document.querySelector("#name-input");
const linkInput = document.querySelector("#link-input");
const commentInput = document.querySelector("#comment-input");
const submitButton = document.querySelector(".btn");

// CHAT ELEMENTS
const chatSection = document.querySelector(".chat");

// BUTTON ELEMENT
submitButton.addEventListener("click", postUserComment);

//FUNCTIONS

//FUNCTION TO POST THE USR COMMENT IN THE CHAT
function postUserComment() {
    // Adding the user info and comment
    addUserInfo();
    addUserComment();

    // Adding a divider line and clearing the input fields
    const divider = document.createElement("hr");
    chatSection.append(divider);

    // Clearing the input fields
    clearInputFields();
}

//FUNCTION TO ADD USER NAME AND AVATAR TO THE DISLAYED MESSAGE
function addUserInfo() {
    // Getting the info from user name input and adjusting it
    const userNameInput = nameInput.value;
    const userName = fixName(userNameInput);

    // Getting the info from the avatar link input
    const userAvatarInput = linkInput.value;

    // Creating the div container for the user info and adding it in the chat
    const userInfo = document.createElement("div");
    userInfo.setAttribute("class", "d-flex align-items-center");
    chatSection.append(userInfo);

    // Creating a name element and adding it in the chat
    const namePrint = document.createElement("p");
    namePrint.setAttribute("class", "px-4 fw-bold");
    namePrint.textContent = userName;
    userInfo.append(namePrint);

    // Creating a user avatar element and adding it in the chat
    const userAvatar = document.createElement("img");
    userAvatar.setAttribute("width", "120px");
    userAvatar.setAttribute("src", userAvatarInput);
    userAvatar.setAttribute("alt", "Ваш аватар");
    userInfo.prepend(userAvatar);
}

//FUNCTION TO ADD USER COMMENT TO THE DISPLAYED MESSAGE
function addUserComment() {
    // Getting the info from the user comment input
    const userCommentInput = commentInput.value;

    //Checking the comment for spam
    const commentNoSpam = checkSpam(userCommentInput);

    // Creating a user comment element and adding it in the chat
    const userComment = document.createElement("p");
    userComment.setAttribute("class", "py-4");
    userComment.textContent = commentNoSpam;
    chatSection.append(userComment);
}

//FUNCTION TO ADJUST THE USER NAME ACCORDING TO STANDARDS
function fixName(name) {
    // Removing extra whitespace symbols
    const nameNoSpaces = name.replace(/\s+/g, " ").trim();

    // Getting an array with all the names
    const nameSplit = nameNoSpaces.split(" ");

    // Making each name in the array start with a upper-caes letter
    nameSplit.forEach(function (item, index, arr) {
        arr[index] = item[0].toUpperCase() + item.slice(1).toLowerCase();
    });

    // Retrieving names from the array into a string
    let nameCasing = "";
    for (let i = 0; i < nameSplit.length; i++) {
        nameCasing = nameCasing + nameSplit[i] + " ";
    }

    // Checking if there is a dash in the name and making sure that the second names after the dash start with an upper cases letter
    if (nameCasing.includes("-") === true) {
        // Ищу все дефисы в вводных данных
        const dashPosition = nameCasing.match(/-/g);

        // Нахожу индекс первой буквы после первого дефиса
        let secondNameStart = nameCasing.indexOf("-") + 1;

        // Делаю эту букву заглавной
        let nameWithDash = nameCasing.slice(0, secondNameStart) + nameCasing[secondNameStart].toUpperCase() + nameCasing.slice(secondNameStart + 1);

        // Смотрю, есть ли в строке больше одного дефиса
        if (dashPosition.length === 1) {
            // Если нет, то строка с именем готова
            return nameWithDash.trim();
        }
        else {

            // Если есть, то для каждого следующего дефиса, делаем букву после него заглавной
            for (i = 1; i < dashPosition.length; i++) {
                secondNameStart = nameCasing.indexOf("-", secondNameStart) + 1;
                nameWithDash = nameWithDash.slice(0, secondNameStart) + nameWithDash[secondNameStart].toUpperCase() + nameWithDash.slice(secondNameStart + 1);
            }

            return nameWithDash.trim();
        }
    } else {
        return nameCasing.trim();
    }
}

//FUNCTION TO CLEAR INPUT FIELDS AFTER THE COMMENT IS SUBMITTED
function clearInputFields() {
    nameInput.value = "";
    linkInput.value = "";
    commentInput.value = "";
}

//FUNCTION THAT REPLACES "viagra" OR "XXX" WITH "***"
function checkSpam(str) {
    const checkViagra = str.replace(/viagra/gi, "***");
    const checkXxx = checkViagra.replace(/xxx/gi, "***");
    return checkXxx;
}