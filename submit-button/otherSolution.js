//Единственное отличие в этом решении - я попробовала сделать работу чата через событие формы submit, а не просто кастомным кодом для кнопки.

// FORM ELEMENTS
const nameInput = document.querySelector("#name-input");
const linkInput = document.querySelector("#link-input");
const commentInput = document.querySelector("#comment-input");
const commentForm = document.querySelector(".comment-form");

// CHAT ELEMENTS
const chatSection = document.querySelector(".chat");

//FORM EVENT LISTENER
commentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    postUserComment();
})

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
    const userNameNoSpaces = userNameInput.replace(/\s/g, "");
    const userNameCasing = userNameNoSpaces[0].toUpperCase() + userNameNoSpaces.slice(1).toLowerCase();

    // Getting the info from the avatar link input
    const userAvatarInput = linkInput.value;

    // Creating the div container for the user info and adding it in the chat
    const userInfo = document.createElement("div");
    userInfo.setAttribute("class", "d-flex align-items-center");
    chatSection.append(userInfo);

    // Creating a name element and adding it in the chat
    const namePrint = document.createElement("p");
    namePrint.setAttribute("class", "px-4 fw-bold");
    namePrint.textContent = userNameCasing;
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
