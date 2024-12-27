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
        try {
            const res = await fetch(`${this._baseUrl}/cards`, {
                headers: this._headers,
            });
            if (!res.ok) {
                throw new Error(`Error fetching cards: ${res.status}`);
            }
            return await res.json();
        } catch (err) {
            console.error("Error in getInitialCards:", err);
        }
    }

    async addCard({ name, link }) {
        try {
            const res = await fetch(`${this._baseUrl}/cards`, {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({ name, link }),
            });
            return await res.json();
        } catch (err) {
            return console.log(err);
        }
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
        try {
            const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({ avatar: url }),
            });
            return await res.json();
        } catch (err) {
            return console.log('Error updating avatar:', err);
        }
    }
}