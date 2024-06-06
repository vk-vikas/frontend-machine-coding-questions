document.addEventListener("DOMContentLoaded", function (params) {
  let productsArray = [];
  let page = 1;
  const appElement = document.querySelector(".app");

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=100");
      const data = await response.json();

      // if we got the data save it and call render
      console.log(data);
      if (data && data.products) {
        productsArray = data.products;
        console.log(productsArray);
        render();
      }
    } catch (error) {
      console.log(error);
    }
  };

  function render() {
    // create our container that holds all the product cards
    const productsContainerElement = document.createElement("div");
    productsContainerElement.classList.add("products-container");
    let paginationElement = null;

    if (productsArray.length > 0) {
      // 1*10-10 is 0, 1*10 is 10 and so on
      productsArray.slice(page * 10 - 10, page * 10).forEach((prod) => {
        const productCardElement = document.createElement("div");
        productCardElement.classList.add("product-card");
        productCardElement.innerHTML = `
            <img src="${prod.thumbnail}" alt="${prod.title}" />
            <span>${prod.title}</span>
            `;

        productsContainerElement.appendChild(productCardElement);
      });

      // render <- 1234.. ->
      paginationElement = document.createElement("div");
      paginationElement.classList.add("pagination");

      // create prev btn and render it in dom
      if (page > 1) {
        const prevButton = createPaginationButton("<-", () => {
          selectPageHandler(page - 1);
        });
        paginationElement.appendChild(prevButton);
      }

      // create the number btns 1234...
      for (let i = 0; i < productsArray.length / 10; i++) {
        const pageNumberButton = createPaginationButton(
          i + 1,
          () => {
            selectPageHandler(i + 1);
          },
          // isSelected flag, while looping find selected page
          page === i + 1
        );
        paginationElement.appendChild(pageNumberButton);
      }

      if (page < productsArray.length / 10) {
        const nextButton = createPaginationButton("->", () => {
          selectPageHandler(page + 1);
        });
        paginationElement.appendChild(nextButton);
      }
    }
    appElement.appendChild(productsContainerElement);
    appElement.appendChild(paginationElement);
  }

  function createPaginationButton(btnText, cb, isSelected = false) {
    const btnElement = document.createElement("button");
    btnElement.innerText = btnText;
    btnElement.classList.add("pagination-btn");
    btnElement.addEventListener("click", () => {
      cb();
    });
    if (isSelected) {
      console.log(btnText);
      // css specificity is very imp here, otherwise this wont apply
      btnElement.classList.add("selected");
    }
    return btnElement;
  }

  function selectPageHandler(newPageValue) {
    // newPageValue should be valid
    if (
      newPageValue >= 1 &&
      newPageValue <= productsArray.length / 10 &&
      newPageValue !== page
    ) {
      appElement.innerHTML = "";
      page = newPageValue;
      render();
    }
  }

  fetchProducts();
});
