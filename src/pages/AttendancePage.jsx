import React from 'react'
import ButtonAppBar from '../assets/components/Navbar2'
import './AttendancePage.css'
import MultipleSelect from '../assets/components/Select1'
import Divider from '@mui/material/Divider';
import ToggleButtons from '../assets/components/Toggle';





const AttendancePage = () => {
  return (
<div className="attencont">
      <div className="navdiv">
        <ButtonAppBar />
      </div>
      <div className="filterdiv">
        <div className="filtertopdiv">          
            < MultipleSelect />
        </div>
        
      </div>
      <Divider/>
      <div className="togglediv">
      <ToggleButtons />
      </div>

      <div className="iframediv">
        
      </div>

      
    </div>  )
}

export default AttendancePage