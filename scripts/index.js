const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
        name: "Lago di Braise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },

]

console.log(initialCards);

/*Elements*/

const profileEditButton = document.querySelector("#profile-edit-button"); 
const addCardButton = document.querySelector("#add-card-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileModalCloseButton = profileEditModal.querySelector("#modal-close-button");
const addCardModalCloseButton = addCardModal.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDesciption = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

/*Function*/

function closePopup(modal) {
    modal.classList.remove("modal_opened");
}

function openPopup(modal) {
    modal.classList.add("modal_opened");
}

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");
    
    cardTitleEl.textContent = cardData.name;
    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    return cardElement;
}

/*Event Handler*/``

function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDesciption.textContent = profileDescriptionInput.value;
    closePopup();
}

/*Event Listeners*/

profileEditButton.addEventListener('click', () => { 
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDesciption.textContent;
    openPopup(profileEditModal)
});
addCardButton.addEventListener("click", () => openPopup(addCardModal));
profileModalCloseButton.addEventListener("click", () => closePopup(profileEditModal));
addCardModalCloseButton.addEventListener("click", () => closePopup(addCardModal))
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
initialCards.forEach((cardData) => {

    const cardElement = getCardElement(cardData);
    cardListEl.append(cardElement);
});