import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage, deleteSelectedMembers } from '../../features/membersSlice';
import { FiTrash2 } from 'react-icons/fi';

const Pagination = () => {
    const dispatch = useDispatch();
    const { data, filteredData, currentPage, itemsPerPage, selectedMember } = useSelector((state) => state.members);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            dispatch(setCurrentPage(page));
        }
    };

    const handleDelete = () => {
        dispatch(deleteSelectedMembers());
    };

    const renderPageButtons = () => {
        // Handle large number of pages with ellipsis
        const MAX_VISIBLE_PAGES = 3; // Increased for better visibility
        const pageNumbers = [];

        if (totalPages <= MAX_VISIBLE_PAGES) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show first page
            pageNumbers.push(1);

            // Calculate middle range based on current page
            const leftSiblingCount = Math.floor((MAX_VISIBLE_PAGES - 3) / 2); // -3 for first, last, and current
            const rightSiblingCount = Math.ceil((MAX_VISIBLE_PAGES - 3) / 2);

            const startPage = Math.max(2, currentPage - leftSiblingCount);
            const endPage = Math.min(totalPages - 1, currentPage + rightSiblingCount);

            // Add ellipsis before middle range if needed
            if (startPage > 2) {
                pageNumbers.push('...');
            }

            // Add middle range
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            // Add ellipsis after middle range if needed
            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }

            // Always show last page
            pageNumbers.push(totalPages);
        }

        return pageNumbers.map((page, index) => {
            if (page === '...') {
                return (
                    <span key={`ellipsis-${index}`} className="px-3 py-1 sm:px-4 sm:py-2">
                        {page}
                    </span>
                );
            }

            return (
                <button
                    key={`page-${page}`}
                    className={`px-3 py-1 sm:px-4 sm:py-2 rounded transition font-bold ${currentPage === page
                        ? 'bg-indigo-600 text-white'
                        : 'bg-blue-200 text-black hover:bg-indigo-700 hover:text-white'
                        }`}
                    onClick={() => handlePageChange(page)}
                    title={`Go to page ${page}`}
                >
                    {page}
                </button>
            );
        });
    };

    if (totalPages <= 1) return (
        <div className="flex flex-col md:flex-row items-center justify-between mt-4">
            <div className="flex w-full md:w-auto justify-center">
                <button
                    className={`bg-red-500 text-white w-9/12 md:w-auto flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-red-600 transition duration-200 shadow-sm text-sm font-medium ${selectedMember.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                        } `}
                    aria-label="Delete selected members"
                    onClick={handleDelete}
                    disabled={selectedMember.length === 0}
                    title='Delete selected members'
                >
                    <FiTrash2 className="h-4 w-4" />
                    Delete ({selectedMember.length})
                </button>
            </div>
        </div>
    ); // If there's only one page, don't show pagination only show the delete button

    return (
        <div className="flex flex-col md:flex-row items-center justify-between mt-4">
            <div className="flex w-full md:w-auto justify-center">
                <button
                    className={`bg-red-500 text-white w-9/12 md:w-auto flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-red-600 transition duration-200 shadow-sm text-sm font-medium ${selectedMember.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                        } `}
                    aria-label="Delete selected members"
                    onClick={handleDelete}
                    disabled={selectedMember.length === 0}
                    title='Delete selected members'
                >
                    <FiTrash2 className="h-4 w-4" />
                    Delete ({selectedMember.length})
                </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4 px-2 sm:px-0">
                <button
                    className={`bg-indigo-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 font-bold ${ totalPages < 3 ? 'hidden' : '' }`}
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    title="Go to first page"
                >
                    {"<<"}
                </button>
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="bg-indigo-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 font-bold"
                    title="Go to previous page"
                >
                    Prev
                </button>

                <div className="flex flex-wrap gap-2">
                    {renderPageButtons()}
                </div>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="bg-indigo-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 font-bold"
                    title="Go to next page"
                >
                    Next
                </button>
                <button
                    className={`bg-indigo-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 font-bold ${ totalPages < 3 ? 'hidden' : '' }`}
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    title="Go to last page"
                >
                    {">>"}
                </button>
            </div>
        </div>
    );
};

export default Pagination;