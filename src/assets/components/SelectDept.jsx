import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { useEffect, useState } from 'react';
import { fetchDepartments } from '../../services/api/main';

export default function BasicSelect({ updateDept, updateBatch, setDeptName }) {
  const [depts, setDepts] = useState([]); // All departments from API
  const [filteredDepts, setFilteredDepts] = useState([]); // Departments after degree filter
  const [batches, setBatches] = useState(["2021", "2022", "2023", "2024"]);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  
  const degrees = ["B.E", "B.Tech", "M.E", "Ph.D"]; // Hardcoded degrees

  // Fetch the departments from the API
  const fetchDatas = async () => {
    const depts = await fetchDepartments();
    setDepts(depts.departments);
    setFilteredDepts(depts.departments); // Initially show all departments
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  // Filter departments when the degree is selected
  useEffect(() => {
    if (selectedDegree) {
      const filtered = depts.filter(dept => dept.degree === selectedDegree);
      setFilteredDepts(filtered);
      setSelectedDept(''); // Reset department selection
      setDeptName(null); // Reset department name
    } else {
      setFilteredDepts(depts); // Show all departments if no degree is selected
    }
  }, [selectedDegree]);

  // Handle degree change
  const handleDegreeChange = (event) => {
    setSelectedDegree(event.target.value);
  };

  // Handle department change
  const handleDeptChange = (event) => {
    setSelectedDept(event.target.value);
    updateDept(event.target.value);
    const dName = depts.find(itm => itm._id === event.target.value);
    setDeptName(dName);
  };

  // Handle batch change
  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
    updateBatch(event.target.value);
  };

  return (
    <>
    <div style={{display: "flex", marginLeft: "5%"}}>
      {/* Degree Selection */}
      <Box sx={{ minWidth: 80 }}>
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="Degree">Degree</InputLabel>
          <Select
            labelId="Degree"
            id="Degree"
            value={selectedDegree}
            label="Degree"
            onChange={handleDegreeChange}
          >
            {degrees.map((degree, index) => (
              <MenuItem key={index} value={degree}>
                {degree}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Required*</FormHelperText>
        </FormControl>
      </Box>

      {/* Department Selection */}
      <Box sx={{ minWidth: 80 }}>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="Department">Department</InputLabel>
          <Select
            labelId="Department"
            id="Dept"
            value={selectedDept}
            label="Department"
            onChange={handleDeptChange}
            disabled={!selectedDegree} // Disable if no degree selected
            >
            {filteredDepts.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.department}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Required*</FormHelperText>
        </FormControl>
      </Box>

      {/* Batch Selection */}
      <Box sx={{ minWidth: 80 }}>
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="StudentBatch">Batch</InputLabel>
          <Select
            labelId="StudentBatch"
            id="Batch"
            value={selectedBatch}
            label="Batch"
            onChange={handleBatchChange}
            >
            {batches.map((item, ind) => (
              <MenuItem key={ind} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Required*</FormHelperText>
        </FormControl>
      </Box>
    </div>
    </>
  );
}
