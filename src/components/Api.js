export default class Api {
    constructor(options){
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    async getInitialCards() {
        const res = await fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: "348f594a-838b-49c6-bddf-9b8ba61e15cf"
            }
        });
        const result_1 = await res.json();
        console.log(result_1);
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
        });
    }

    dislikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    updateProfile({ name, description }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name, description }),
        });
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