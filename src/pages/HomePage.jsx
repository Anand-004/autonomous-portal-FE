import React, { useEffect, useState } from 'react'
import './HomePage.css'
import InputFileUpload from '../assets/components/UploadFile'
import ButtonAppBar from '../assets/components/Navbar'
import BasicSelect from '../assets/components/SelectDept'
import DisableElevation from '../assets/components/Button'
import Divider from '@mui/material/Divider';
import CustomizedTables from '../assets/components/Details'

const HomePage = () => {
  const [dept, setDept] = useState('')
  const [batch, setBatch] = useState('')
  const [bothSelected, setBothSelected] = useState(true)
  useEffect(()=>{
    console.log(dept, "---",batch)
    if(dept.length>1 && batch.length>1){
      setBothSelected(false)
      console.log("upd")
    }
  }, [dept, batch])
  return (
    <div className="HomepageContainer">
        <div className="Navbar">
            <ButtonAppBar />
        </div>
        <div className="Filter">
           <div className="Filterleft">
           <BasicSelect updateDept={setDept} updateBatch={setBatch}/>
           </div>
           <div className="Filterright">
           <DisableElevation isDisabled={bothSelected}/>
           </div>
           
        </div>
        <Divider component="li" />
        <div className="Detailscont">
            <div className="Details">
               <CustomizedTables/>
            </div>
        </div>
        <div className="Upload">
            <InputFileUpload />
        </div>
    </div>
  )
}

export default HomePage