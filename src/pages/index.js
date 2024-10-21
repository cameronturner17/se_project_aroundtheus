import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfor.js";

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
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardsWrap = document.querySelector(".cards__list");
const previewImage = document.querySelector("#modal-image");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalClose = document.querySelector("#preview-modal-close");
const imageTitle = document.querySelector("#preview-title");
const cardSelector = "#card-template";

// Linked classes
const popupWithEditProfileForm = new PopupWithForm(
  {
    popupSelector: "#profile-edit-modal",
  },
  handleProfileEditSubmit,
);

const popupWithAddCardForm = new PopupWithForm(
  {
    popupSelector: "#add-card-modal",
  },
  handleAddCardFormSubmit,
);

const popupWithImage = new PopupWithImage({popupSelector: "#preview-image-modal",});

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
});

popupWithEditProfileForm.setEventListeners();
popupWithAddCardForm.setEventListeners();
popupWithImage.setEventListeners();




/*Function*/

function renderCard(item, method = "addItem") {
    const cardElement = getCardElement(item);
    section.addItem(cardElement);
}

function getCardElement(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}

function handleImageClick(data) {
    popupWithImage.open({ name: data.name, link: data.link });
}

/*Event Handler*/

function handleProfileEditSubmit(inputValue) {
    userInfo.setUserInfo({
        name: inputValue.title,
        description: inputValue.description,
    });
    popupWithEditProfileForm.close();
}

function handleAddCardFormSubmit(inputValue) {
    const cardData = {
        name: inputValue.title,
        link: inputValue.url,
    };
    renderCard(cardData);
    popupWithAddCardForm.close();
    addCardForm.reset();
}

addCardButton.addEventListener("click", () => {
    popupWithAddCardForm.open();
});

profileEditButton.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    profileTitleInput.value = currentUserInfo.name
    profileDescriptionInput.value = currentUserInfo.description
    popupWithEditProfileForm.open();
});


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
