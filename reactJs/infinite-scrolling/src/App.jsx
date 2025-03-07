import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res = await fetch(
        `https://dummyjson.com/products?limit=${page * 10}`
      );
      let data = await res.json();
      if (data) {
        setProducts(data);
        setPage(page + 1);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    // !loading makes sure that the user doesn't make multiple requests
    {
      /**window.innerHeight: This returns the height of the viewport (the visible part of the webpage).
        document.documentElement.scrollTop: This returns the number of pixels that the document is currently scrolled vertically.
        document.documentElement.offsetHeight: This returns the height of the entire document, including the parts not visible in the viewport. */
    }
    if (
      window.innerHeight + document.documentElement.scrollTop + 500 >
        document.documentElement.offsetHeight &&
      !loading &&
      products.limit < products.total
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const { products: allProducts } = products;
  return (
    <>
      <div>
        <h1>Infinite Scrolling</h1>
        {allProducts?.length > 0 && (
          <div className="products">
            {allProducts?.map((prod) => {
              return (
                <div className="products__single" key={prod.id}>
                  <img src={prod.thumbnail} alt={prod.title} />
                  <span>{prod.title}</span>
                </div>
              );
            })}
          </div>
        )}
        {loading && <p>Loading...</p>}
      </div>
    </>
  );
}

export default App;
