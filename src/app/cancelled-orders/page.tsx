"use client"


import Cancelled_Orders from '@/components/main/orders-and-transactions/Cancelled_Orders'
import React from 'react'

const CancelledOrders = () => {
  return (
    <>
        <div className='ml-[16rem]'>
            <Cancelled_Orders />
        </div>
    </>
  )
}

export default CancelledOrders