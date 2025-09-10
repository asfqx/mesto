import {openImagePopup, cardTemplate} from './index.js'

function createCard(card) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const imageButton = cardElement.querySelector('.card__image');

    imageButton.src = card.link;
    imageButton.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    
    imageButton.addEventListener('click', openImagePopup);
    likeButton.addEventListener('click', likeCard);
    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
}

function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

function deleteCard(evt) {
    const card = evt.target.closest('li.card');
    card.remove();
}

export {likeCard, deleteCard, createCard};