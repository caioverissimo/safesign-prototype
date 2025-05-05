import { delayByMs } from "../helpers/delayByMs.js";

import { navigation } from '../pageLoader/navigation.js';
import { PageEnum } from '../data/enums.js';
import { goToUploadDocsPage } from "../global/generalNavigations.js";
import { updateStepperProgressStore, updateStepperUI } from "../stepper-navigation/index.js";
import { hideDocDetails } from "../docdetails/index.js";

const navigator = navigation();

const toggleDocSelected = (dataDocKey) => {
  console.log('@toggleDocSelected');

  document.querySelectorAll('.uploaddocs_action-item').forEach((item) => {
    item.classList.remove('uploaddocs_action-item--selected');
  });

  const target = document.querySelector(`.uploaddocs_action-item[data-doc-key="${dataDocKey}"]`);

  if (target) {
    target.classList.add('uploaddocs_action-item--selected');
  }
  
  const docs = window.uploadDocsStore.get();
  const doc = docs[dataDocKey];
  
  showDocDetails(doc); // ✅ pass the right doc
};

export const addUploadedDoc = (doc) => {
  console.log('@addUploadedDoc');
  // const docs = window.uploadDocsStore.get();

  window.uploadDocsStore.add(doc);

  updateStepperUI();
};


export const renderUploadedDocs = async () => {
  console.log('@renderUploadedDocs');

  const list = document.querySelector('.uploaddocs_actions');
  const docs = window.uploadDocsStore.get();

  // Clear list before re-render

  if (list && docs) {
    list.innerHTML = '';

    // Re-render each doc
    docs.forEach(async (doc, index) => {
      // const li = document.createElement('li');
      // li.className = 'uploaddocs_action-item';
      // li.setAttribute('data-doc-key', index);
      // li.setAttribute('onclick', `toggleDocSelected(${index})`);
  
      // li.innerHTML = `
      //   <button type="button" class="uploaddocs_action-button">
      //     <img src="./src/assets/doc-thumb-picture-1.png" />
      //   </button>
      // `;
  
      // list.appendChild(li);

      const li = document.createElement('li');
      li.className = 'uploaddocs_action-item';
      li.setAttribute('data-doc-key', index);
      // li.setAttribute('onclick', `toggleDocSelected(${index})`);

      const box = document.createElement('div');
      box.className = 'uploaddocs_action-box';
      box.setAttribute('onclick', `toggleDocSelected(${index})`);
    
      const tag = document.createElement('span');
      tag.className = 'uploaddocs_doc-tag';
      tag.textContent = doc.tag || `doc ${index + 1}`;
    
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'uploaddocs_action-button';
    
      const img = document.createElement('img');
      img.src = './src/assets/doc-thumb-picture-1.png';
    
      button.appendChild(img);

      const hoverOverlay = document.createElement('div');
      hoverOverlay.className = 'uploads_action-hover';

      const viewButton = document.createElement('button');
      viewButton.type = 'button';
      viewButton.onclick = () => toggleFloatingComponent('modal-docviewer', { shouldHaveLoader: false });
      viewButton.innerHTML = `
        <picture><img src="./src/assets/magnifier-outline-icon.svg" /></picture>
        <span>visualizar</span>
      `;

      const editButton = document.createElement('button');
      editButton.type = 'button';
      editButton.onclick = () => toggleDocSelected(index);
      editButton.innerHTML = `
        <picture><img src="./src/assets/edit-outline-icon.svg" /></picture>
        <span>editar</span>
      `;

      const closeButton = document.createElement('div');
      closeButton.className = 'close-button';
      closeButton.onclick = async () => {
        docs.splice(index, 1);
        window.uploadDocsStore.set(docs);
        renderUploadedDocs(); // re-render after delete

        // TODO: remove this temporary hide approach after refactor.
        // This seems to be necessary because of the onclick, on "item" div
        // that triggers showDetails function.
        await delayByMs(25);
        hideDocDetails();
      };
      closeButton.innerHTML = `
        <span><img src="./src/assets/x-icon.svg" /></span>
      `;
    
      hoverOverlay.appendChild(viewButton);
      hoverOverlay.appendChild(editButton);
    
      box.appendChild(tag);
      box.appendChild(button);
      box.appendChild(hoverOverlay);
      box.appendChild(closeButton);

      const statusButton = document.createElement('button');
      statusButton.className = 'uploaddocs_status-button';

      if (doc?.signed) {
        statusButton.textContent = doc.signed ? 'Assinado' : 'Assinar';
        statusButton.classList.add(doc.signed ? 'signed' : 'unsigned');
      } else {
        statusButton.textContent = doc.signed ? 'Assinado' : 'Assinar';
        statusButton.classList.add(doc.signed ? 'signed' : 'unsigned');
        // statusButton.onclick = (event) => toggleFloatingComponent('modal-add-signature', { shouldHaveLoader: false });
        statusButton.onclick = (event) => {
          window.selectedDocIndex = index; // 👈 salva o index globalmente
          toggleFloatingComponent('modal-add-signature', { shouldHaveLoader: false });
        };
      }

      li.appendChild(box);
      li.appendChild(statusButton);

      list.appendChild(li);
    });

    // updateStepperProgressStore();
    // if (list.childNodes.length) {
    //   const disabledHightlightButton = document.querySelector('.button-highlight--disabled');

    //   if (disabledHightlightButton) {
    //     disabledHightlightButton.classList?.remove('button-highlight--disabled');
    //     disabledHightlightButton.removeAttribute('disabled');
    //   }
    // } else {
    //   const hightlightEnabledButton = document.querySelector('.button-highlight--right');
    //   hightlightEnabledButton.classList.add('button-highlight--disabled');
    // }
    updateStepperUI();
  
    // Add the "+" button at the end
    const plusLi = document.createElement('li');
    plusLi.className = 'uploaddocs_action-item';
    plusLi.innerHTML = `
      <div class="uploaddocs_action-box">
        <button type="button" class="uploaddocs_action-button" onclick="triggerUpload()">
          
            <div class="uploaddocs_action-button--picture">
              <img src="./src/assets/plus-lg-icon.svg" class="uploadarea_icon" />
            </div>
          </div>
        </button>
      </div>
    `;
    list.appendChild(plusLi);
  }

  await delayByMs(500);

  const hash = navigator.getRoute();

  // if (hash !== PageEnum.UPLOAD_DOCS) {
  //   console.log('#######ENTROU')
  //   goToUploadDocsPage();
  // }
  if (hash === PageEnum.HOME_LOGGED_IN) {
    console.log('#######ENTROU')
    goToUploadDocsPage();
  }

  // window.location.reload();
}

export const setupUploadDocs = () => {
  console.log('@setupUploadDocs');

  window.toggleDocSelected = toggleDocSelected;
  window.renderUploadedDocs = renderUploadedDocs;
};