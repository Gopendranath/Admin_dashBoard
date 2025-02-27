import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMemberSelection } from '../../features/membersSlice';

const Index = () => {
  const dispatch = useDispatch();
  const { filteredData, currentPage, itemsPerPage, selectedMember } = useSelector((state) => state.members);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Check if all current items are selected
  const areAllSelected = () => {
    return currentItems.every(item => selectedMember.includes(item.id));
  };

  // Handle checkbox change
  const handleOnSelected = (e) => {
    const shouldSelect = e.target.checked;
    currentItems.forEach(item => {
      const isCurrentlySelected = selectedMember.includes(item.id);
      if (shouldSelect && !isCurrentlySelected) {
        // Only dispatch if item isn't already selected
        dispatch(toggleMemberSelection(item.id));
      } else if (!shouldSelect && isCurrentlySelected) {
        // Only dispatch if item is currently selected
        dispatch(toggleMemberSelection(item.id));
      }
    });
  };

  const idCheckbox = (
    <div className="truncate flex items-center">
      <input
        type="checkbox"
        checked={currentItems.length > 0 && areAllSelected()}
        onChange={handleOnSelected}
        className="h-5 w-5 rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out mx-2 hover:cursor-pointer hover:border-indigo-400 peer"
        aria-label="Select all members on page"
        title="Select all members on page"
      />
      <div aria-label='Select members' title='Select members'>
        Id
      </div>
    </div>
  );
  
  const headers = [idCheckbox, 'Name', 'Email', 'Role', 'Action'];
  
  return (
    <div className="grid grid-cols-[1fr_1fr_2fr_1fr] lg:grid-cols-[1fr_2fr_3fr_1fr_1fr] gap-4 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg shadow-sm border border-slate-200">
      {headers.map((header) => {
        const baseClasses = "font-medium text-sm tracking-wide text-slate-700 capitalize flex items-center";
        
        const headerStyles = {
          '#': `${baseClasses}`,
          'Name': `${baseClasses}`,
          'Email': `${baseClasses}`,
          'Role': `${baseClasses}`,
          'Action': `${baseClasses} hidden lg:flex justify-end`,
        };

        return (
          <div key={header} className={headerStyles[header]}>
            {header === 'Action' ? (
              <div className="px-2" title={header}>{header}</div>
            ) : (
              <div className="flex items-center gap-1" title={header}>
                {header}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Index;