export default class UserInfo {
    constructor({nameElement, jobElement, avatarElement}) {
        this._nameElement = document.querySelector(nameElement);
        this._jobElement = document.querySelector(jobElement);
        this._avatarElement = document.querySelector(avatarElement);
    }
    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            description: this._jobElement.textContent,
            // avatar: this._avatarElement.textContent
        }
    }
    setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._jobElement.textContent = data.description;
        // this._avatarElement.textContent = data.src;
    }
}