# SAFE•SIGN – Interface Fintech

This is the front-end interface PROTOTYPE for the SafeSign digital document platform. It includes multiple flows such as document upload, recipient registration, selfie validation for biometrics, and document signature (and its sharing).

## 💡 Highlights

- **Fully client-side:** No server or backend dependency.
- **ES modules during development, and bundled single-file build for delivery.**
- **Pure HTML + CSS + JS**, no frameworks.
- **Modular architecture:** Each step/page is isolated and handled by its own script.

---

## 📁 Project Structure

index.html
./src
├── assets
│   ├── 2.2.2. Home _ Assinantes
│   │   └── ALL block _ Assinantes
│   ├── avatar-picture.png
│   ├── doc-thumb-picture-1.png
│   ├── eye-icon.svg
│   ├── face-recognition-picture.png
│   ├── facebook-icon.svg
│   ├── four-dashes-rounded-border-mask.svg
│   ├── google-icon.svg
│   ├── logo _ vertical.svg
│   ├── plus-lg-icon.svg
│   ├── safesign-logo-vertical.svg
│   ├── safesign-logo.svg
│   ├── selfie-girl-picture.png
│   ├── signature-draw-fulano-picture.png
│   ├── social_facebook.svg
│   ├── social_instagram.svg
│   ├── social_twitter.svg
│   ├── step-active-1.svg
│   ├── step-active-2.svg
│   ├── step-active-3.svg
│   ├── step-active-4.svg
│   ├── step-inactive-1.svg
│   ├── step-inactive-2.svg
│   ├── step-inactive-3.svg
│   ├── step-inactive-4.svg
│   ├── step-lg-active-1.svg
│   ├── step-lg-active-2.svg
│   ├── step-lg-active-3.svg
│   ├── step-lg-active-4.svg
│   ├── step-sm-active-1.svg
│   ├── step-sm-active-2.svg
│   ├── step-sm-active-3.svg
│   ├── step-sm-active-4.svg
│   ├── three-dots.svg
│   ├── three-traces-icon.svg
│   ├── upload-picture.png
│   ├── upload-picture.svg
│   ├── warning-circle-icon.svg
│   ├── x-icon-2.svg
│   └── x-icon.svg
├── components
│   ├── header-logged-in
│   │   └── header-logged-in.html
│   ├── header-logged-in.html
│   ├── header-logged-out.hml
│   ├── header-logged-out.html
│   ├── home-summary.html
│   ├── main-logo.html
│   └── main-picture.html
├── js
│   ├── data
│   │   ├── defaults.js
│   │   ├── enums.js
│   │   ├── index.js
│   │   └── sessionKeys.js
│   ├── docdetails
│   │   └── index.js
│   ├── documentsignature
│   │   └── index.js
│   ├── forms
│   │   └── index.js
│   ├── global
│   │   └── generalNavigations.js
│   ├── helpers
│   │   ├── delayByMs.js
│   │   ├── useSessionStorage.first.js
│   │   ├── useSessionStorage.js
│   │   ├── useSessionStorage.second.js
│   │   └── useSessionStorage.third.js
│   ├── index.js
│   ├── loader
│   │   └── index.js
│   ├── main
│   │   ├── autoNavigateOnLoad.js
│   │   └── index.js
│   ├── modals
│   │   └── index.js
│   ├── pageLoader
│   │   ├── index.js
│   │   ├── navigation.js
│   │   ├── pageRouteMapper.js
│   │   ├── pageSourceMapper.js
│   │   └── stepperNodeToPageMapper.js
│   ├── sidemenu
│   │   └── index.js
│   ├── stepper
│   │   ├── index.js
│   │   ├── triggerClickableStepper.js
│   │   └── updateStepperVisual.js
│   ├── stores
│   │   ├── pageStore.js
│   │   ├── stepperProgressStore.js
│   │   └── uploadDocsStore.js
│   ├── transitions
│   │   └── index.js
│   ├── uploadarea
│   │   └── index.js
│   └── uploaddocs
│       └── index.js
├── pages
│   ├── document-signature.html
│   ├── home-logged-in.html
│   ├── home-unauthenticated.html
│   ├── recipient-registration.html
│   ├── selfie-biometry.html
│   └── upload-docs.html
└── styles
    ├── _index.css
    ├── components
    │   ├── _index.css
    │   ├── action.css
    │   ├── button.css
    │   ├── docdetails.css
    │   ├── footer.css
    │   ├── forms.css
    │   ├── header.css
    │   ├── heading.css
    │   ├── how-it-works.css
    │   ├── loader.css
    │   ├── modal.css
    │   ├── overlay.css
    │   ├── pagination.css
    │   ├── profile.css
    │   ├── propaganda.css
    │   ├── radio.css
    │   ├── recipient-registration.css
    │   ├── selfie.css
    │   ├── sidemenu.css
    │   ├── slogan-strap.css
    │   ├── stepper.css
    │   ├── uploadarea.css
    │   └── uploaddocs.css
    ├── fonts
    │   └── index.css
    ├── main.css
    ├── reset
    │   └── index.css
    └── variables
        └── index.css


---

## 🚀 Getting Started

### 🔃 Running with a dev server (LIVE-SERVER)

You'll get full support for ES Modules and routing, allowing to effectively see the prototype.

```bash
npm install
npm start
