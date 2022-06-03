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

    getSavedMovies =()=> {
        return fetch('https://api.diploma.iigorevich.nomoredomains.work/movies', {
            headers: this._headers,
            method: 'GET',
            credentials: 'include',
        }).then(this._checkResponse)
    }


    createMovie({ id, country, director, duration, year, description, image, nameRU, nameEN, trailerLink, thumbnail }) {
        const imageUrl = 'https://api.nomoreparties.co' + image.url;
       
        return fetch('https://api.diploma.iigorevich.nomoredomains.work/movies', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                country: country || 'Не указано',
                director,
                duration,
                year,
                description: description || 'No description',
                nameRU: nameRU || nameEN,
                nameEN: nameEN || nameRU,
                image: imageUrl,
                thumbnail: thumbnail || imageUrl,
                trailerLink,
                movieId: id,
            })
        }).then(this._checkResponse)
    }

    removeMovie = (cardId) => {
        return fetch(`https://api.diploma.iigorevich.nomoredomains.work/movies/${cardId}/`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include',
        }).then(this._checkResponse)
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
    // Method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})