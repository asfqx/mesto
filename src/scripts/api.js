const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
        authorization: '12a9a912-9a09-4af7-9613-2eb6af32d0ca',
        'Content-Type': 'application/json'
    }
}

export const createCardAPI = (name, link ) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('Request to create card is not ok')
    })
}

export const getCardsAPI = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: {
        authorization: config.headers.authorization
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('Request to get card is not ok')
    })
}

export const getUserInfoAPI = () => {
    return fetch(`${config.baseUrl}/users/me`,{
        headers: {
            authorization: config.headers.authorization,
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject('Request to get start user info is not ok')
    })

}

export const setUserInfoAPI = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
}

export const deleteCardAPI = cardId => {
    fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json(); 
        }
        return Promise.reject('Request to delete card is not ok');
    })
} 

export const likeCardAPI = cardId => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json(); 
        }
        return Promise.reject('Request to like card is not ok');
    })
} 

export const deleteLikeCardAPI = cardId => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json(); 
        }
        return Promise.reject('Request to delete like from card is not ok');
    })
} 

export const editAvatarAPI = avatarUrl => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json;
        }
        return Promise.reject('Request to edit avatar is not ok')
    })
}