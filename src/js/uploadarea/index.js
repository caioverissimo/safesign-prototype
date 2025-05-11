import { delayByMs } from "../helpers/delayByMs.js";
import { addUploadedDoc } from "../uploaddocs/index.js";

export function triggerUpload() {
  console.log('@setupUploadArea | triggerUpload');

  const input = document.getElementById('file-upload');
  input.click();

  input.onchange = async function () {
    const file = input.files[0];
    if (!file) return;

    const docs = window.uploadDocsStore.get();


    const doc = {
      id: Date.now(),
      name: file.name,
      tag: `doc ${docs.length + 1}`,
    };
    console.log('Arquivo selecionado:', file.name);

    addUploadedDoc(doc);

    renderUploadedDocs();
  };
}


export const bindUploadAreaBehaviour = () => {
  console.log('@setupUploadArea | bindUploadAreaBehaviour');

  document.getElementById('file-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
  
    if (file) {
      console.log('Arquivo selecionado:', file.name);
    }
  });
};


export const setupUploadArea = () => {
  console.log('@setupUploadArea');

  window.triggerUpload = triggerUpload;

  bindUploadAreaBehaviour();
};