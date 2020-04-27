export const elements = {
    container: document.querySelector('.grid-container'),
    itemsList: document.querySelector('.basket-items-panel'),
    oneItemInList: document.querySelector('.basket-items-list'),
    totalPrice: document.querySelector('.basket-items-total__price'),
    numOfItems: document.querySelector('.num-of-items-in-cart'),
    quantityOfItem: document.querySelector('.quantity'),
    navbar: document.querySelector('.navbar'),
    cartElement: document.querySelector('.cart'),
    closeBasketElement: document.querySelector('.basket-items-total__close-basket'),
    basketItemsTotal: document.querySelector('.basket-items-total')
};

export const renderItem = item => {
    const markup = `
            <li class="basket-items-list">
                <div class="basket-items-list__img">
                    <img src="${item.img}" alt="ski">
                </div>
                <div class="basket-items-list__data">
                    <div class="title">${item.title}</div>
                    <div class="q">
                        <div>Kolicina:</div>
                        <ion-icon name="remove-circle-outline" class="decrease-button"></ion-icon>
                        <div class="quantity">${item.quantity}</div>
                        <ion-icon name="add-circle-outline" class="increase-button"></ion-icon>
                    </div>
                    <div class="p">
                        <div>Cena artikla:</div>
                        <div class="price">${item.price}</div>
                    </div>
                </div>
                <ion-icon name="close-outline" class="close-icon"></ion-icon>
            </li>
    `;
    elements.basketItemsTotal.insertAdjacentHTML('beforebegin', markup);
}

export const deleteItemUI = e => {
    let item = e.target.parentNode;
    elements.itemsList.removeChild(item);
}

export const renderTotal = total => {
    elements.totalPrice.textContent = `${formatNumber(total)}`;
}

const formatNumber = (input) => {
    let thousand, rest;

    if (input == 0) {
        return `${input},00`;
    } else if (input < 1000) {
        return `${input},00`;
    } else {
        thousand = Math.floor(input / 1000);
        rest = input % 1000;
        if (rest >= 100) {
            return `${thousand}.${rest},00`
        } else {
            return `${thousand}.0${rest},00`
        }
    }
}

export const renderNumOfItems = num => {
    elements.numOfItems.textContent = `${num}`;
}

export const renderQuantityInc = (arr, e) => {
    let currQuantityElement, currQuantityValue, currTitle, index;

    currTitle = e.target.parentNode.previousElementSibling.innerText;
    index = arr.findIndex(el => el.title === currTitle);
    currQuantityValue = arr[index].quantity;
    currQuantityElement = e.target.previousElementSibling;

    currQuantityElement.textContent = `${currQuantityValue}`;
}

export const renderQuantityDec = (arr, e) => {
    let currQuantityElement, currQuantityValue, currTitle, index;

    currTitle = e.target.parentNode.previousElementSibling.innerText;
    index = arr.findIndex(el => el.title === currTitle);
    currQuantityValue = arr[index].quantity;
    currQuantityElement = e.target.nextElementSibling;

    currQuantityElement.textContent = `${currQuantityValue}`;
}

export const displayBasket = () => {
    elements.itemsList.classList.toggle('displayBasket');
}

export const hideBasket = () => {
    elements.itemsList.classList.toggle('displayBasket');
}

export const stickyNavFunc = () => {
    let navbar = document.getElementById('navbar');
  
    if (window.pageYOffset >= 50) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  }
