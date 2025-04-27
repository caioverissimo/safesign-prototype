function fadeOut(element, duration = 300) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = 0;

  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

function fadeIn(element, duration = 300) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = 1;
}