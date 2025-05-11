import { delayByMs } from "../helpers/delayByMs.js";
import { toggleLoader } from "../loader/index.js";

export const paginateModalSignup = async (pageId) => {
  console.log('@setupModals | paginateModalSignup');

  if (!pageId) {
    throw Error("The 'page id' is missing!")
  }

  const paginationItem =  $(`#pagination-item_${pageId}`)
  const page = $(`#${pageId}`);
  const pageDisplay = page.css('display');
  
  const modalContent = $(`#modal-signup`).find('.modal-content');

  paginationItem.parent().children().removeClass('pagination_item--active');
  paginationItem.addClass('pagination_item--active');

  page.parent().children().css('display', 'none');
  page.css('display', 'block');

  modalContent.removeClass('modal-content--token');

  if (pageId === 'forms-token') {
    modalContent.addClass('modal-content--token');
  }
};

export const paginateModalAddSignature = async (pageId) => {
  console.log('@setupModals | paginateModalAddSignature');

  if (!pageId) {
    throw Error("The 'page id' is missing!")
  }
  const paginationItem =  $(`#pagination-item_${pageId}`)
  const page = $(`#${pageId}`);
  const pageDisplay = page.css('display');
  const modalContent = $(`#modal-add-signature`).find('.modal-content');

  paginationItem.parent().children().removeClass('pagination_item--active');
  paginationItem.addClass('pagination_item--active');

  page.parent().children().css('display', 'none');
  page.css('display', 'block');

  modalContent.removeClass('modal-content--token');

  if (pageId === 'forms-token') {
    modalContent.addClass('modal-content--token');
  }
};

export const toggleFloatingComponent = async (componentId, options) => {
  console.log('@setupModals | toggleFloatingComponent');
  
  if (options?.shouldHaveLoader !== false) {
    toggleLoader();

    // await delayByMs(1500);
    await delayByMs(200);
  }


  if (componentId) {
    const component = $(`#${componentId}`);
    const componentState = component.css('display');
  
    if (options?.state) {
      const newDisplayValue = !!options?.state ? 'none' : 'flex';
      console.log('newDisplayValue: ', newDisplayValue);
      component.css('display', newDisplayValue);

      if (options?.shouldHaveLoader !== false) {
        toggleLoader();
      }
      return;
    }
  
    if (componentState !== 'none') {
      if (options?.shouldHaveLoader !== false) {
        toggleLoader();
      }
      console.log('componentState: ', componentState);
      component.css('display', 'none');
      return;
    }
  
    // console.log('componentState: ', componentState);
    component.css('display', 'flex');
    if (options?.shouldHaveLoader !== false) {
      toggleLoader();
    }
    return;
  }

  throw Error("The 'component id' is missing!");
};


export const setupModals = () => {
  console.log('@setupModals');

  window.toggleFloatingComponent = toggleFloatingComponent;
  window.paginateModalSignup = paginateModalSignup;
  window.paginateModalAddSignature = paginateModalAddSignature;
};