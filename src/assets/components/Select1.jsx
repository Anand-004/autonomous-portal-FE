import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import './../../pages/AttendancePage.css';
import { useEffect, useState } from 'react';
import { fetchAttendanceData, fetchDepartments, fetchSubjectsData } from '../../services/api/main';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
    ? theme.typography.fontWeightMedium
    : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelect({ setData }) {
  const [personName, setPersonName] = useState(["null"])
  const [btnDisable, setBtnDisable] = useState(false)
  const [allDepts, setAlldepts] = useState(null)
  const [attendanceData, setAttendanceData] = useState([])
  const [selectedValues, setselectedValues] = useState({
    degree: "",
    batch: "",
    department: "",
    semester: 0,
    subject: ""
  })
  const handleButtonClick = async() => {
    setBtnDisable(true)
    const data = {
      subject_code: selectedValues.subject.code,
      department_id: selectedValues.department,
      batch: selectedValues.batch
    }
    console.log("data", data)
    const attenData = await fetchAttendanceData(data)
    console.log(allDepts, selectedValues)
    const dept = allDepts.filter( dept => dept._id === selectedValues.department )
    const PDFContent = {
      studentData: attenData,
      department: dept[0]?.department,
      degree: dept[0]?.degree,
      semester: selectedValues.semester,
      subject_code: selectedValues.subject.code,
      subject_name: selectedValues.subject.name
    }
    console.log("Final -- ", PDFContent)
    setData(PDFContent)
    setBtnDisable(false)
  }

  const handleInitialChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setselectedValues((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
    console.log(selectedValues)
  }

  const [initialSelect, setInitialSelect] = useState({
    degree: ["B.E", "B.Tech", "M.E", "Ph.D"],
    batch: ["2021", "2022", "2023", "2024"],
    department: null,
    sems: null,
    subjects: null
  })
  
  const [semAndSub, setSemAndSubs] = useState(null)

// Effect to watch changes in `initialSelect` state
  // useEffect(() => {
  //   console.log("Updated initialSelect:", initialSelect); // This will run whenever `initialSelect` changes
  // }, [initialSelect]);
  
  useEffect(() => {
    
    const fetchFunc = async () => {
      const { departments } = await fetchDepartments();
      console.log("depts", departments); // Log the fetched departments
  
      // Set the state with the new department data
      setAlldepts(departments)
      setInitialSelect((data) => {
        return {
          ...data,
          department: departments,
        }
      })
    };
  
    fetchFunc();
  }, []);

  // Filter departments when the degree is selected
  useEffect(() => {
    console.log("----------")
    if (selectedValues.degree?.length) {
      console.log("sel Degree - ", selectedValues.degree,
        "---- Depts ---", initialSelect.department
      )
      const depts = allDepts?.filter(dept => {
        return dept.degree === selectedValues.degree 
      });
      console.log(depts)
      setInitialSelect((data) => {
        return {
          ...data,
          department: depts,
        }
      })
      // setSelectedDept(''); // Reset department selection
      // setDeptName(null); // Reset department name
    } 
  }, [selectedValues.degree]);

  useEffect(() => {

    function createArray(n) {
      return new Array(n).fill().map((_, index) => index+1);
    }

    const fetchSub = async () => {
      const data = {
        dept_id: selectedValues.department,
        batch: selectedValues.batch
      }
      const semData = await fetchSubjectsData(data)
      setSemAndSubs(semData)
      const semArr = createArray(semData?.length)
      setInitialSelect((prev) => {
        return {
          ...prev,
          sems: semArr 
        }
      })
    }
    if (selectedValues.degree, selectedValues.batch, selectedValues.department) {
      fetchSub()
    }
  }, [selectedValues])
  
  useEffect(() => {
    const subs = semAndSub?.filter(sem => sem.sem_no === selectedValues.semester)
    // console.log(subs[0].subjects)
    subs?.length && setInitialSelect((prev) => {
        return {
          ...prev,
          subjects: subs[0].subjects 
        }
      })
  }, [selectedValues.semester])
  // useEffect(() => {
  //   console.log(selectedValues)
  // },[selectedValues])
  
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div style={{display: "flex",flexWrap:"wrap",width:"100%"}}>
      <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel
    id="demo-multiple-name-label"
    sx={{
      '&.Mui-focused, &.MuiInputLabel-shrink': {
        width: '200%', // Set the desired width here
      },
    }}
  >
    Degree
  </InputLabel>
        {/* <InputLabel id="demo-multiple-name-label">Degree</InputLabel> */}
        <Select
          labelId="demo-multiple-name-label"
          id="degree"
          name='degree'
          value={selectedValues.degree}
          onChange={handleInitialChange}
          input={<OutlinedInput label="Degree" />}
          MenuProps={MenuProps}
        >
          {initialSelect.degree.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 500 }}>
        <InputLabel id="demo-multiple-name-label">Department</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="department"
          name='department'
          value={selectedValues.department}
          onChange={handleInitialChange}
          input={<OutlinedInput label="Department" />}
        >
          {initialSelect?.department?.map((name) => (
            <MenuItem
              key={name._id}
              value={name._id}
              style={getStyles(name, personName, theme)}
            >
              {name.department}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="demo-multiple-name-label">Batch</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="batch"
          name = 'batch'
          value={selectedValues.batch}
          onChange={handleInitialChange}
          input={<OutlinedInput label="Batch" />}
        >
          {initialSelect.batch.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Semester</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id='semester'
          name='semester'
          value={selectedValues?.semester}
          onChange={handleInitialChange}
          input={<OutlinedInput label="Semester" />}
        >
          {initialSelect.sems?.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Subject</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id='subject'
          name='subject'
          value={selectedValues.subject}
          onChange={handleInitialChange}
          input={<OutlinedInput label="Subject Code" />}
        >
          {initialSelect.subjects?.map((sub) => (
            <MenuItem
              key={sub._id}
              value={sub}
              style={getStyles("name", personName, theme)}
            >
              {`${sub.code} - ${sub.name}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="buttondiv">
        <Button
          disabled= {btnDisable}
          onClick={handleButtonClick}
          variant="contained"
          className="customButton">
          Generate
      </Button>
          </div>
    </div>
  );
}
