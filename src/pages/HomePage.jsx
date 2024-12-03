import React, { useEffect, useState } from 'react'
// import './HomePage.css'
import './Home2.css'
import InputFileUpload from '../assets/components/UploadFile'
import ButtonAppBar from '../assets/components/Navbar'
import BasicSelect from '../assets/components/SelectDept'
import DisableElevation from '../assets/components/Button'
import Divider from '@mui/material/Divider';
import CustomizedTables from '../assets/components/Details'
import { fetchStudentsData, insertData } from '../services/api/main'
import LinearIndeterminate from '../assets/components/loading'
// import StickyHeadTable from '../assets/components/table2'
import ConfirmDialog from './../assets/components/Deletepop.jsx'

const HomePage = () => {
  const [dept, setDept] = useState('')
  const [deptName, setDeptName] = useState('')
  const [batch, setBatch] = useState('')
  const [bothSelected, setBothSelected] = useState(true)
  const [isLoad, setIsLoad] = useState(false)
  const [invalid, setInvalid] = useState([])

  useEffect(()=>{
    console.log("invalid", invalid)
  },[invalid])

  const excelDateToJSDate = (serial) => {
    console.log(serial)
    const epoch = new Date(Date.UTC(1900, 0, 1)); // Excel's start date is January 1, 1900
    return new Date(epoch.getTime() + (serial - 2) * 86400000); // Subtract 2 because Excel's epoch starts at 1900
  };

  const formatDateToDDMMYYYY = (date) => {
    console.log(date)
    if (!date) return "-"
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits for day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits for month (0-based index)
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatName = (name) => {
    if (typeof name === 'string' && name.trim().length > 1) {
      let str = name.split('.')
      while(str[0].length <= 2){
        const init = str.shift()
        str.push(init)
      }
      const newName = str.join(' ')
      return newName.trim().toUpperCase(); // return uppercased valid name
    } else {
      setInvalid((prevInvalid) => [
        ...prevInvalid,
        {
          field: "name",
          data: name
        }
      ]);
      return "Invalid name"; // More descriptive error message
    }
  };
  
  const formatRegNo = (regNo) => {
    console.log(typeof regNo, regNo);
    
    // Check if regNo is either a number or a string and ensure the length is 12
    const regNoStr = regNo.toString().trim(); // convert to string and trim spaces
    
    if (regNoStr.length === 12 && !isNaN(regNoStr)) {
      return parseInt(regNoStr); // valid reg number as string
    } else {
      setInvalid((prevInvalid) => [
        ...prevInvalid,
        {
          field: "Register Number",
          data: regNo
        }
      ]);
      return parseInt(regNoStr)
    }
  };
  
  
  function convertStudentData(dataList) {
    const validPaperTypes = ["U", "UA", "Y"]
    return dataList.map(studentData => {
        const SerialToDate = studentData["DOB"] ? excelDateToJSDate(studentData["DOB"] ) : null
        // console.log(studentData)
        const studentConverted = {
            reg_no: formatRegNo(studentData["Reg. Number"]),
            name: formatName(studentData["Name of the Student"]),
            dob: SerialToDate ?  formatDateToDDMMYYYY(SerialToDate) : "-",
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

  function checkSubName(name){
    console.log(name)
    if ( typeof(name) === 'string' && name.length > 0 && !(name.includes("EMPTY")) ){
      let str = name.split(' ');
      for(let i=0; i<str.length; i++){
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(' '); 
    }else{
      setInvalid((prevInvalid) => [
        ...prevInvalid,
        {
          field: "Subject Number",
          data: name
        }
      ]);
      return "subject name"
    }
  }

  function formatSemAndSub(obj) {
    const result = [];
    let currentSem = null;
    let currentSubjects = [];
    console.log(obj)
    for (let key in obj) {
      console.log(key)
        if (key.startsWith('SEM')) {
          
            if (currentSem !== null) {
                result.push({ sem_no: currentSem, subjects: currentSubjects });
            }

            currentSem = obj[key];
            currentSubjects = [];
        } else {

            currentSubjects.push({ code: key, name: checkSubName(obj[key]) });
        }
    }

    if (currentSem !== null) {
        result.push({ sem_no: currentSem, subjects: currentSubjects });
    }

    return result;
}


  const formatData = (data) =>{
    console
    const semData = formatSemAndSub(data.shift())
    const studentData = convertStudentData(data)
    console.log(invalid)
    if(invalid.length>1) console.log(invalid)
    return{
      semesters: semData,
      students: studentData
    }

  }
  
  const sendData = async(data) =>{
      setIsLoad(true)
      const finalData = formatData(data)
      console.log("Final Data - ",finalData)
      const inserted = await insertData(dept, batch, finalData)
      setIsLoad(false)
      handleFilter()
      if(inserted) alert("Data Sent to BE")
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
    setBothSelected(!bothSelected)
    const reqData = {
      dept_id : dept,
      batch: batch
    }
    const resData = await fetchStudentsData(reqData);
    setStudentData(resData)
    setBothSelected(!bothSelected)
  }
  return (
    <div className="HomepageContainer">
        <div className="Navbar">
            <ButtonAppBar />
        </div>
        <div className="Filter">
           <div className="Filterleft">
           <BasicSelect updateDept={setDept} setDeptName = { setDeptName } updateBatch={setBatch}/>
           </div>
           <div className="Filterright">
           <DisableElevation handleFilter={ handleFilter } isDisabled={bothSelected}/>

           <ConfirmDialog />
           </div>
           
        </div>
        <Divider/>
        

        {studentData.length>0 ? (<div className="Detailscont">
            <div className="Details">
               <CustomizedTables dept = { deptName }  studentData = { studentData }/>
               {/* <StickyHeadTable /> */}
            </div>
        </div>):
        !isLoad?
        (<div className="Uploaddiv">
            <div className="upload">
              <h4>UPLOAD YOUR EXCEL SHEET HERE</h4>
              <InputFileUpload isDisabled= { studentData.length>0 && bothSelected } sendData={ sendData } />
            </div>
          </div>)
            :
           (<div className="uploadcont2"><div className="uploadloading">
            <h3>Please wait while uploading</h3>
                  <div className="loadingani">  <LinearIndeterminate /></div>
                </div></div>)
        }
    </div>
  )
}

export default HomePage