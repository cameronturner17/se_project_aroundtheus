import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/Constants.js";
import { config } from "../utils/Constants.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

/*Elements*/

const profileEditButton = document.querySelector("#profile-edit-button"); 
const addCardButton = document.querySelector("#add-card-button");
const avatarEditButton = document.querySelector("#avatar-edit-button");
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
const avatarEditForm = document.querySelector("#avatar-form");
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

const cardDeleteModal = new PopupWithConfirm(
  {
    popupSelector: "#card-delete-modal",
  },
  handleDeleteCard,
);

const avatarEditModal = new PopupWithForm(
  {
    popupSelector: "#avatar-modal",
  },
  handleAvatarEditSubmit,
);

const section = new Section(
  {
    renderer: renderCard,
  },
  ".cards__list"
);

const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
  avatarElement: ".profile__image"
});

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "348f594a-838b-49c6-bddf-9b8ba61e15cf",
    "Content-Type": "application/json"
  }
});

api.getUserInfo()
  .then(userData => {
    userInfo.setUserInfo(userData);
  })
  .catch(err => console.error(err));

api.getInitialCards()
  .then((cards) => {
      section.renderItems(cards);
  })
  .catch((err) => {
      console.error('Error fetching initial cards:', err);
  });

popupWithEditProfileForm.setEventListeners();
popupWithAddCardForm.setEventListeners();
popupWithImage.setEventListeners();
cardDeleteModal.setEventListeners();
avatarEditModal.setEventListeners();




/*Function*/

function renderCard(item, method = "addItem") {
    const cardElement = getCardElement(item);
    section.addItem(cardElement);
}

function getCardElement(cardData) {
  const card = new Card(cardData, 
    cardSelector, 
    handleImageClick, 
    handleDeleteCard,
    handleCardLike
  );
  return card.getView();
}

function handleImageClick(data) {
    popupWithImage.open({ name: data.name, link: data.link });
}

/*Event Handler*/

function handleProfileEditSubmit(inputValue) {
  api.updateProfile({
    name: inputValue.title,
    description: inputValue.description
  })
  .then(updatedUserData => {
    userInfo.setUserInfo({
      name: updatedUserData.name,
      about: updatedUserData.about,
    });
    popupWithEditProfileForm.close();
  })
  .catch(err => {
    console.error(err);
  });
}

function handleAddCardFormSubmit(inputValue) {
    const cardData = {
        name: inputValue.title,
        link: inputValue.url,
    };
    api.addCard(cardData)
    .then(newCard => {
      renderCard(newCard);
      popupWithAddCardForm.close();
      addCardForm.reset();
    })
    .catch(err => {
      console.error("error adding card:", err);
    });
}

function handleDeleteCard(cardId, cardElement) {
  cardDeleteModal.open();

  cardDeleteModal.setSubmitAction(() => {
    cardDeleteModal.setIsLoading(true);

    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        cardDeleteModal.close();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      })
      .finally(() => {
        cardDeleteModal.setIsLoading(false);
      });
  });
}


function handleAvatarEditSubmit(inputValues) {
  const newAvatarUrl = inputValues.avatar;
  api.updateAvatar(newAvatarUrl)
      .then((response) => {
          console.log("Avatar updated successfully:", response);
          userInfo.setUserInfo({
              name: response.name, 
              description: response.description,
              avatar: response.avatar,
          });
          avatarEditModal.close();
      })
      .catch((err) => {
          console.error("Error updating avatar:", err);
      });
}

function handleCardLike(card) {
  const isLiked = card.isLiked();
  if (isLiked) {
    api.dislikeCard(card._id)
      .then(updatedCard => {
        card.updateLikes(updatedCard.likes);
      })
      .catch(err => console.error(err));
  } else {
    api.likeCard(card._id)
      .then(updatedCard => {
        card.updateLikes(updatedCard.likes);
      })
      .catch(err => console.error(err));
  }
}

addCardButton.addEventListener("click", () => {
    popupWithAddCardForm.open();
});

avatarEditButton.addEventListener("click", () => {
  avatarEditModal.open();
});

profileEditButton.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    profileTitleInput.value = currentUserInfo.name
    profileDescriptionInput.value = currentUserInfo.about
    popupWithEditProfileForm.open();
});

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);
const avatarFormValidator = new FormValidator(config, avatarEditForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();