import React from 'react'
import './HomePage.css'
import InputFileUpload from '../assets/components/UploadFile'
import ButtonAppBar from '../assets/components/Navbar'
import BasicSelect from '../assets/components/SelectDept'
import DisableElevation from '../assets/components/Button'

const HomePage = () => {
  return (
    <div className="HomepageContainer">
        <div className="Navbar">
            <ButtonAppBar />
        </div>
        <div className="Filter">
           <div className="Filterleft">
           <BasicSelect />
           </div>
           <div className="Filterright">
           <DisableElevation />
           </div>
        </div>
        <div className="Details">

        </div>
        <div className="Upload">

        </div>
    </div>
  )
}

export default HomePage