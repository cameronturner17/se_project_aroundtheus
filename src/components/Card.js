export default class Card {
    constructor({ _id, name, link }, cardSelector, handleImageClick, handleDeleteCard) {
      this._id = _id;
      this._name = name;
      this._link = link;
      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
      this._handleDeleteCard = handleDeleteCard;
    }
  
    _setEventListeners() {
      this._cardElement
        .querySelector(".card__like-button")
        .addEventListener("click", () => {
          this._handleLikeButton();
        });
      this._cardElement
        .querySelector(".card__delete-button")
        .addEventListener("click", () => {
          this._handleDeleteCard(this._id, this._cardElement);
        });
      this._cardElement
        .querySelector(".card__image")
        .addEventListener("click", () => {
          this._handleImageClick({ name: this._name, link: this._link });
        });
    }
  
    _handleDeleteCard() {
      this._cardElement.remove();
    }
  
    _handleLikeButton() {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_active");
    }

    isLiked() {
      return this.cardData.likes.some(like => like._id === this.userId);
    }

    updateLikes(newLikes) {
      this.cardData.likes = newLikes;
    }
  
  
    getView() {
      this._cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector(".card")
        .cloneNode(true);
      const cardImageEl = this._cardElement.querySelector(".card__image");
      const cardTitleEl = this._cardElement.querySelector(".card__title");
      cardImageEl.src = this._link;
      cardImageEl.alt = this._name;
      cardTitleEl.textContent = this._name;
      this._setEventListeners();
      return this._cardElement;
    }
  }