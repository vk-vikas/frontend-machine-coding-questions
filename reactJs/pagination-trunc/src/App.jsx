import { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./components/Pagination";

// constansts
const numOfProductsPerPage = 10;
const maxVisiblePagesInUI = 5;

function App() {
  const [products, setProducts] = useState([]);
  // page is the current page number
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${numOfProductsPerPage}&skip=${
        page * numOfProductsPerPage - numOfProductsPerPage
      }`
    );
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
      // setting total pages
      setTotalPages(Math.ceil(data.total / numOfProductsPerPage));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} /> {/* alt is imp */}
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {products.length > 0 && (
        <Pagination
          products={products}
          page={page}
          setPage={setPage}
          maxVisiblePagesInUI={maxVisiblePagesInUI}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

export default App;
