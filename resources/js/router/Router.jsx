import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Index from '../components/products/Index'
import NotFound from '../components/products/NotFound'
import EditProduct from '../components/products/Edit'
import NewProduct from '../components/products/New'

const Router = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path='/product/new' element={<NewProduct />} />
            <Route path='/product/edit/:id' element={<EditProduct />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    </div>
  )
}

export default Router