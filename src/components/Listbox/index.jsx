import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMembers, toggleMemberSelection } from '../../features/membersSlice';
import List from './List';
import { FiLoader } from 'react-icons/fi';

const Index = () => {
  const dispatch = useDispatch();
  const { data, filteredData, status, error, currentPage, itemsPerPage, selectedMember } = useSelector((state) => state.members);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMembers());
    }
  }, [status, dispatch]);

  const handleSelect = (id) => {
    dispatch(toggleMemberSelection(id));
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-40 bg-white rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 text-indigo-600">
          <FiLoader className="h-6 w-6 animate-spin" />
          <span className="font-medium">Loading data...</span>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg shadow-sm">
        <div className="flex items-center">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Error: {error}</span>
        </div>
      </div>
    );
  }

  // Use filteredData instead of data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-slate-200">
      {filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50">
          <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No results found</h3>
          <p className="mt-1 text-gray-500">
            No members found matching your search criteria or no data available.
          </p>
        </div>
      ) : (
        <div>
          {currentItems.map((item, index) => (
            <div 
              key={index} 
              className={`${index !== currentItems.length - 1 ? 'border border-gray-100' : ''}`}
            >
              <List
                item={item}
                isSelected={selectedMember.includes(item.id)}
                onSelect={() => handleSelect(item.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;