import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import icons from "../ultils/icons";

const Pagination = ({ pageCount, handlePageClick }) => {
  const { GrNext, GrPrevious } = icons;
  return (
    <div className="item__page">
      <ReactPaginate
        breakLabel="..."
        nextLabel=<GrNext />
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        pageSize={3}
        previousLabel=<GrPrevious />
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
