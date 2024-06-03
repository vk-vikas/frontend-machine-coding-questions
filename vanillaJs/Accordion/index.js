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

document.addEventListener("DOMContentLoaded", function (params) {
  let defaultAccordion = 1;
  const accordionContainerElement = document.querySelector(
    ".accordion-container"
  );

  dummyArr.forEach((element, index) => {
    // create the entire accordion element
    const accordionItem = document.createElement("div");
    accordionItem.classList.add("accordion-item");

    // create the header part
    const accordionHeader = document.createElement("div");
    accordionHeader.classList.add("accordion-header");
    accordionHeader.textContent = element.title;

    const accordionContent = document.createElement("div");
    accordionContent.classList.add("accordion-content");
    accordionContent.innerHTML = `<p>${element.data}</p>`;

    // building up the accordion element
    accordionItem.appendChild(accordionHeader);
    accordionItem.appendChild(accordionContent);
    accordionContainerElement.appendChild(accordionItem);

    // on render setting the default accordion as active
    if (index === defaultAccordion) {
      accordionItem.classList.add("active");
    }

    accordionContainerElement.addEventListener("click", function (event) {
      // we select the header on which click was peformed
      /*
      closest() traverses the element and its parents (heading toward the document root) until it finds a node that matches the specified CSS selector.
       */
      const header = event.target.closest(".accordion-header");

      if (!header) return;

      const clickedAccordionITem = event.target.parentNode;
      const isActive = clickedAccordionITem.classList.contains("active");

      document.querySelectorAll(".accordion-item").forEach((element) => {
        element.classList.remove("active");
      });

      // if already open we want to close, so will not add this active class once
      // it has been removed from all accordion by the above line of code
      if (!isActive) {
        clickedAccordionITem.classList.add("active");
      }
    });
  });
});
