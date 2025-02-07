export default class Api {
    constructor(options){
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers
        })
        .then(this._checkResponse);
    }
    
    _checkResponse(res) {
        if(!res.ok){
            Promise.reject(`Error ${res.status}`)
        }
        return res.json();
    }

    async getInitialCards() {
        const res = await fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        });
        return this._checkResponse(res);
    }

    addCard({ name, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ name, link }),
        }).then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
          }).then(this._checkResponse);
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    dislikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    updateProfile({ name, description }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name, about: description }),
        }).then(this._checkResponse);
    }

    async updateAvatar(url) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar: url }),
        }).then(this._checkResponse);
    }
}