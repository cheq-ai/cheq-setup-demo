function openTab(event, tabId) {
  const tabContent = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  const tabButtons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].className = tabButtons[i].className.replace(
      " active",
      ""
    );
  }

  document.getElementById(tabId).style.display = "block";
  event.currentTarget.className += " active";
}
