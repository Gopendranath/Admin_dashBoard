import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMember, updateMember } from '../../features/membersSlice';
import { FiEdit, FiSave, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const List = ({ item, isSelected, onSelect }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState({});

  useEffect(() => {
    if (isEditing) {
      setEditedMember(item);
    }
  }, [isEditing, item]);

  const handleDelete = () => {
    dispatch(deleteMember(item.id));
    setIsEditing(false);
    toast.success('Member deleted successfully');
  };

  const handleEditToggle = () => {
    if (isEditing) {
      dispatch(updateMember(editedMember));
      toast.success('Member updated successfully');
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMember((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className={`grid grid-cols-[1fr_1fr_2fr_1fr] lg:grid-cols-[1fr_2fr_3fr_1fr_1fr] border-2 m-1 gap-4 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 ${
        isSelected ? 'bg-gray-200 border-2 border-gray-400' : ''
      }`}
    >
      <div className="truncate flex items-center" title={item.id} aria-label={item.id}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="h-5 w-5 rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out mx-2 hover:cursor-pointer hover:border-gray-400 peer"
          aria-label="Select member"
          title="Select member"
        />
        {item.id}
      </div>
      <div className="truncate flex items-center" title={item.name} aria-label={item.name}>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedMember.name}
            onChange={handleChange}
            className="p-1 border rounded w-full"
          />
        ) : (
          item.name
        )}
      </div>
      <div className="truncate flex items-center" title={item.email} aria-label={item.email}>
        {isEditing ? (
          <input
            type="text"
            name="email"
            value={editedMember.email}
            onChange={handleChange}
            className="p-1 border rounded w-full"
          />
        ) : (
          item.email
        )}
      </div>
      <div className="truncate flex items-center" title={item.role} aria-label={item.role}>
        {isEditing ? (
          <input
            type="text"
            name="role"
            value={editedMember.role}
            onChange={handleChange}
            className="p-1 border rounded w-full"
          />
        ) : (
          item.role
        )}
      </div>
      <div className="flex space-x-2 justify-end col-span-5 lg:col-span-1" aria-label="Actions" title="Actions">
        <button
          className={`bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 transition ${
            isEditing ? 'bg-green-600 hover:bg-green-700' : ''
          }`}
          title={isEditing ? 'Save' : 'Edit'}
          onClick={handleEditToggle}
        >
          {isEditing ? <FiSave size={16} /> : <FiEdit size={16} />}
        </button>
        <button 
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
          title="Delete"
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default List;