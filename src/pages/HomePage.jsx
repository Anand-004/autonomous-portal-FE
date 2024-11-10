import React from 'react'
import './HomePage.css'
import InputFileUpload from '../assets/components/UploadFile'
import ButtonAppBar from '../assets/components/Navbar'
import BasicSelect from '../assets/components/SelectDept'
import DisableElevation from '../assets/components/Button'
import Divider from '@mui/material/Divider';
import CustomizedTables from '../assets/components/Details'

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
        <Divider component="li" />
        <div className="Detailscont">
            <div className="Details">
               <CustomizedTables/>
            </div>
        </div>
        <div className="Upload">

        </div>
    </div>
  )
}

export default HomePage