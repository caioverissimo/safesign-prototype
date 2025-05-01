

export function showSignaturePanel() {
  console.log('@showSignaturePanel');

  const recipientsPanel = document.getElementById('recipients-panel');
  recipientsPanel.classList.add('hidden');

  const signaturePanel = document.getElementById('signature-panel');
  signaturePanel.classList.remove('hidden');
}

export function hideSignaturePanel() {
  console.log('@hideSignaturePanel');

  const signaturePanel = document.getElementById('signature-panel');
  signaturePanel.classList.add('hidden');

  const recipientsPanel = document.getElementById('recipients-panel');
  recipientsPanel.classList.remove('hidden');
}

export const setupRecipients = () => {
  console.log('@setupRecipients');

  window.showSignaturePanel = showSignaturePanel;
  window.hideSignaturePanel = hideSignaturePanel;
};