import { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./Pagination";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch("https://dummyjson.com/products?limit=100");
      let data = await res.json();
      if (data) {
        setProducts(data.products);
      }
    };
    fetchData();
  }, []);

  const setPageHandler = (toBeSetPage) => {
    // the page to set can only lie b/w 1 and 10 here
    if (
      toBeSetPage >= 1 &&
      toBeSetPage <= products.length / 10 &&
      toBeSetPage !== page
    ) {
      setPage(toBeSetPage);
    }
  };
  return (
    <div className="app">
      <div className="products-container">
        {products &&
          products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <div className="product-card">
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </div>
            );
          })}
      </div>
      <Pagination
        page={page}
        setPageHandler={setPageHandler}
        products={products}
      />
    </div>
  );
}

export default App;
