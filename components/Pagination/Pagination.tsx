'use client';

import ReactPaginate from 'react-paginate';

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: {
  pageCount: number;
  currentPage: number;
  onPageChange: (e: { selected: number }) => void;
}) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={onPageChange}
    />
  );
}