// @todo: Темплейт карточки
import initialCards from "./cards.js";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(card) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode('true');

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;

    return cardElement;
}
const placesList = document.querySelector('.places__list');

initialCards.forEach(elem => {
    const card = createCard(elem);
    placesList.appendChild(card);
});

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
