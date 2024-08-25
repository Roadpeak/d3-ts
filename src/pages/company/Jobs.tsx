import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import JobList from './JobList'

const Jobs = () => {
  return (
    <div>
        <Navbar />
        <JobList />
        <Footer />
        
    </div>
  )
}

export default Jobs