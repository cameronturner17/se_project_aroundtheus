export default class Popup {
    constructor({popupSelector}) {
      this._popupSelector = popupSelector;
      this._popupElement = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add("modal_opened");
        document.addEventListener("click", this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove("modal_opened");
        document.removeEventListener("click", this._handleEscClose);
    }

    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
          }
    }

    setEventListeners() {
        this._popupElement.addEventListener("click", (e) => {
            if (
              e.target.classList.contains("modal__opened") ||
              e.target.classList.contains("modal__close")
            ) {
              this.close();
            }
          });
      
          document.addEventListener("keydown", (e) =>
            this._handleEscClose(e)
        );
    }
}
