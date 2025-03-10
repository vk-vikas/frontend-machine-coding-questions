import React from "react";

const Pagination = ({ page, setPage, maxVisiblePagesInUI, totalPages }) => {
  const selectPageHandler = (selectedPage) => {
    // checking wether selected page is valid or not
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  const renderPageKey = (currPage, key) => {
    return (
      <span
        key={key}
        className={page === currPage ? "pagination__selected" : ""}
        onClick={() => selectPageHandler(currPage)}
      >
        {currPage}
      </span>
    );
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= maxVisiblePagesInUI) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageKey(i));
      }
    } else {
      // truncation logic

      // page is the current page,
      // startPage is the first page to be shown in the UI,
      // this algo ensures one thing , that the current page always stays in the middle of the UI
      const startPage = Math.max(1, page - Math.floor(maxVisiblePagesInUI / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePagesInUI - 1);

      if (startPage > 1) {
        // if startPage is greater than 1, only then we need to show ellipsis
        if (startPage > 2) pageNumbers.push(renderPageKey(1));
        pageNumbers.push(renderPageKey("...", "ellipsis-start"));
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(renderPageKey(i));
      }

      if (endPage < totalPages) {
        pageNumbers.push(renderPageKey("...", "ellipsis-end"));
        if (endPage < totalPages - 1)
          pageNumbers.push(renderPageKey(totalPages));
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <span
        onClick={() => selectPageHandler(page - 1)}
        className={page > 1 ? "" : "pagination__disable"}
      >
        ◀
      </span>

      {renderPageNumbers()}

      <span
        onClick={() => selectPageHandler(page + 1)}
        className={page < totalPages ? "" : "pagination__disable"}
      >
        ▶
      </span>
    </div>
  );
};

export default Pagination;
