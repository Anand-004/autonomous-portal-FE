import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import PDFGenerator from './PDFGen';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }


export default function CustomizedTables({ studentData }) {
  const [finalData, setFinalData] = useState([])
  function calTotalFee(data) {
    return data.reduce((total, item) => {
      return total + parseFloat(item.paper.paper_cost); // Parse paper_cost as a number and sum
    }, 0); // Initial total is 0
  }
  
  // Function to calculate number of arrears
  function calArrears(data) {
    return data.reduce((count, item) => {
      // Increment count if type is "U" or "UA"
      return (item.type === "U" || item.type === "UA") ? count + 1 : count;
    }, 0); // Initial count is 0
  }
  const formatReceiptData =(data) =>{
    return {
      name : data.name,
      regNo: data.reg_no,
      dob: '14/11/2004',
      totalFees: calTotalFee(data.papers),
      subjects: data.papers.map( paperObj =>{
        return{
          semester: "01",
          code: paperObj.paper.code.includes("T+L") ? paperObj.paper.code.slice(0,6) : paperObj.paper.code,
          title: paperObj.paper.name
        }
      }),
      arrears: calArrears(data.papers)
    }
  }
 function handleReceipt(id){
  console.log(id)
    const student= studentData.find(std => std._id === id)
    // console.log(student)
    const formattedData = formatReceiptData(student)
    console.log(formattedData) // final Data
    setFinalData([formattedData])
  }
  useEffect(()=>{
    let data = []
    if(studentData.length>0){
      data = studentData?.map( std =>{
        return(
          {
            name: std.name,
            reg_no: std.reg_no,
            id: std._id
          }
        )
      })
    }
    setRows(data)
  },[studentData])
  const [rows, setRows] = useState(
    [
      {
        "name" : "Adhi",
        "reg_no": "44546516161",
        "id": "5647984654"
      }
    ]
    )
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Register Number</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="center">Fees</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="left">{row.reg_no}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center"><PDFGenerator id ={row.id} handleReceipt = { handleReceipt } receiptData = { finalData }/></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
