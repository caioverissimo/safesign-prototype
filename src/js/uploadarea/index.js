// export function triggerUpload() {
//   console.log('@setupUploadArea | triggerUpload');

import { delayByMs } from "../helpers/delayByMs.js";
import { addUploadedDoc } from "../uploaddocs/index.js";

//   const fileInput = document.getElementById('file-upload');
//   fileInput.click();
// }

export function triggerUpload() {
  console.log('@setupUploadArea | triggerUpload');

  const input = document.getElementById('file-upload');
  input.click();

  input.onchange = async function () {
    const file = input.files[0];
    if (!file) return;

    const docs = window.uploadDocsStore.get();


    // Simulate adding to store
    const doc = {
      id: Date.now(), // unique id
      name: file.name,
      tag: `doc ${docs.length + 1}`,
    };
    console.log('Arquivo selecionado:', file.name);
    // window.uploadDocsStore.add(doc);

    addUploadedDoc(doc);

    renderUploadedDocs(); // call render after adding
    // await delayByMs(500);
    // window.lo
  };
}


export const bindUploadAreaBehaviour = () => {
  console.log('@setupUploadArea | bindUploadAreaBehaviour');

  document.getElementById('file-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
  
    if (file) {
      console.log('Arquivo selecionado:', file.name);
      // Aqui você pode mostrar o nome do arquivo, ou fazer preview se quiser
    }
  });
};


export const setupUploadArea = () => {
  console.log('@setupUploadArea');

  window.triggerUpload = triggerUpload;

  bindUploadAreaBehaviour();
};