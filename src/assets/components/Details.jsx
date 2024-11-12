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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
    backgroundColor: theme.palette.common.white, // Set background color to white
    color: theme.palette.common.black,           // Set text color to black
    fontWeight: 'bold',                          // Make the header bold
    fontSize: '1.1rem',   
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledNameCell = styled(StyledTableCell)({
  paddingLeft: '200px', // Adjust this value as needed
});
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CustomizedTables = ({ studentData }) => {
  const [rows, setRows] = useState([]);

  // Format the data for PDF generation
  const formatReceiptData = (data) => ({
    name: data.name,
    regNo: data.reg_no,
    dob: '14/11/2004',
    totalFees: data.papers.reduce((total, item) => total + parseFloat(item.paper.paper_cost), 0),
    subjects: data.papers.map((paperObj) => ({
      semester: paperObj.paper.sem_no,
      code: paperObj.paper.code.includes('T+L') ? paperObj.paper.code.slice(0, 6) : paperObj.paper.code,
      title: paperObj.paper.name,
    })),
    arrears: data.papers.length,
  });

  // Preprocess the student data to set rows
  useEffect(() => {
    const processedData = studentData.map((student) => ({
      id: student._id,
      name: student.name,
      reg_no: student.reg_no,
    }));
    setRows(processedData);
  }, [studentData]);

  const downBtn = {
    float: 'right',
    marginRight: '10px',
    marginBottom: '20px',
  };

  return (
    <>
      <div style={downBtn}>
        <PDFGenerator
          allReceiptData={studentData.map((student) => formatReceiptData(student))}
        />
      </div>
      <TableContainer component={Paper}
        elevation={3} // Default shadow effect
        sx={{
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Custom shadow for stronger effect
          borderRadius: '8px',
        }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ paddingLeft: '30px' }}>Register Number</StyledTableCell>
              <StyledTableCell align="left" sx={{ paddingLeft: '200px' }}>Name</StyledTableCell>
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
                  <PDFGenerator
                    id={row.id}
                    receiptData={formatReceiptData(studentData.find((student) => student._id === row.id))}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomizedTables;
