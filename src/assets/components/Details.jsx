import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PDFGenerator from './PDFGen';
import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';
import PDFGenh from './PDFGenh';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: 'bold',
    fontSize: '1.1rem',
    padding: 'px', // Customize padding for height adjustment
    height: '64px', // Set custom height as desired
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledNameCell = styled(StyledTableCell)({
  paddingLeft: '200px',
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CustomizedTables = ({ dept, studentData }) => {
  const [classFees, setClassFees] = useState(null); 
  const [allReceiptData, setAllReceiptData] = useState([]); 

  useEffect(() => {
    // Format the receipt data
    const formattedData = (studentData && studentData.length > 0) ? studentData.map((student) => formatReceiptData(student)) : [];
    setAllReceiptData(formattedData);
  }, [studentData]);

  useEffect(() => {
    // Once allReceiptData is updated, calculate the total fees
    const fees = allReceiptData?.reduce((tot, std) => tot + parseFloat(std.totalFees || 0), 0);
    setClassFees(toIndianCurrency(fees)); // Make sure we handle cases where fees might be undefined
  }, [allReceiptData]);

  const [rows, setRows] = useState([]);
  useEffect(()=>{
    console.log("data - ", studentData)
  },[studentData])
  // Format the data for PDF generation
  const formatReceiptData = (data) => (data && {
    name: data.name,
    regNo: data.reg_no,
    dob: data.dob ? data.dob : '07/05/2005',
    totalFees: data.papers.reduce((total, item) => total + parseFloat(item.paper.paper_cost), 100),
    subjects: data.papers.map((paperObj) => ({
      semester: paperObj.paper.sem_no,
      code: paperObj.paper.code.includes('T+L') ? paperObj.paper.code.slice(0, 6) : paperObj.paper.code,
      title: paperObj.paper.name,
    })),
    arrears: data.papers.length,
  });
  const toIndianCurrency = (num) => {
    const curr = num.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      });
  return curr;
  };
  useEffect(() => {
    const processedData = studentData.map((student) => ({
      id: student._id,
      name: student.name,
      reg_no: student.reg_no,
      dob: student.dob
    }));
    setRows(processedData);
  }, [studentData]);

  const downBtn = {
    float: 'right',
    marginRight: '10px',
    marginLeft:'10px',
    marginBottom: '20px',
  };

  return (
    <>
    {(studentData && classFees) && 
    (<div>
    <div style={{ padding: "30px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>

      {classFees && 
      <div>
        <span style={{fontWeight: "bold"}} >Total fees : Rs. {classFees} /-</span>
      </div>}

      <div style={{}}>
          <PDFGenh
            allReceiptData={ allReceiptData } btnContent={ "All Haltickets" }
            />
          <PDFGenerator
            allReceiptData={ allReceiptData } btnContent={ "All Receipts" }
            />
      </div>

      {/* <div style={downBtn}>
      </div> */}

    </div>
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
        }}
        >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ paddingLeft: '30px' }}>Register Number</StyledTableCell>
              <StyledTableCell align="left" sx={{ paddingLeft: '200px' }}>Name</StyledTableCell>
              <StyledTableCell align="left" sx={{ paddingLeft: '60PX' }}>Hall Ticket</StyledTableCell>
              <StyledTableCell align="center">Fees Receipt</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="left" sx={{ paddingLeft: '30px' }}>{row.reg_no}</StyledTableCell>
                <StyledNameCell component="th" scope="row" align="left">
                  {row.name}
                </StyledNameCell>
                <StyledTableCell align="center">
                  <PDFGenh
                    id={row.id}
                    receiptData={formatReceiptData(studentData.find((student) => student._id === row.id))}
                    />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <PDFGenerator
                    dept = { dept }
                    id={row.id}
                    receiptData={formatReceiptData(studentData.find((student) => student._id === row.id))}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>)}
    </>
  );
};

export default CustomizedTables;
