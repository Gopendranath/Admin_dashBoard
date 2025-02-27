// Updated membersSlice.js - adding updateMember reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMembers = createAsyncThunk(
  'members/fetchMembers',
  async () => {
    const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
    return response.json();
  }
);

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    data: [],
    filteredData: [],
    searchTerm: '',
    status: 'idle',
    error: null,
    currentPage: 1,
    itemsPerPage: 10,
    selectedMember: [],
    selectMultiMember: [],
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    toggleMemberSelection: (state, action) => {
      const memberId = action.payload;
      const isSelected = state.selectedMember.includes(memberId);
      if (isSelected) {
        state.selectedMember = state.selectedMember.filter((id) => id !== memberId);
      } else {
        state.selectedMember.push(memberId);
      }
    },
    deleteMember: (state, action) => {
      const memberId = action.payload;
      // Remove member from data array
      state.data = state.data.filter(member => member.id !== memberId);
      // Update filtered data as well
      state.filteredData = state.filteredData.filter(member => member.id !== memberId);
      // Remove from selected members if present
      state.selectedMember = state.selectedMember.filter(id => id !== memberId);
      // Adjust currentPage if needed
      const totalItems = state.filteredData.length;
      const maxPage = Math.ceil(totalItems / state.itemsPerPage);
      if (state.currentPage > maxPage && maxPage > 0) {
        state.currentPage = maxPage;
      } else if (totalItems === 0) {
        state.currentPage = 1;
      }
    },
    deleteSelectedMembers: (state) => {
      // Remove all selected members from data
      state.data = state.data.filter(member => !state.selectedMember.includes(member.id));
      // Update filtered data as well
      state.filteredData = state.filteredData.filter(member => !state.selectedMember.includes(member.id));
      // Clear selected members
      state.selectedMember = [];
      // Adjust currentPage if needed
      const totalItems = state.filteredData.length;
      const maxPage = Math.ceil(totalItems / state.itemsPerPage);
      if (state.currentPage > maxPage && maxPage > 0) {
        state.currentPage = maxPage;
      } else if (totalItems === 0) {
        state.currentPage = 1;
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page when searching

      if (action.payload.trim() === '') {
        // If search term is empty, show all data
        state.filteredData = state.data;
      } else {
        // Filter data based on search term
        const term = action.payload.toLowerCase();
        state.filteredData = state.data.filter(member =>
          member.name?.toLowerCase().includes(term) ||
          member.email?.toLowerCase().includes(term) ||
          member.role?.toLowerCase().includes(term) ||
          member.id?.toString().includes(term)
        );
      }
    },
    // New reducer for updating a member
    updateMember: (state, action) => {
      const updatedMember = action.payload;

      // Update in data array
      state.filteredData = state.filteredData.map(member =>
        member.id === updatedMember.id ? updatedMember : member
      );

      // Update in filtered data array
      state.filteredData = state.filteredData.map(member =>
        member.id === updatedMember.id ? updatedMember : member
      );

      // If we're searching, reapply the filter to ensure consistency
      if (state.searchTerm.trim() !== '') {
        const term = state.searchTerm.toLowerCase();
        state.filteredData = state.filteredData.filter(member =>
          member.name?.toLowerCase().includes(term) ||
          member.email?.toLowerCase().includes(term) ||
          member.role?.toLowerCase().includes(term)
        );
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.filteredData = action.payload; // Initialize filtered data with all data
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setCurrentPage,
  toggleMemberSelection,
  deleteMember,
  deleteSelectedMembers,
  setSearchTerm,
  updateMember
} = membersSlice.actions;

export default membersSlice.reducer;