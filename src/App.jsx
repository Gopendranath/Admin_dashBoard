import React from 'react'
import Name from './components/Name'
import SearchBanner from './components/SearchBanner'
import Headers from './components/Header'
import Listbox from './components/Listbox'
import Pagination from './components/Pagination'
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-1 gap-2'>
        <Name />
        <SearchBanner />
        <Headers />
        <Listbox />
        <Pagination />
      </div>
      <Toaster />
    </div>
  )
}

export default App