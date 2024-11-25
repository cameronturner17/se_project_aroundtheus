import Popup from "./Popup.js";


export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popupElement.querySelector(".modal__form");
        this._submitButton = this._form.querySelector(".modal__button");
        this._defaultButtonText = this._submitButton.textContent;
    }
}