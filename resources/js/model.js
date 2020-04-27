export class Item {
    constructor() {
        this.items = [];
    }
}


export const addItem = (arr, img, title, price, quantity = 1) => {

    const item = { img, title, price, quantity };
    arr.push(item);

    return item;
}

export const deleteItem = (arr, title) => {
    const index = arr.findIndex(el => el.title === title);
    arr.splice(index, 1);
}


export const isInBasket = (arr, title) => {
    return arr.findIndex(el => el.title === title) !== -1;
}


export const getNumItems = (arr) => {
    return arr.length;
}


// STORAGE
export const persistDataToStorage = (nameString, name) => {
    localStorage.setItem(nameString, JSON.stringify(name));
}


export const readDataFromStorage = (nameString) => {
    let storage = JSON.parse(localStorage.getItem(nameString));

    return storage;
}

// CALCULATIONS
export const updateTotal = arr => {
    let priceArray = [];
    let priceTimesQuantityArr = [];

    arr.forEach(el => {
        priceArray.push([showPriceAsNum(el.price), el.quantity]);
    });

    priceArray.forEach(el => {
        priceTimesQuantityArr.push(el[0] * el[1]);
    });

    let total;
    if (priceArray.length > 0) {
        total = priceTimesQuantityArr.reduce((acc, curr) => acc + curr);
    } else {
        total = '0';
    };
    console.log(priceArray)
    console.log(total)
    return total;
}


const showPriceAsNum = price => {
    return parseFloat(price.split(' ')[1]);
}


// QUANTITIES
export const updateQuantityInc = (arr, e) => {
    let currTitle, index;

    currTitle = e.target.parentNode.previousElementSibling.innerText;
    index = arr.findIndex(el => el.title === currTitle);

    arr[index].quantity += 1;
}

export const updateQuantityDec = (arr, e) => {
    let currTitle, index;

    currTitle = e.target.parentNode.previousElementSibling.innerText;
    index = arr.findIndex(el => el.title === currTitle);

    if (arr[index].quantity >= 2) {

        arr[index].quantity -= 1;
    }
}
