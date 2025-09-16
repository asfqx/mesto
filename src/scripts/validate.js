function showInputError(popupElement, inputElement, errorMessage) {
    const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.classList.add('popup__input-error_active');
    errorElement.textContent = errorMessage;
}

function hideInputError(popupElement, inputElement) {
    const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
}

function checkInputValidity(popupElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(popupElement, inputElement, inputElement.validationMessage);
    }
    else {
        hideInputError(popupElement, inputElement);
    }
}

function setValidationListeners(popupElement) {
    const inputElementList = Array.from(popupElement.querySelectorAll('.popup__input'));
    const buttonElement = popupElement.querySelector('.popup__button');
    toggleButtonState(buttonElement, inputElementList);
    inputElementList.forEach(inputElement =>{
        inputElement.addEventListener('input', () => {
            checkInputValidity(popupElement, inputElement)
            toggleButtonState(buttonElement, inputElementList);
        });
    })
} 

function hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

function toggleButtonState(buttonElement, inputList) {
    hasInvalidInput(inputList) ? buttonElement.classList.add('popup__button_inactive') : buttonElement.classList.remove('popup__button_inactive');
}

function enableValidation(popupList) {
    popupList.forEach(popupElement => {
        popupElement.addEventListener('submit', evt => evt.preventDefault());

        setValidationListeners(popupElement);
    })
}

export {enableValidation};
