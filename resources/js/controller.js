import { elements, renderItem, renderTotal, renderNumOfItems, deleteItemUI, renderQuantityInc, renderQuantityDec, displayBasket, hideBasket, stickyNavFunc } from './view.js';
import { Item, updateTotal, updateQuantityInc, updateQuantityDec, persistDataToStorage, readDataFromStorage, addItem, deleteItem, isInBasket, getNumItems } from './model.js';


let state = {};



// BASKET controller ADD
const basketControllerAdd = (e) => {

  // napraviti novi artikl kada se klikne button (on je ubacen u niz items)
  if (!state.items) state.items = new Item()

  // pokupiti ono sto se trenutno prikaze za svaki item kada se klikne bas njegov button
  let img, title, price;
  img = e.target.parentNode.parentNode.previousElementSibling.firstElementChild.src;
  title = e.target.parentNode.previousElementSibling.innerText;
  price = e.target.previousElementSibling.innerText;

  // 1a. add item in data structure svaki put kada se klikne button (ako ga vec nema)
  if (!isInBasket(state.items.items, title)) {
    const newItem = addItem(state.items.items, img, title, price);

    // 1b. render item on UI
    renderItem(newItem);

    // 2. update total and num of items
    updateTotalAndNumOfItems();
  }

}


// BASKET controller DELETE
const basketControllerDelete = (e) => {

  if (state.items) {
    let title;
    title = e.target.previousElementSibling.firstElementChild.innerText;

    // 1a. delete item from data structure svaki put kada se klikne button x
    deleteItem(state.items.items, title)

    // 1b. delete item from UI
    deleteItemUI(e);

    // 2. update total and num of items
    updateTotalAndNumOfItems();
  }
}


// Controlling function for updating totals and num of items
const updateTotalAndNumOfItems = () => {
  // 2a. update total data in data structure
  state.total = updateTotal(state.items.items);

  // 2b. update total on UI
  renderTotal(state.total);

  // 3a. update num of Items in data structure
  state.numItems = getNumItems(state.items.items);

  // 3b. update num of Items on UI
  renderNumOfItems(state.numItems);
}



// * EVENT listeners * //
// Event listener za ADD tj. kliknut button <<DODAJ u KORPU>>
elements.container.addEventListener('click', e => {

  if (e.target.matches('.btn, .btn *')) {
    basketControllerAdd(e);
  }
  persistDataToStorage('state', state);
});


// Event listener za DELETE tj. kliknut button << x >> u samoj korpi
elements.itemsList.addEventListener('click', e => {

  if (e.target.matches('.close-icon, .close-icon *')) {
    basketControllerDelete(e);
  }
  persistDataToStorage('state', state);
});


// Event listener za QUANTITY buttons + i - u samoj korpi
elements.itemsList.addEventListener('click', e => {
  if (e.target.matches('.increase-button, .increase-button *')) {

    // update quantity data in data structure
    updateQuantityInc(state.items.items, e);

    // render quantity data on UI
    renderQuantityInc(state.items.items, e);

    // update and render total
    updateTotalAndNumOfItems();

    persistDataToStorage('state', state);
  }
});

elements.itemsList.addEventListener('click', e => {
  if (e.target.matches('.decrease-button, .decrease-button *')) {

    // update quantity data in data structure
    updateQuantityDec(state.items.items, e);

    // render quantity data on UI
    renderQuantityDec(state.items.items, e);

    // update and render total
    updateTotalAndNumOfItems();

    persistDataToStorage('state', state);
  }
});


// Event listener za SHOW basket
elements.cartElement.addEventListener('click', displayBasket);

// Event listener za HIDE basket
elements.closeBasketElement.addEventListener('click', hideBasket);


// Event to restore ITEMS from LOCAL STORAGE when page loads
window.addEventListener('load', () => {

  if (readDataFromStorage('state')) {
    state = readDataFromStorage('state');

    // 1. render item on UI
    state.items.items.forEach(el => renderItem(el));

    // 2. render total
    renderTotal(state.total);

    // 3. render num of items
    renderNumOfItems(state.numItems);
  }
  stickyNavFunc();
});
//localStorage.clear();



//  EVENT for sticky navbar
window.addEventListener('scroll', stickyNavFunc);

