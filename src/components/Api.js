export default class Api {
    constructor(options){
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
              authorization: "348f594a-838b-49c6-bddf-9b8ba61e15cf"
            }
          })
            .then(res => res.json())
            .then((result) => {
              console.log(result);
            });
    }

    addCard({ name, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ name, link }),
        })
        .then(res => res.json())
        .catch(err => console.log(err));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        });
    }

    dislikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    updateProfile({ name, description }) {
        return fetch(`${this._baseUrl}/user/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name, description }),
        });
    }

    updateAvatar(url) {
        return fetch(`${this._baseUrl}/user/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar: url }),
        })
        .then(res => res.json())
        .catch(err => console.log('Error updating avatar:', err));
    }
}