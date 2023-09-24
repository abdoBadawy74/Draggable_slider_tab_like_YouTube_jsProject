const tabsBox = document.querySelector(".tabs-box"),
  allTabs = document.querySelectorAll(".tab"),
  arrowIcons = document.querySelectorAll(".icon i");

const handleIcons = () => {
  let scrollVal = Math.round(tabsBox.scrollLeft);
  let maxScrollWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
  arrowIcons[0].parentElement.style.display = scrollVal > 0 ? "flex" : "none";
  arrowIcons[1].parentElement.style.display =
    maxScrollWidth > scrollVal ? "flex" : "none";
};

let isDragging = false;

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    // if clicked icon is left, reduce 350 from tabsBox scrollLeft else add
    tabsBox.scrollLeft += icon.id === "left" ? -350 : 350;
    setTimeout(() => handleIcons(), 50); // calling handleIcons() after 50 miliSecond
  });
});

allTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabsBox.querySelector(".active").classList.remove("active")
    tab.classList.add("active")
  });
});

const dragging = (e) => {
  if (!isDragging) return;
  tabsBox.classList.add("dragging");
  tabsBox.scrollLeft -= e.movementX;
  handleIcons();
};

const dragStop = () => {
  isDragging = false;
  tabsBox.classList.remove("dragging");
};

tabsBox.addEventListener("mousedown", () => (isDragging = true));
tabsBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
