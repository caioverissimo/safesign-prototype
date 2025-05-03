import { updateStepperUI } from "../stepper-navigation/index.js";

const showSignaturePanel = (index) => {
  // const panel = document.getElementById('signature-panel');
  // const canvas = panel.querySelector('.signature-canvas img');
  // const salvarBtn = panel.querySelector('button.button-main');
  // const recipientsPanel = document.getElementById('recipients-panel');

  // const signatures = window.signaturesStore.get();
  // const selected = signatures[index];

  // canvas.src = selected.signatureFile;
  // canvas.alt = `Assinatura de ${selected.name}`;

  // if (selected.isSelf) {
  //   salvarBtn.removeAttribute('disabled');
  // } else {
  //   salvarBtn.setAttribute('disabled', 'disabled');
  // }

  // panel.classList.remove('hidden');
  // recipientsPanel.classList.add('hidden');

  // window.currentSignatureIndex = index;

  const panel = document.getElementById('signature-panel');
  const recipientsPanel = document.getElementById('recipients-panel');

  panel.classList.remove('hidden');
  recipientsPanel.classList.add('hidden');

  renderSignaturePanel(index);
  window.currentSignatureIndex = index;
}

export function hideSignaturePanel() {
  console.log('@hideSignaturePanel');

  const signaturePanel = document.getElementById('signature-panel');
  signaturePanel.classList.add('hidden');

  const recipientsPanel = document.getElementById('recipients-panel');
  recipientsPanel.classList.remove('hidden');
}

export const toggleRecipientSignature = async (index) => {
  console.log('@toggleSignature');
  window.signaturesStore.toggleSignature(index);

  hideSignaturePanel();
  renderRecipients();


  updateStepperUI();
}


export const renderRecipients = () => {
  console.log('@renderRecipients');
  
  const list = document.querySelector('#recipients-panel .recipients-list');
  const signatures = window.signaturesStore.get();

  if (list) {
    list.innerHTML = '';

    signatures.forEach((recipient, index) => {
      const li = document.createElement('li');
      li.className = 'recipients_item' + (recipient.signature && recipient.initials ? ' recipients_item--complete' : '');

      const box = document.createElement('div');
      box.className = 'recipients-box';

      const content = document.createElement('div');
      content.className = 'recipients-box_content';

      const name = document.createElement('span');
      name.className = 'recipients_name';
      name.textContent = recipient.name;

      const tags = document.createElement('div');
      tags.className = 'recipient-tags';

      const signatureTag = document.createElement('div');
      signatureTag.className = 'recipient-tags_item' + (recipient.signature ? '' : ' recipient-tags_item--outline');
      signatureTag.textContent = recipient.signature ? 'Assinatura' : 'SEM Assinatura';

      const initialsTag = document.createElement('div');
      initialsTag.className = 'recipient-tags_item' + (recipient.initials ? '' : ' recipient-tags_item--outline');
      initialsTag.textContent = recipient.initials ? 'Rubrica' : 'SEM Rubrica';

      tags.appendChild(signatureTag);
      tags.appendChild(initialsTag);

      content.appendChild(name);
      content.appendChild(tags);

      box.appendChild(content);

      if (!recipient.signature || !recipient.initials) {
        const action = document.createElement('div');
        action.className = 'recipients-box_action';

        const button = document.createElement('button');
        button.type = 'button';
        button.onclick = () => showSignaturePanel(index);
        button.innerHTML = `<img src="./src/assets/warning-circle-icon.svg" />`;

        action.appendChild(button);
        box.appendChild(action);
      }

      li.appendChild(box);
      list.appendChild(li);
    });
  }
}

export const renderSignaturePanel = (index) => {
  console.log('@renderSignaturePanel');
  
  const panel = document.getElementById('signature-panel');
  const signatures = window.signaturesStore.get();
  const recipient = signatures[index];

  // Clear previous content
  panel.innerHTML = '';

  // -- Heading
  const heading = document.createElement('header');
  heading.className = 'heading';
  heading.innerHTML = `<h4>Cadastrar Assinatura</h4>`;
  panel.appendChild(heading);

  // -- Top box with name, tags and warning icon
  const topBox = document.createElement('div');
  topBox.className = 'recipients-box';

  const boxContent = document.createElement('div');
  boxContent.className = 'recipients-box_content';

  const name = document.createElement('span');
  name.className = 'recipients_name';
  name.textContent = recipient.name;

  const tags = document.createElement('div');
  tags.className = 'recipient-tags';

  const signatureTag = document.createElement('div');
  signatureTag.className = 'recipient-tags_item' + (recipient.signature ? '' : ' recipient-tags_item--outline');
  signatureTag.textContent = recipient.signature ? 'Assinatura' : 'SEM Assinatura';

  const initialsTag = document.createElement('div');
  initialsTag.className = 'recipient-tags_item' + (recipient.initials ? '' : ' recipient-tags_item--outline');
  initialsTag.textContent = recipient.initials ? 'Rubrica' : 'SEM Rubrica';

  tags.appendChild(signatureTag);
  tags.appendChild(initialsTag);

  boxContent.appendChild(name);
  boxContent.appendChild(tags);
  topBox.appendChild(boxContent);

  const action = document.createElement('div');
  action.className = 'recipients-box_action';
  const warningBtn = document.createElement('button');
  warningBtn.innerHTML = `<img src="./src/assets/warning-circle-icon.svg" />`;
  action.appendChild(warningBtn);
  topBox.appendChild(action);

  panel.appendChild(topBox);

  // -- Label
  const label = document.createElement('p');
  label.textContent = 'Assine na área disponível abaixo:';
  panel.appendChild(label);

  // -- Signature image (simulated canvas)
  const canvas = document.createElement('div');
  canvas.className = 'signature-canvas';

  const img = document.createElement('img');
  img.src = recipient.signatureFile;
  img.alt = `Assinatura de ${recipient.name}`;
  canvas.appendChild(img);

  panel.appendChild(canvas);

  // -- Buttons
  const actions = document.createElement('div');
  actions.className = 'action_group';

  const saveButton = document.createElement('button');
  saveButton.className = 'button button-main';
  saveButton.textContent = recipient.isSelf ? 'Salvar' : 'Fechar'
  saveButton.onclick = recipient.isSelf ? (() => toggleRecipientSignature(index)) : (() => hideSignaturePanel());

  const clearButton = document.createElement('button');
  clearButton.className = 'button button-main--outline';
  clearButton.textContent = 'Limpar';
  clearButton.setAttribute('disabled', true); // you can enable if drawing is implemented

  actions.appendChild(saveButton);
  actions.appendChild(clearButton);

  panel.appendChild(actions);
};

export const setupRecipients = () => {
  console.log('@setupRecipients');

  window.showSignaturePanel = showSignaturePanel;
  window.hideSignaturePanel = hideSignaturePanel;
  window.renderRecipients = renderRecipients;
  window.renderRecipients = renderRecipients;
  window.toggleRecipientSignature = toggleRecipientSignature;
};