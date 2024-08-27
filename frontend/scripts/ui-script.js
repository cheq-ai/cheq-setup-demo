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
}

function copyToClipboard() {
  var text = document.getElementById("user-agent-string").innerText;

  navigator.clipboard.writeText(text);
}
