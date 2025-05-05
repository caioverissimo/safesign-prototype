import { delayByMs } from "../helpers/delayByMs.js";

export function getSelectedDocIndex() {
  console.log('@getSelectedDocIndex');
  const selected = document.querySelector('.uploaddocs_action-item--selected');
  return selected ? Number(selected.getAttribute('data-doc-key')) : -1;
}

export function showDocDetails(doc) {
  console.log('@showDocDetails');

  const panel = document.getElementById('docdetails-panel');
  // document.getElementById('docdetails-title').textContent = doc.tag || 'Doc';
  document.getElementById('docdetails-title').textContent = 'Detalhe do documento';

  document.getElementById('doc_name').value = doc?.name || '';
  document.querySelector('.docdetails-panel .uploaddocs_doc-tag').textContent = doc?.tag || 'doc';
  document.getElementById('doc_request_name').value = doc?.request || '';
  panel.classList.remove('hidden');

  const uploadarea = document.querySelector('.uploadarea');
  uploadarea.classList.add('hidden');
}

export function hideDocDetails() {
  console.log('@hideDocDetails');

  const panel = document.getElementById('docdetails-panel');
  panel.classList.add('hidden');

  const uploadarea = document.querySelector('.uploadarea');
  uploadarea.classList.remove('hidden');
}

export function handleSaveDoc() {
  console.log('@handleSaveDoc');

  const name = document.getElementById('doc_name').value;
  const request = document.getElementById('doc_request_name').value;

  const docs = window.uploadDocsStore.get();
  const selectedIndex = getSelectedDocIndex(); // Implement based on selection state
  const doc = docs[selectedIndex];

  docs[selectedIndex] = { ...doc, name, request };
  window.uploadDocsStore.set(docs);

  renderUploadedDocs();

  hideDocDetails();
}

export const handleDeleteDoc = async () => {
  console.log('@handleDeleteDoc');
  const docs = window.uploadDocsStore.get();
  const selectedIndex = getSelectedDocIndex(); // Implement yourself
  docs.splice(selectedIndex, 1);
  window.uploadDocsStore.set(docs);
  renderUploadedDocs();
  document.getElementById('docdetails-panel').classList.add('hidden');
}


export const setupDocDetails = async () => {
  console.log('@setupDocDetails');

  window.showDocDetails = showDocDetails;
  window.hideDocDetails = hideDocDetails;
  window.handleSaveDoc = handleSaveDoc;
  window.handleDeleteDoc = handleDeleteDoc;
  window.getSelectedDocIndex = getSelectedDocIndex;
};