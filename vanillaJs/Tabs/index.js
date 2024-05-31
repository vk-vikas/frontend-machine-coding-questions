const dummyArr = [
  {
    id: "#title1",
    title: "title 1",
    data: "some data about tab 1",
  },
  {
    id: "#title2",
    title: "title 2",
    data: "some data about tab 2",
  },
  {
    id: "#title3",
    title: "title 3",
    data: "some data about tab 3",
  },
];

document.addEventListener("DOMContentLoaded", function (event) {
  let defaultTabId = dummyArr[1].id;
  let activeTabId = defaultTabId;

  const tabContainerElement = document.querySelector("#tab-container");
  const tabContentContainerElement = document.querySelector(
    "#tab-content-container"
  );

  function renderTabs() {
    dummyArr.map((ele) => {
      let tabItem = document.createElement("button");
      tabItem.innerText = ele.title;
      tabItem.className = "tab-item";

      // approach 1: setting our custom attribute rather than just assigning the id to id property of element
      tabItem.setAttribute("key", ele.id);
      tabContainerElement.appendChild(tabItem);
    });
  }

  function renderContent() {
    dummyArr.forEach(function (ele) {
      let tabContentItem = document.createElement("div");
      tabContentItem.innerHTML = `<h2>${ele.title}</h2><p>${ele.data}</p>`;
      tabContentItem.className = "tab-content-item";

      // approach 2: setting normally the id for unique identification (not creating our own attribute)
      tabContentItem.id = ele.id;
      tabContentContainerElement.appendChild(tabContentItem);
    });
  }

  // render the tabs as well as the content for all tabs( display will be none for non active )
  renderTabs();
  renderContent();
  // render the default tab on intial render
  document
    .querySelector(`button[key="${activeTabId}"]`)
    .classList.add("active");
  document.getElementById(activeTabId).classList.add("active");

  /* ----------------------------------------------------------- */

  // open tab on click
  tabContainerElement.addEventListener("click", function (event) {
    // getting which is the active tab
    activeTabId = event.target.getAttribute("key");
    console.log(event.target.getAttribute("key"));
    openTab(activeTabId);
  });

  function openTab(activeTabId) {
    const allTabs = document.querySelectorAll(".tab-item");
    const allTabContent = document.querySelectorAll(".tab-content-item");

    // looping over and removing the active class
    allTabs.forEach((element) => element.classList.remove("active"));
    allTabContent.forEach((element) => element.classList.remove("active"));

    // now adding active class to the element we want to display
    /*
     * again depending upon wether we stored id in our uniqure attribute or just in the id attribute already present
     * the mwthod to access it below differs
     */
    document
      .querySelector(`button[key="${activeTabId}"]`)
      .classList.add("active");

    document.getElementById(activeTabId).classList.add("active");
  }
});
