
function hideCodeContainers() {
  // Hide/clear all code containers at the bottom of the page
  const eventRequestEl = document.getElementById("event-request-el");
  if (eventRequestEl) eventRequestEl.textContent = "";
  const eventResponseEl = document.getElementById("event-response-el");
  if (eventResponseEl) eventResponseEl.textContent = "";
  const rtiRequestContainer = document.getElementById("rti-request-container");
  if (rtiRequestContainer) rtiRequestContainer.textContent = "";
  const rtiResponseContainer = document.getElementById("rti-response-container");
  if (rtiResponseContainer) rtiResponseContainer.textContent = "";
  const rtiRequestDiv = document.getElementById("cheq-rti-request-subscribe");
  if (rtiRequestDiv) rtiRequestDiv.style.display = "none";
  const rtiResponseDiv = document.getElementById("cheq-rti-response-subscribe");
  if (rtiResponseDiv) rtiResponseDiv.style.display = "none";
}

function openTab(event, tabId) {
  const tabContent = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  const tabButtons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].className = tabButtons[i].className.replace(" active", "");
  }

  if (document.getElementById(tabId).id === "tab-defend") {
    document.getElementById(tabId).style.display = "block";
  } else {
    document.getElementById(tabId).style.display = "flex";
  }
  event.currentTarget.className += " active";
  hideCodeContainers();
}

function copyToClipboard() {
  var text = document.getElementById("user-agent-string").innerText;

  navigator.clipboard.writeText(text);
}
