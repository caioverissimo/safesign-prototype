const toggleSignature = async (index) => {
  console.log('@toggleSignature');
  window.uploadDocsStore.toggleSignature(index);

  renderUploadedDocs();
}

const saveSignedDocument = async (index) => {
  console.log('@saveSignedDocument');
  console.log('@saveSignedDocument | for doc:', index);

  toggleFloatingComponent('modal-add-signature', { shouldHaveLoader: false });

  toggleSignature(index);
}

const addSignTagToDocument = async () => {
  console.log('@addSignTagToDocument');

  const docpicture = document.querySelector('#docpicture');
  const docpictureTag = document.querySelector('#docpicture-tag');

  docpicture.classList.add('hidden');
  docpictureTag.classList.remove('hidden');
};

export const setupDocumentSignature = async () => {
  console.log('@setupDocumentSignature');

  window.toggleSignature = toggleSignature;
  window.addSignTagToDocument = addSignTagToDocument;
  window.saveSignedDocument = saveSignedDocument;
};