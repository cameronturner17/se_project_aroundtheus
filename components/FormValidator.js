class FormValidator {
    constructor(config, formEl) {
        this._config = config;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._form = formEl;
    }

    _showInputError(inputEl) {
        const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.add(this._inputErrorClass);
        errorMessageEl.textContent = inputEl.validationMessage;
        errorMessageEl.classList.add(this._errorClass);
    }

    _hideInputError(inputEl) {
        const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(this._inputErrorClass);
        errorMessageEl.textContent = "";
        errorMessageEl.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputEl) {
        if(!inputEl.validity.valid) {
           this._showInputError(inputEl);
        }
          
        this._hideInputError(inputEl);
    }

    _hasInvalidInput() {
        this._inputList.every((inputEl) => inputEl.validity.valid) 
    }
    

    toggleButtonState(inputEls, submitButton, config) {
        if (hasInvalidInput(inputEls)) {
            disableButtton(submitButton, config);
          } else {
            enableButton(submitButton, config);
          }
    }

    _setEventListeners() {
        this._inputEls = [...this.form.querySelectorAll(inputSelector)];
        this._submitButton = this.form.querySelector(options.submitButtonSelector);
        inputEls.forEach(inputEl => {
            inputEl.addEventListener("input", (e) => {
                checkInputValidity(this.form, inputEl, options);
                toggleButtonState(inputEls, submitButton, options)
            });
        });
    }

    enableValidation() {
        this._formEl.addEventListener("submit", (e) => {
            e.preventDefault();
            this.disableButton(this._submitButton,this._config.inactiveButtonClass);
        });

        this._setEventlisteners();
    }
}

export default FormValidator;