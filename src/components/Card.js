export default class Card {
    constructor({ _id, name, link, isLiked }, cardSelector, handleImageClick, handleDeleteCard, handleCardLike) {
      this._id = _id;
      this._name = name;
      this._link = link;
      this._isLiked = isLiked;
      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
      this._handleDeleteCard = handleDeleteCard;
      this._handleCardLike = handleCardLike;
    }
  
    _setEventListeners() {
      this._cardElement
        .querySelector(".card__like-button")
        .addEventListener("click", () => {
          this._handleCardLike(this);
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
      return this._isLiked;
    }

    updateLikes(newValue) {
      this._isLiked = newValue;
      this._handleLikeButton()
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
      if (this._isLiked) {
        this._handleLikeButton();
      }
      this._setEventListeners();
      return this._cardElement;
    }
  }