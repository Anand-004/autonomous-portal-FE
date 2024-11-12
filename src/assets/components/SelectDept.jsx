import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { useEffect, useState } from 'react';
import { fetchBatches, fetchDepartments } from '../../services/api/main';

export default function BasicSelect( {updateDept, updateBatch} ) {
  const [depts, setDepts] = useState([]);
  const [batches, setBatches] = useState(
    [
      "2021",
      "2022",
      "2023",
      "2024",
    ]
  );
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const fetchDatas = async()=>{
    const depts = await fetchDepartments();
    // console.log(depts)
    setDepts(depts.departments)
    
    // const data = await fetchBatches();
    // console.log(data.batches)
    // setBatches(data.batches)
  }
  useEffect(()=>{
    fetchDatas()
  }, [])
  const handleDeptChange = (event) => {
    setSelectedDept(event.target.value);
    updateDept(event.target.value)
  };
  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
    updateBatch(event.target.value)
  };

  return (
    <>
       <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 500 }} >
        <InputLabel id="Department">Department</InputLabel>
        <Select
          labelId="Department"
          id="Dept"
          value={selectedDept}
          label="Department"
          onChange={handleDeptChange}
        >
          {depts?.map( (item) => {
            return(
              <MenuItem key={item._id} value={item._id}>{item.department}</MenuItem>
            )
          })}
        </Select>
        <FormHelperText>Required*</FormHelperText>
      </FormControl>
      
    </Box>
    <Box sx={{ minWidth: 120 }}>
    <FormControl sx={{ m: 1, minWidth: 300 }} >
      <InputLabel id="StudentBatch">Batch</InputLabel>
      <Select
        labelId="StudentBatch"
        id="Batch"
        value={selectedBatch}
        label="Department"
        onChange={handleBatchChange}
      >
        {batches.map( (item, ind) => {
            return(
              <MenuItem key={ind} value={item}>{item}</MenuItem>
            )
          })}
      </Select>
      <FormHelperText>Required*</FormHelperText>
    </FormControl>
  </Box>
  </>
  
  );
}
