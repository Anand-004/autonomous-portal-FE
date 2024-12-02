import React, { useState } from 'react'
import ButtonAppBar from '../assets/components/Navbar2'
import './AttendancePage.css'
import MultipleSelect from '../assets/components/Select1'
import Divider from '@mui/material/Divider';
import ToggleButtons from '../assets/components/Toggle';



const AttendancePage = () => {
  const [students, setStudents] = useState([])
  return (
<div className="attencont">
      <div className="navdiv">
        <ButtonAppBar />
      </div>
      <div className="filterdiv">
        <div className="filtertopdiv">          
            <MultipleSelect setStudents = { setStudents } />
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