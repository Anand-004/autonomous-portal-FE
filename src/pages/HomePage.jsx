import React, { useEffect, useState } from 'react'
import './HomePage.css'
import InputFileUpload from '../assets/components/UploadFile'
import ButtonAppBar from '../assets/components/Navbar'
import BasicSelect from '../assets/components/SelectDept'
import DisableElevation from '../assets/components/Button'
import Divider from '@mui/material/Divider';
import CustomizedTables from '../assets/components/Details'
import { fetchStudentsData, insertData } from '../services/api/main'
import LinearIndeterminate from '../assets/components/loading'
import StickyHeadTable from '../assets/components/table2'

const HomePage = () => {
  const [dept, setDept] = useState('')
  const [batch, setBatch] = useState('')
  const [bothSelected, setBothSelected] = useState(true)

  function convertStudentData(dataList) {
    const validPaperTypes = ["U", "UA", "Y"]
    return dataList.map(studentData => {
        // Create the converted student object
        const studentConverted = {
            reg_no: studentData["Reg. Number"],
            name: studentData["Name of the Student"],
            papers: []
        };

        // Iterate through the student's subject data and map them to the desired format
        for (const key in studentData) {
            if (key !== "Sl. No." && key !== "Reg. Number" && key !== "Name of the Student") {
                // Add each paper (subject) with its code and type to the papers array
                if(validPaperTypes.includes(studentData[key])){
                  studentConverted.papers.push({
                    code: key,
                    type: studentData[key]
                  })
                }
            }
        }

        return studentConverted;
    });
  }

  function formatSemAndSub(obj) {
    const result = [];
    let currentSem = null;
    let currentSubjects = [];

    for (let key in obj) {
        if (key.startsWith('SEM')) {
          
            if (currentSem !== null) {
                result.push({ sem_no: currentSem, subjects: currentSubjects });
            }

            currentSem = obj[key];
            currentSubjects = [];
        } else {

            currentSubjects.push({ code: key, name: obj[key] });
        }
    }

    if (currentSem !== null) {
        result.push({ sem_no: currentSem, subjects: currentSubjects });
    }

    return result;
}


  const formatData = (data) =>{
    const semData = formatSemAndSub(data.shift())
    const studentData = convertStudentData(data)
    return{
      semesters: semData,
      students: studentData
    }

  }
  const sendData = async(data) =>{
    const finalData = formatData(data)
    console.log("Final Data - ",finalData)
    // const inserted = await insertData(dept, batch, finalData)
    // if(inserted) alert("Data Sent to BE")
  }
  useEffect(()=>{
    console.log(dept, "---",batch)
    if(dept.length>1 && batch.length>1){
      setBothSelected(false)
      console.log("upd")
    }
  }, [dept, batch])
  const [studentData, setStudentData] = useState([])
  const handleFilter = async() =>{
    const reqData = {
      dept_id : dept,
      batch: batch
    }
    const resData = await fetchStudentsData(reqData);
    setStudentData(resData)
  }
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
           <DisableElevation handleFilter={ handleFilter } isDisabled={bothSelected}/>
           </div>
           
        </div>
        <Divider/>

        {studentData.length>0 ? (<div className="Detailscont">
            <div className="Details">
               <CustomizedTables studentData = { studentData }/>
               {/* <StickyHeadTable /> */}
            </div>
        </div>):
        (<div className="Uploaddiv">
           
            <div className="upload">
            <h4>UPLOAD YOUR EXCEL SHEET HERE</h4>
            <InputFileUpload sendData={ sendData } />
            
            </div>
            <div className="uploadloading">
              <div className="loadingani"> <LinearIndeterminate /></div>
            </div>
        </div>)
        }
    </div>
  )
}

export default HomePage