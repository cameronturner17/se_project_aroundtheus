import FormValidator from "../components/FormValidator.js";

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
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardsWrap = document.querySelector(".cards__list");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalClose = document.querySelector("#preview-modal-close");
// const editFormEl = profileEditForm.querySelector(".modal__form");
// const addFormEl = addCardForm.querySelector(".modal__form");
const cardSelector = ("#card-template");

/*Function*/

function closePopupEsc(e) {
    if (e.key === "Escape") {
      const modalOpened = document.querySelector(".modal_opened");
      closePopup(modalOpened);
    }
}

function closePopupOverlay(e) {
    if (e.target === e.currentTarget) {
      closePopup(e.currentTarget);
    }
}

function closePopup(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", closePopupEsc);
    modal.removeEventListener("mousedown", closePopupOverlay);
}

function openPopup(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", closePopupEsc);
    modal.addEventListener("mousedown", closePopupOverlay);
}

function renderCard(cardData, wrapper) {
    const cardElement = getCardElement(cardData);
    wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    const previewImage = document.querySelector(".modal__image");
    const imageTitle = document.querySelector(".modal__title");

    cardDeleteButton.addEventListener("click", () => {
        cardElement.remove();
      });

      cardImageEl.addEventListener("click", () => {
        previewImage.src = cardData.link;
        previewImage.alt = cardData.name;
        imageTitle.textContent = cardData.name;
        openPopup(previewImageModal);
      });

    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("card__like-button_active");
    });
    
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
    closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
    e.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard({name, link}, cardsWrap);
    closePopup(addCardModal);
    e.target.reset();
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
previewImageModalClose.addEventListener("click", () => closePopup(previewImageModal));
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

const config = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"   
};

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
