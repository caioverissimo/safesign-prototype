(() => {
  // src/js/helpers/delayByMs.js
  async function delayByMs(delayTimeInMs = 1e3) {
    return new Promise((resolve) => {
      setTimeout(resolve, delayTimeInMs);
    });
  }

  // src/js/data/sessionKeys.js
  var SESSION_KEYS = Object.freeze({
    VIEWPORT: "viewport",
    SIDEMENU_OPEN: "sidemenu_open",
    AUTHENTICATED: "authenticated",
    NODE_DATA: "node_data",
    STEP_DATA: "STEP_DATA"
  });

  // src/js/data/defaults.js
  var defaultViewData = {
    viewport: null,
    sidemenuOpen: false,
    nodeData: null
  };
  var defaultSessionData = {
    register: false,
    authenticate: false,
    login: false
  };

  // src/js/helpers/useSessionStorage.js
  function useSessionStorage(key, initialValue) {
    function safeParse(value) {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    function safeStringify(value) {
      if (typeof value === "object" && value !== null) {
        return JSON.stringify(value);
      }
      return value;
    }
    try {
      const existing = window?.sessionStorage?.getItem(key);
      if (existing === null && initialValue !== void 0) {
        const valueToStore = safeStringify(initialValue);
        window?.sessionStorage?.setItem(key, valueToStore);
      }
    } catch (error) {
      console.error("Failed to initialize sessionStorage item", error);
    }
    function getItem() {
      try {
        const stored = window?.sessionStorage?.getItem(key);
        if (stored === null) return initialValue;
        return safeParse(stored);
      } catch (error) {
        console.error("Failed to read sessionStorage item", error);
        return initialValue;
      }
    }
    function setItem(value) {
      try {
        const valueToStore = safeStringify(value);
        window?.sessionStorage?.setItem(key, valueToStore);
      } catch (error) {
        console.error("Failed to set sessionStorage item", error);
      }
    }
    function removeItem() {
      try {
        window?.sessionStorage?.removeItem(key);
      } catch (error) {
        console.error("Failed to remove sessionStorage item", error);
      }
    }
    return {
      get: getItem,
      set: setItem,
      remove: removeItem
    };
  }

  // src/js/data/enums.js
  var ViewportEnum = Object.freeze({
    MOBILE: "MOBILE",
    TABLET: "TABLET",
    DESKTOP: "DESKTOP"
  });
  var PageEnum = Object.freeze({
    HOME_UNAUTHENTICATED: "HOME_UNAUTHENTICATED",
    HOME_LOGGED_IN: "HOME_LOGGED_IN",
    UPLOAD_DOCS: "UPLOAD_DOCS",
    RECIPIENT_REGISTRATION: "RECIPIENT_REGISTRATION",
    SELFIE_BIOMETRY: "SELFIE_BIOMETRY",
    DOCUMENT_SIGNATURE: "DOCUMENT_SIGNATURE"
    // HOME_LOGGED_OUT: 'home-logged-out',
  });

  // src/js/pageLoader/pageSourceMapper.js
  var pageSourceMapper = {
    [PageEnum.HOME_UNAUTHENTICATED]: "./src/pages/home-unauthenticated.html",
    [PageEnum.HOME_LOGGED_IN]: "./src/pages/home-logged-in.html",
    [PageEnum.UPLOAD_DOCS]: "./src/pages/upload-docs.html",
    [PageEnum.RECIPIENT_REGISTRATION]: "./src/pages/recipient-registration.html",
    [PageEnum.SELFIE_BIOMETRY]: "./src/pages/selfie-biometry.html",
    [PageEnum.DOCUMENT_SIGNATURE]: "./src/pages/document-signature.html"
  };

  // src/js/pageLoader/index.js
  var PageLoader = /* @__PURE__ */ (() => {
    async function loadPageByEnum(pageEnum) {
      const url = pageSourceMapper[pageEnum];
      if (!url) {
        console.error(`\u274C No path found for pageEnum: ${pageEnum}`);
        return;
      }
      const mainContainer = document.querySelector("#main");
      if (!mainContainer) {
        console.error("\u274C No #app-container found");
        return;
      }
      try {
        await fadeOut(mainContainer);
        const response = await fetch(url);
        const html = await response.text();
        mainContainer.innerHTML = html;
        window.pageStore.set(pageEnum);
        fadeIn(mainContainer);
        console.log(`\u2705 Page loaded: ${pageEnum}`);
      } catch (error) {
        console.error(`\u274C Failed to load page: ${pageEnum}`, error);
      }
    }
    function fadeOut(element, duration = 300) {
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = 0;
      return new Promise((resolve) => setTimeout(resolve, duration));
    }
    function fadeIn(element, duration = 300) {
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = 1;
    }
    return {
      loadPageByEnum
    };
  })();

  // src/js/pageLoader/navigation.js
  function navigation() {
    async function navigate(pageEnumKey) {
      const pagePath = pageSourceMapper[pageEnumKey];
      if (!pagePath) {
        console.error(`\u274C No path found for page: ${pageEnumKey}`);
        return;
      }
      await PageLoader.loadPageByEnum(pageEnumKey);
      window.location.hash = pageEnumKey;
      window.pageStore.set(pageEnumKey);
    }
    function getRoute() {
      const hash = window.location.hash.slice(1);
      return hash || null;
    }
    return {
      navigate,
      getRoute
    };
  }

  // src/js/global/generalNavigations.js
  var navigator = navigation();
  var goToLoggedInPage = async () => {
    console.log("@goToLoggedInPage");
    navigator.navigate(PageEnum.HOME_LOGGED_IN);
  };
  var goToUploadDocsPage = async () => {
    console.log("@goToUploadDocsPage");
    navigator.navigate(PageEnum.UPLOAD_DOCS);
    await delayByMs(3e3);
  };
  var goToRecipientRegistrationPage = async () => {
    console.log("@goToRecipientRegistrationPage");
    navigator.navigate(PageEnum.RECIPIENT_REGISTRATION);
  };
  var goToSelfieBiometryPage = async () => {
    console.log("@goToSelfieBiometryPage");
    navigator.navigate(PageEnum.SELFIE_BIOMETRY);
  };
  var setupGeneralNavigations = async () => {
    console.log("@setupGeneralNavigations");
    window.goToLoggedInPage = goToLoggedInPage;
    window.goToUploadDocsPage = goToUploadDocsPage;
    window.goToRecipientRegistrationPage = goToRecipientRegistrationPage;
    window.goToSelfieBiometryPage = goToSelfieBiometryPage;
  };

  // src/js/uploaddocs/index.js
  var navigator2 = navigation();
  var toggleDocSelected = (event, dataDocKey) => {
    console.log("@toggleDocSelected");
    document.querySelectorAll(".uploaddocs_action-item").forEach((item) => {
      item.classList.remove("uploaddocs_action-item--selected");
    });
    const target = document.querySelector(`.uploaddocs_action-item[data-doc-key="${dataDocKey}"]`);
    if (target) {
      target.classList.add("uploaddocs_action-item--selected");
    }
    const docs = window.uploadDocsStore.get();
    const doc = docs[dataDocKey];
    showDocDetails(doc);
  };
  async function renderUploadedDocs2() {
    console.log("@renderUploadedDocs");
    const list = document.querySelector(".uploaddocs_actions");
    const docs = window.uploadDocsStore.get();
    if (list && docs) {
      list.innerHTML = "";
      docs.forEach((doc, index) => {
        const li = document.createElement("li");
        li.className = "uploaddocs_action-item";
        li.setAttribute("data-doc-key", index);
        li.setAttribute("onclick", `toggleDocSelected(event, ${index})`);
        const tag = document.createElement("span");
        tag.className = "uploaddocs_doc-tag";
        tag.textContent = doc.tag || `doc ${index + 1}`;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "uploaddocs_action-button";
        const img = document.createElement("img");
        img.src = "./src/assets/doc-thumb-picture-1.png";
        button.appendChild(img);
        li.appendChild(tag);
        li.appendChild(button);
        list.appendChild(li);
      });
      const plusLi = document.createElement("li");
      plusLi.className = "uploaddocs_action-item";
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
    const hash = navigator2.getRoute();
    if (hash !== PageEnum.UPLOAD_DOCS) {
      console.log("#######ENTROU");
      goToUploadDocsPage();
    }
  }
  var setupUploadDocs = () => {
    console.log("@setupUploadDocs");
    window.toggleDocSelected = toggleDocSelected;
    window.renderUploadedDocs = renderUploadedDocs2;
  };

  // src/js/main/autoNavigateOnLoad.js
  var navigator3 = navigation();
  async function autoNavigateOnLoad() {
    console.log("@autoNavigateOnLoad");
    const stepData = window.stepDataStore.get();
    const isLoggedIn = stepData.register && stepData.authenticate && stepData.login;
    const toggleLoginStateClass = () => {
      if (isLoggedIn) {
        app.classList.add("logged-in");
        app.classList.remove("logged-out");
      } else {
        app.classList.add("logged-out");
        app.classList.remove("logged-in");
      }
    };
    const app = document.getElementById("app-container");
    if (!isLoggedIn) {
      await navigator3.navigate(PageEnum.HOME_UNAUTHENTICATED);
      app.classList.add("logged-out");
      app.classList.remove("logged-in");
      return;
    }
    if (isLoggedIn) {
      app.classList.add("logged-in");
      app.classList.remove("logged-out");
      const hash = navigator3.getRoute();
      if (hash && hash !== PageEnum.HOME_UNAUTHENTICATED) {
        navigator3.navigate(hash);
        return;
      }
      await navigator3.navigate(PageEnum.HOME_LOGGED_IN);
      return;
    }
    console.error("\u{1F6A8} Estado inv\xE1lido detectado no stepDataStore.", stepData);
  }

  // src/js/forms/index.js
  function updateStepProgress(key, value = true) {
    const stepDataStore = window.stepDataStore;
    const current = stepDataStore.get();
    stepDataStore.set({ ...current, [key]: value });
  }
  var bindTokenInputBehaviour = () => {
    console.log("@setupForms | bindTokenInputBehaviour");
    document.querySelectorAll(".form-token-boxes input").forEach((input, index, inputs) => {
      input.addEventListener("input", () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value === "" && index > 0) {
          inputs[index - 1].focus();
        }
      });
    });
  };
  var bindPhoneMaskBehaviour = () => {
    console.log("@setupForms | bindPhoneMaskBehaviour");
    const phoneInput = document.getElementById("phone");
    if (phoneInput) {
      phoneInput.addEventListener("input", function(e) {
        let numbers = e.target.value.replace(/\D/g, "");
        numbers = numbers.substring(0, 11);
        if (numbers.length > 0) {
          numbers = numbers.replace(/^(\d{2})(\d)/g, "($1) $2");
        }
        if (numbers.length > 9) {
          numbers = numbers.replace(/(\d{5})(\d{4})$/, "$1-$2");
        } else if (numbers.length > 6) {
          numbers = numbers.replace(/(\d{4})(\d{0,4})$/, "$1-$2");
        }
        e.target.value = numbers;
      });
    }
  };
  async function handleSubmit(event, onSuccessCallback) {
    const form = event.target;
    if (!form.checkValidity()) {
      return;
    }
    event.preventDefault();
    console.log("Form is valid! Proceed...");
    if (typeof onSuccessCallback === "function") {
      onSuccessCallback();
    }
  }
  function handleSignupSubmit(event) {
    handleSubmit(event, () => {
      console.log("Cadastro enviado, salvando register = true");
      updateStepProgress("register");
      paginateModalSignup("forms-token");
    });
  }
  function handleTokenSubmit(event) {
    handleSubmit(event, () => {
      console.log("Token autorizado, salvando authenticate = true");
      updateStepProgress("authenticate");
      toggleFloatingComponent("modal-signup");
    });
  }
  async function handleLoginSubmit(event) {
    handleSubmit(event, async () => {
      const stepDataStore = window.stepDataStore;
      const current = stepDataStore.get();
      if (!current.register || !current.authenticate) {
        console.error("Erro: O usu\xE1rio ainda n\xE3o completou o registro ou a autentica\xE7\xE3o.");
        return;
      }
      console.log("Login autorizado, salvando login = true");
      updateStepProgress("login");
      toggleFloatingComponent("modal-login", { shouldHaveLoader: false });
      await delayByMs(500);
      await autoNavigateOnLoad();
    });
  }
  var setupForms = () => {
    ``;
    console.log("@setupForms");
    window.handleSubmit = handleSubmit;
    window.handleSignupSubmit = handleSignupSubmit;
    window.handleTokenSubmit = handleTokenSubmit;
    window.handleLoginSubmit = handleLoginSubmit;
    bindTokenInputBehaviour();
    bindPhoneMaskBehaviour();
  };

  // src/js/loader/index.js
  var toggleLoader = (state) => {
    console.log("@toggleLoader");
    const loaderState = $("#overlay").css("display");
    if (state) {
      const newDisplayValue = !!state ? "none" : "flex";
      console.log("newDisplayValue: ", newDisplayValue);
      return $("#overlay").css("display", newDisplayValue);
    }
    if (loaderState !== "none") {
      console.log("loaderState: ", loaderState);
      return $("#overlay").css("display", "none");
    }
    console.log("loaderState: ", loaderState);
    return $("#overlay").css("display", "flex");
  };

  // src/js/modals/index.js
  var paginateModalSignup2 = async (pageId) => {
    console.log("@setupModals | paginateModalSignup");
    if (!pageId) {
      throw Error("The 'page id' is missing!");
    }
    const paginationItem = $(`#pagination-item_${pageId}`);
    const page = $(`#${pageId}`);
    const pageDisplay = page.css("display");
    const modalContent = $(`#modal-signup`).find(".modal-content");
    paginationItem.parent().children().removeClass("pagination_item--active");
    paginationItem.addClass("pagination_item--active");
    page.parent().children().css("display", "none");
    page.css("display", "block");
    modalContent.removeClass("modal-content--token");
    if (pageId === "forms-token") {
      modalContent.addClass("modal-content--token");
    }
  };
  var toggleFloatingComponent2 = async (componentId, options) => {
    console.log("@setupModals | toggleFloatingComponent");
    if (options?.shouldHaveLoader !== false) {
      toggleLoader();
      await delayByMs(200);
    }
    if (componentId) {
      const component = $(`#${componentId}`);
      const componentState = component.css("display");
      if (options?.state) {
        const newDisplayValue = !!options?.state ? "none" : "flex";
        console.log("newDisplayValue: ", newDisplayValue);
        component.css("display", newDisplayValue);
        if (options?.shouldHaveLoader !== false) {
          toggleLoader();
        }
        return;
      }
      if (componentState !== "none") {
        if (options?.shouldHaveLoader !== false) {
          toggleLoader();
        }
        console.log("componentState: ", componentState);
        component.css("display", "none");
        return;
      }
      component.css("display", "flex");
      if (options?.shouldHaveLoader !== false) {
        toggleLoader();
      }
      return;
    }
    throw Error("The 'component id' is missing!");
  };
  var setupModals = () => {
    console.log("@setupModals");
    window.toggleFloatingComponent = toggleFloatingComponent2;
    window.paginateModalSignup = paginateModalSignup2;
  };

  // src/js/uploadarea/index.js
  function triggerUpload() {
    console.log("@setupUploadArea | triggerUpload");
    const input = document.getElementById("file-upload");
    input.click();
    input.onchange = async function() {
      const file = input.files[0];
      if (!file) return;
      const docs = window.uploadDocsStore.get();
      const doc = {
        id: Date.now(),
        // unique id
        name: file.name,
        tag: `doc ${docs.length + 1}`
      };
      console.log("Arquivo selecionado:", file.name);
      window.uploadDocsStore.add(doc);
      renderUploadedDocs();
    };
  }
  var bindUploadAreaBehaviour = () => {
    console.log("@setupUploadArea | bindUploadAreaBehaviour");
    document.getElementById("file-upload").addEventListener("change", function(event) {
      const file = event.target.files[0];
      if (file) {
        console.log("Arquivo selecionado:", file.name);
      }
    });
  };
  var setupUploadArea = () => {
    console.log("@setupUploadArea");
    window.triggerUpload = triggerUpload;
    bindUploadAreaBehaviour();
  };

  // src/js/sidemenu/index.js
  var toggleSideMenu = (showMenu) => {
    const sideMenu = $(`#sidemenu`);
    const sideMenuDisplay = sideMenu.css("display");
    console.log("sideMenuDisplay: ", sideMenuDisplay);
    if (typeof showMenu !== "undefined") {
      const newDisplay2 = showMenu ? "block" : "none";
      sideMenu.css("display", newDisplay2);
      return;
    }
    const newDisplay = sideMenuDisplay === "block" ? "none" : "block";
    sideMenu.css("display", newDisplay);
  };
  var setupSideMenu = () => {
    console.log("@setupSideMenu");
    window.toggleSideMenu = toggleSideMenu;
  };

  // src/js/stores/pageStore.js
  function createPageStore(initialValue = null) {
    let currentPage = initialValue;
    function get() {
      return currentPage;
    }
    function set(newPage) {
      currentPage = newPage;
    }
    return {
      get,
      set
    };
  }

  // src/js/stores/stepperProgressStore.js
  var defaultStepperProgress = {
    step1: false,
    step2: false,
    step3: false,
    step4: false
  };
  function createStepperProgressStore() {
    const session = useSessionStorage("stepperProgress", defaultStepperProgress);
    function get() {
      return session.get();
    }
    function setStep(stepKey, value) {
      const current = session.get();
      const updated = { ...current, [stepKey]: value };
      session.set(updated);
    }
    function reset() {
      session.set(defaultStepperProgress);
    }
    return {
      get,
      setStep,
      reset
    };
  }

  // src/js/pageLoader/stepperNodeToPageMapper.js
  var stepperNodeToPageMapper = {
    step1: PageEnum.UPLOAD_DOCS,
    // Step 1 → Upload documents page
    step2: PageEnum.RECIPIENT_REGISTRATION,
    // Step 2 → Home logged-in page
    step3: PageEnum.SELFIE_BIOMETRY,
    // Step 3 → Home logged-in page (for now, you can adjust later)
    step4: PageEnum.DOCUMENT_SIGNATURE
    // Step 4 → Home logged-in page (for now, you can adjust later)
  };

  // src/js/pageLoader/pageRouteMapper.js
  var pageRouteMapper = {
    // HOME_LOGGED_OUT: '/home',
    // HOME_LOGGED_IN: '/home-logged-in',
    // HOME_UNAUTHENTICATED: '/signup',
    // [PageEnum.HOME_LOGGED_OUT]: '/home',
    [PageEnum.HOME_UNAUTHENTICATED]: "/home",
    [PageEnum.HOME_LOGGED_IN]: "/home-logged-in",
    [PageEnum.UPLOAD_DOCS]: "/upload-docs",
    [PageEnum.RECIPIENT_REGISTRATION]: "/recipient-registration",
    [PageEnum.SELFIE_BIOMETRY]: "/selfie-biometry",
    [PageEnum.DOCUMENT_SIGNATURE]: "/document-signature"
  };

  // src/js/stepper/triggerClickableStepper.js
  var triggerClickableStepper = async (event) => {
    console.log("@triggerClickableStepper");
    console.log("@triggerClickableStepper | event: ", event);
    const stepperItem = event.target.closest(".stepper_item");
    console.log("@triggerClickableStepper | stepperItem: ", stepperItem);
    if (stepperItem.classList.value.includes("stepper_item--clickable")) {
      const dataStepKey = stepperItem.getAttribute("data-step-key");
      const stepKey = `step${dataStepKey}`;
      console.log("@setupStepperClickListeners | CLICKED | data-step-key" + stepKey);
      if (stepKey && stepperNodeToPageMapper[stepKey]) {
        const pageEnumKey = stepperNodeToPageMapper[stepKey];
        if (pageEnumKey) {
          await navigation().navigate(pageEnumKey);
          if (pageEnumKey === PageEnum.UPLOAD_DOCS) {
            await delayByMs(3e3);
            renderUploadedDocs2();
          }
        }
      }
    }
  };

  // src/js/stepper/index.js
  var setupStepper = async () => {
    console.log("@setupStepper");
    window.triggerClickableStepper = triggerClickableStepper;
  };

  // src/js/stores/uploadDocsStore.js
  var defaultDocs = [];
  function createUploadDocsStore() {
    const session = useSessionStorage("uploadedDocs", defaultDocs);
    function get() {
      return session.get();
    }
    function set(value) {
      session.set(value);
    }
    function add(doc) {
      const current = session.get();
      const updated = [...current, doc];
      session.set(updated);
    }
    function clear() {
      session.set([]);
    }
    return {
      get,
      set,
      add,
      clear
    };
  }

  // src/js/docdetails/index.js
  function getSelectedDocIndex() {
    const selected = document.querySelector(".uploaddocs_action-item--selected");
    return selected ? Number(selected.getAttribute("data-doc-key")) : -1;
  }
  function showDocDetails2(doc) {
    const panel = document.getElementById("docdetails-panel");
    document.getElementById("docdetails-title").textContent = "Detalhe do documento";
    document.getElementById("doc_name").value = doc.name || "";
    document.querySelector(".docdetails-panel .uploaddocs_doc-tag").textContent = doc.tag || "doc";
    document.getElementById("doc_request_name").value = doc.request || "";
    panel.classList.remove("hidden");
    const uploadarea = document.querySelector(".uploadarea");
    uploadarea.classList.add("hidden");
  }
  function hideDocDetails(doc) {
    const panel = document.getElementById("docdetails-panel");
    panel.classList.add("hidden");
    const uploadarea = document.querySelector(".uploadarea");
    uploadarea.classList.remove("hidden");
  }
  function handleSaveDoc() {
    const name = document.getElementById("doc_name").value;
    const request = document.getElementById("doc_request_name").value;
    const docs = window.uploadDocsStore.get();
    const selectedIndex = getSelectedDocIndex();
    const doc = docs[selectedIndex];
    docs[selectedIndex] = { ...doc, name, request };
    window.uploadDocsStore.set(docs);
    renderUploadedDocs();
    hideDocDetails();
  }
  function handleDeleteDoc() {
    const docs = window.uploadDocsStore.get();
    const selectedIndex = getSelectedDocIndex();
    docs.splice(selectedIndex, 1);
    window.uploadDocsStore.set(docs);
    renderUploadedDocs();
    document.getElementById("docdetails-panel").classList.add("hidden");
    hideDocDetails();
  }
  var setupDocDetails = async () => {
    console.log("@setupDocDetails");
    window.showDocDetails = showDocDetails2;
    window.hideDocDetails = hideDocDetails;
    window.handleSaveDoc = handleSaveDoc;
    window.handleDeleteDoc = handleDeleteDoc;
    window.getSelectedDocIndex = getSelectedDocIndex;
  };

  // src/js/documentsignature/index.js
  var setupDocumentSignature = async () => {
    console.log("@setupDocumentSignature");
  };

  // src/js/main/index.js
  var navigator4 = navigation();
  var setupMain = async () => {
    console.log("@main");
    window.pageStore = createPageStore();
    window.stepDataStore = useSessionStorage(SESSION_KEYS.STEP_DATA, defaultSessionData);
    window.viewportStore = useSessionStorage(SESSION_KEYS.VIEWPORT, defaultViewData.viewport);
    window.viewportStore.set("DESKTOP");
    const stepperProgress = createStepperProgressStore();
    window.stepperProgress = stepperProgress;
    const uploadDocsStore = createUploadDocsStore();
    window.uploadDocsStore = uploadDocsStore;
    await delayByMs(1e3);
    setupForms();
    setupModals();
    setupUploadArea();
    setupUploadDocs();
    setupSideMenu();
    setupStepper();
    setupGeneralNavigations();
    setupDocDetails();
    setupDocumentSignature();
    window.addEventListener("hashchange", () => {
      const hash = navigator4.getRoute();
      if (hash) {
        navigator4.navigate(hash);
      }
    });
    await autoNavigateOnLoad();
  };
  var main = async () => {
    console.log("@main");
    setupMain();
    await delayByMs(1500);
    toggleLoader();
  };

  // src/js/index.js
  $(document).ready(async function() {
    main();
  });
})();
