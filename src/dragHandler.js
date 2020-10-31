let toggleDebugWindowButton;
function toggleDebugWindow() {
  const debugWindow = document.getElementById("debugWindow");
  const collapsed = debugWindow.getAttribute("data-collapsed") === "true";
  debugWindow.setAttribute("data-collapsed", !collapsed);
  toggleDebugWindowButton.innerHTML = collapsed ? "^" : "o";
}

toggleDebugWindowButton = document.getElementById("toggleDebugWindow");
toggleDebugWindowButton.onclick = toggleDebugWindow;
