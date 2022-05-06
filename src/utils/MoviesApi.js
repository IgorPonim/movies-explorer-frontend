class Api {
    constructor({ address, headers }) {
        this._address = address
        this._headers = headers

    }


    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        else return Promise.reject(`Ошибка ${res.status}`);
    }



    getInitialMovies() {
        return fetch(this._address, {
            headers: this._headers,
            credentials: this._credentials
        }).then(this._checkResponse)
    }
}


export const moviesApi = new Api({
    address: "https://api.nomoreparties.co/beatfilm-movies",
    credentials: 'include',
    Method: 'GET',
    headers: {
       
        'Content-Type': 'application/json',
    },
})