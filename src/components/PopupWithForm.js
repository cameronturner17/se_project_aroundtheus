import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);

        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._inputList = this._popupForm.querySelectorAll(".modal__input");
        this.setEventListeners();
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

    getForm() {
        return this._popupForm;
    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach((input) => {
          formValues[input.name] = input.value;
        });
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (e) => {
          e.preventDefault();
          this._handleFormSubmit(this._getInputValues());
        });
    }  
}