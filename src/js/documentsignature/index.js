const toggleSignature = async (event, index) => {
  window.uploadDocsStore.toggleSignature(index);

  renderUploadedDocs();
}


export const setupDocumentSignature = async () => {
  console.log('@setupDocumentSignature');

  window.toggleSignature = toggleSignature;
};