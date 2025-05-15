import React from 'react'
import DashboarPage from './dashboard/page'
import { redirect } from 'next/navigation'

const page = () => {
  return redirect('/dashboard')
}

export default page