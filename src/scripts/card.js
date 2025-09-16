import {openImagePopup, cardTemplate} from './index.js'
import { deleteCardAPI, likeCardAPI, deleteLikeCardAPI } from './api.js';

function createCard(card) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const imageButton = cardElement.querySelector('.card__image');
    const likeDigit = cardElement.querySelector('.card__like-digit')

    imageButton.src = card.link;
    imageButton.alt = card.name;
    cardElement.id = card['_id'];
    likeDigit.textContent = card.likes ? card.likes.length : 0;
    cardElement.querySelector('.card__title').textContent = card.name;
    
    imageButton.addEventListener('click', openImagePopup);
    likeButton.addEventListener('click', likeCard);
    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
}

function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
    const card = evt.target.closest('li.card');
    const cardDigit = card.querySelector('.card__like-digit')
    if (evt.target.classList.contains('card__like-button_is-active')) {
        likeCardAPI(card.id)
        .then(data => {
            cardDigit.textContent = data.likes.length
        })
    }
    else {
        deleteLikeCardAPI(card.id)
        .then(data => {
            cardDigit.textContent = data.likes.length
        })
    }
}

function deleteCard(evt) {
    const card = evt.target.closest('li.card');
    deleteCardAPI(card.id);
    card.remove();
}

export {likeCard, deleteCard, createCard};