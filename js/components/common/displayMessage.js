export function displayMessage(messageType, message, targetContainer) {
  const container = document.querySelector(targetContainer);

  container.innerHTML = `<div class="${messageType}">${message}<div/>`;
}
