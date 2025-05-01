import { delayByMs } from "../helpers/delayByMs.js";

import { navigation } from '../pageLoader/navigation.js';
import { PageEnum } from '../data/enums.js';
import { goToUploadDocsPage } from "../global/generalNavigations.js";

const navigator = navigation();

const toggleDocSelected = (event, dataDocKey) => {
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

export async function renderUploadedDocs() {
  console.log('@renderUploadedDocs')
  const list = document.querySelector('.uploaddocs_actions');
  const docs = window.uploadDocsStore.get();

  // Clear list before re-render

  if (list && docs) {
    list.innerHTML = '';

    // Re-render each doc
    docs.forEach((doc, index) => {
      // const li = document.createElement('li');
      // li.className = 'uploaddocs_action-item';
      // li.setAttribute('data-doc-key', index);
      // li.setAttribute('onclick', `toggleDocSelected(event, ${index})`);
  
      // li.innerHTML = `
      //   <button type="button" class="uploaddocs_action-button">
      //     <img src="./src/assets/doc-thumb-picture-1.png" />
      //   </button>
      // `;
  
      // list.appendChild(li);

      const li = document.createElement('li');
      li.className = 'uploaddocs_action-item';
      li.setAttribute('data-doc-key', index);
      li.setAttribute('onclick', `toggleDocSelected(event, ${index})`);
    
      const tag = document.createElement('span');
      tag.className = 'uploaddocs_doc-tag';
      tag.textContent = doc.tag || `doc ${index + 1}`;
    
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'uploaddocs_action-button';
    
      const img = document.createElement('img');
      img.src = './src/assets/doc-thumb-picture-1.png';
    
      button.appendChild(img);
    
      li.appendChild(tag);
      li.appendChild(button);
    
      list.appendChild(li);
    });
  
    // Add the "+" button at the end
    const plusLi = document.createElement('li');
    plusLi.className = 'uploaddocs_action-item';
    plusLi.innerHTML = `
      <button type="button" class="uploaddocs_action-button" onclick="triggerUpload()">
        <div class="uploaddocs_action-button--picture">
          <img src="./src/assets/plus-lg-icon.svg" class="uploadarea_icon" />
        </div>
      </button>
    `;
    list.appendChild(plusLi);
  }

  await delayByMs(500);

  const hash = navigator.getRoute();

  if (hash !== PageEnum.UPLOAD_DOCS) {
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