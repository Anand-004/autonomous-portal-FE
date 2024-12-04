import React, { useEffect, useState } from 'react'
import ButtonAppBar from '../assets/components/Navbar2'
import './AttendancePage.css'
import MultipleSelect from '../assets/components/Select1'
import Divider from '@mui/material/Divider';
// import ToggleButtons from '../assets/components/Toggle';
import ColorButtons from '../assets/components/Attenbutton';
// import Pdfgena from '../assets/components/Pdfgena';
// import PdfManipulator from '../assets/components/Pdfgena';
import Pdfgenm from '../assets/components/Pdfgenm';
import Pdfgena from '../assets/components/Pdfgena';
import LinearIndeterminate from '../assets/components/loading';
// import Divider from '@mui/material/Divider';




const AttendancePage = () => {
  const [PDFContent, setPDFContent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  return (
<div className="attencont">
      <div className="navdiv">
        <ButtonAppBar />
      </div>
      <div className="filterdiv">
        <div className="filtertopdiv">          
            <MultipleSelect setIsLoading = { setIsLoading } setData = { setPDFContent } />
        </div>

        
      </div>
      <div className="dividerdiv">
      <Divider/>
      </div>
      
      { isLoading
      ? (
        <div className='load-div'>
          <LinearIndeterminate />
        </div>
      )
      : PDFContent && ( 
        <div className="togglediv">
          <Pdfgena data={ PDFContent } />
          <Pdfgenm data={ PDFContent }/>
        </div>
      )}
      <div className="dividerdiv">
      <Divider/>
      </div>

      {/* <div className="iframediv">
        
      </div> */}

      
    </div>  )
}

export default AttendancePage