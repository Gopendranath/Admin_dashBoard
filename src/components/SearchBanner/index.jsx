import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSelectedMembers, setSearchTerm } from '../../features/membersSlice';
// import DeleteConfirmModal from './DeleteConfirmModal';
import { FiSearch, FiTrash2 } from 'react-icons/fi';

const Index = () => {
  const dispatch = useDispatch();
  const { selectedMember, searchTerm } = useSelector((state) => state.members);
  // const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState(searchTerm);

  // const openModal = () => {
  //   if (selectedMember.length > 0) {
  //     setShowModal(true);
  //   }
  // };
  // const closeModal = () => setShowModal(false);

  const handleDelete = () => {
    dispatch(deleteSelectedMembers());
    // closeModal();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    dispatch(setSearchTerm(inputValue));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 md:p-5 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4 rounded-lg border border-slate-200">
        {/* Search Input Section */}
        <div className="flex w-full gap-2 items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email or role..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              aria-label="Search input"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              title='Search input'
            />
          </div>
          <button
            className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-sm text-sm font-medium min-w-[90px]"
            aria-label="Search button"
            onClick={handleSearch}
            title='Search button'
          >
            Search
          </button>
        </div>

        {/* Action Buttons */}
        {/* <div className="flex w-full md:w-auto justify-end">
          <button
            className={`bg-red-500 text-white flex items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-red-600 transition duration-200 shadow-sm text-sm font-medium ${
              selectedMember.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            } `}
            aria-label="Delete selected members"
            onClick={handleDelete}
            disabled={selectedMember.length === 0}
            title='Delete selected members'
          >
            <FiTrash2 className="h-4 w-4" />
            Delete ({selectedMember.length})
          </button>
        </div> */}
      </div>

      {/* Confirmation Modal */}
      {/* <DeleteConfirmModal 
        isOpen={showModal} 
        onClose={closeModal} 
        onConfirm={handleDelete}
        message={`This process is irreversible. Do you want to delete ${selectedMember.length} selected member(s)?`}
      /> */}
    </>
  );
};

export default Index;