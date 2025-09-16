
const editButton = document.querySelector('.profile__edit-button');
const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const cardForm = document.forms['new-place'];
const placeNameInput = cardForm.elements['place-name'];
const imageInput = cardForm.elements.link;
const imagePopup = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');
const closeButtonList = document.querySelectorAll('.popup__close');
const editForm = document.forms['edit-profile'];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const cardButton = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#card-template').content;
const popupList = document.querySelectorAll('.popup__form');
const profileAvatar = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_new-avatar');
const avatarForm = document.forms['avatar'];
const avatarUrlInput = avatarForm.elements.link;
const avatarOverlay = document.querySelector('.profile__image-overlay');
const avatarEditIcon = document.querySelector('.profile__edit-icon');
const cardSaveButton = cardForm.elements['submit'];
const avatarSaveButton = cardForm.elements['submit'];
const profileSaveButton = cardForm.elements['submit'];

import '../pages/index.css';
import {createCard} from "./card.js"
import {closeModal, openModal} from "./modal.js";
import {enableValidation } from "./validate.js";
import { createCardAPI, getCardsAPI, getUserInfoAPI,setUserInfoAPI, editAvatarAPI} from './api.js';

getUserInfoAPI()
.then(data => {
    console.log(data);
    profileJob.textContent = data.about;
    profileTitle.textContent = data.name; 
    profileAvatar.src = data.avatar;
})
.catch(error => console.log(error))

imagePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
profilePopup.classList.add('popup_is-animated');

getCardsAPI().then(cards => {
    cards.forEach(elem => {
        const card = createCard(elem);
        elem.likes.forEach(like => {
            if (like.name == profileTitle.textContent) {
                card.querySelector('.card__like-button').classList.add('card__like-button_is-active');
            }
        })
        placesList.appendChild(card);
    })
})
.catch((error) => console.log(error));

function openImagePopup(evt) {
    const cardElement = evt.target.closest('.places__item'); 
    const title = cardElement.querySelector('.card__title').textContent;

    image.src = evt.target.src;
    caption.textContent = title;
    openModal(imagePopup);
}

function openEditForm() {
    openModal(profilePopup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    profileSaveButton.textContent = 'Сохранение...'
    setUserInfoAPI(nameInput.value, jobInput.value)
    .then(() => {
        
        profileJob.textContent = jobInput.value;
        profileTitle.textContent = nameInput.value;
    })
    .catch((error) => console.log(error))
    .finally(() => {
        profileSaveButton.textContent = 'Сохранить'
        closeModal(profilePopup);
    })
    
}

function openCardForm (){
    openModal(cardPopup);

    placeNameInput.value = '';
    imageInput.value = '';

}

function handleCardFormSubmit(evt) {
    evt.preventDefault(); 
    cardSaveButton.textContent = 'Создание...'
    createCardAPI(placeNameInput.value, imageInput.value)
    .then(data => {
        
        const card = createCard(data);
        placesList.prepend(card);
        
    })
    .catch((error) => console.log(error))
    .finally(() => {
        cardSaveButton.textContent = 'Создать'
        closeModal(cardPopup);
    })
}

function openAvatarForm() {
    openModal(avatarPopup);
    avatarUrlInput.value = profileAvatar.src;
}

function handleEditAvatar(evt) {
    evt.preventDefault();
    avatarSaveButton.textContent = 'Сохранение...'
    editAvatarAPI(avatarUrlInput.value)
    .then(() => {
        
        profileAvatar.src = avatarUrlInput.value;
    })
    .catch((error) => console.log(error))
    .finally(() => {
        avatarSaveButton.textContent = 'Сохранить'
        closeModal(avatarPopup);
    });
}

avatarForm.addEventListener('submit', handleEditAvatar); 

avatarOverlay.addEventListener('click', openAvatarForm)
avatarEditIcon.addEventListener('click', openAvatarForm)

editForm.addEventListener('submit', handleProfileFormSubmit); 
editButton.addEventListener('click', openEditForm);

cardButton.addEventListener('click', openCardForm);
cardForm.addEventListener('submit', handleCardFormSubmit);

closeButtonList.forEach(button => button.addEventListener('click', () => closeModal(document.querySelector('.popup_is-opened'))))

document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('mousedown', evt => {
        if (evt.target === popup) {  
            closeModal(popup);
        }
    });
});

document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
});

enableValidation(popupList);

export {openImagePopup, cardTemplate, popupList};