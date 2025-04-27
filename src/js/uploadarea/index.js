export function triggerUpload() {
  console.log('@setupUploadArea | triggerUpload');

  const fileInput = document.getElementById('file-upload');
  // TODO: enable 
  // fileInput.click();
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