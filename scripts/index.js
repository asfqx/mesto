import initialCards from "./cards.js";

const cardTemplate = document.querySelector('#card-template').content;
const editButton = document.querySelector('.profile__edit-button');
const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const cardForm = document.forms['new-place'];
const placeNameInput = cardForm.elements['place-name'];
const imageInput = cardForm.elements.link;
const imagePopup = document.querySelector('.popup_type_image');
const closeButtonList = document.querySelectorAll('.popup__close');
const editForm = document.forms['edit-profile'];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const cardButton = document.querySelector('.profile__add-button');


function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

function deleteCard(evt) {
    const card = evt.target.closest('li.card');
    card.remove();
}

function createCard(card) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    
    likeButton.addEventListener('click', likeCard);
    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
}

initialCards.forEach(elem => {
    const card = createCard(elem);
    placesList.appendChild(card);
});

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

function openEditForm() {
    openModal(profilePopup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    profileJob.textContent = jobInput.value;
    profileTitle.textContent = nameInput.value;

    closeModal(profilePopup);
}

function openCardForm (){
    openModal(cardPopup);

    placeNameInput.value = '';
    imageInput.value = '';

}

function handleCardFormSubmit(evt) {
    evt.preventDefault(); 

    const newCard = {
        name: placeNameInput.value,
        link: imageInput.value
    }

    const card = createCard(newCard);
    placesList.prepend(card);

    closeModal(cardPopup);
}


editForm.addEventListener('submit', handleProfileFormSubmit); 
editButton.addEventListener('click', openEditForm);

cardButton.addEventListener('click', openCardForm);
cardForm.addEventListener('submit', handleCardFormSubmit);

closeButtonList.forEach(button => button.addEventListener('click', () => closeModal(document.querySelector('.popup_is-opened'))))