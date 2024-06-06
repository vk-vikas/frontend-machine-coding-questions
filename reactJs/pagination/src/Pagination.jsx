import React from "react";

const Pagination = ({ page, setPageHandler, products }) => {
  return (
    <div className="pagination">
      <button onClick={() => setPageHandler(page - 1)}>prev</button>
      {[...Array(products.length / 10)].map((_, index) => {
        return (
          <button
            className={page === index + 1 ? "active" : ""}
            key={index}
            onClick={() => setPageHandler(index + 1)}
          >
            {index + 1}
          </button>
        );
      })}
      <button onClick={() => setPageHandler(page + 1)}>next</button>
    </div>
  );
};

export default Pagination;
