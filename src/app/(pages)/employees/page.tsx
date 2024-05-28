
"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Employee, addEmployee, deleteEmployee, editEmployee, fetchEmployee } from '@/redux/employee/employeeSlice';
import { Button, Chip, Grid, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddEmployeeDialog from '@/components/employee/AddEmployee';
import { useRouter } from 'next/navigation';
import { DataGrid, GridColDef, gridDateFormatter } from '@mui/x-data-grid';
import '@/components/styles/Style.css'

export default function BasicTable() {
  const dispatch = useDispatch<any>();
  const { employees, totalCount } = useSelector((state: any) => state.employee);
  const [addOpen, setAddOpen] = useState(false);
  const [deleted, setDeleted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('')
  const router = useRouter()
  const [ count, setCount] =useState(0)

  console.log(employees);

  useEffect(() => {
    if (Array.isArray(employees)) {
      setCount(employees.length);
    }
  }, [employees]);


  useEffect(() => {
    dispatch(fetchEmployee({ q: searchTerm ,createdAt: dateFilter }));
  }, [ dispatch, searchTerm, dateFilter,totalCount ]);

  const handleDelete = async (employeeId: string) => {
    setDeleted(true)
   await dispatch(deleteEmployee({ employeeId }));
   dispatch(fetchEmployee({ q: searchTerm ,createdAt: dateFilter }));
   setDeleted(false)
    };

  const handleAddOpen = () => {
    setAddOpen(true);
  };
  const handleAddClose = () => {
    setAddOpen(false);
  };
    
  const getStatusChip = (status: string) => {
    return status === 'Active' ? (
      <Chip label="Active"  color="success" variant='outlined'/>
    ) : (
      <Chip label="InActive" color="error"  variant='outlined'  />
    );
  };


  //paginate

   const columns: GridColDef[] = [

    { field: 'id', headerName: 'ID',           
    renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1
    },
    { field: 'image', headerName: 'image ', width: 100,
    renderCell: (employees) => {
      return <>
      <img src={employees.row.image} alt="Employee" style={{ width: '50px', height: 'auto', borderRadius: "50px" }} />

      </>
    }
   },
   
    { field: 'name', headerName: 'Name', width: 100, },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'mobile_number', headerName: 'Mobile No', width: 150 },
    { field: 'designation', headerName: 'Designation', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'course', headerName: 'Course', width: 110 },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => getStatusChip(params.value),
    },
    { field: 'createdAt', headerName: 'Created Date', width: 110 ,
    renderCell: (employees) => {
      return <>
       {new Date(employees.row.createdAt).toLocaleDateString('en-GB', {  //en-US
                    year: 'numeric',
                    month: 'numeric',
                    // month: 'long',
                    day: 'numeric',
                  })}
      </>
    }
    },
    { field: 'actions', headerName: 'Actions', width: 200,
      renderCell: (employees) => {
        return<>
          <Button  onClick={() => router.push(`/employees/edit/${employees.row._id}`)}
          style={{ border: "1px solid", marginLeft: "30px", marginTop: "20px", color: "white", background: "#000080" }}>
            Edit
          </Button>
          <Button onClick={() => handleDelete(employees.row._id)} 
           style={{ border: "1px solid", marginTop: "20px", color: "white", background: "red" }}>
            Delete
          </Button>

        </>

      }
    }
  ]

  return (
    <div>
      <Grid container spacing={2} >
        <Paper component="form" sx={{ ml: "70px", mt: "50px", p: '4px 4px', display: 'flex', alignItems: 'center', width: 450, color: "white" }} >
          
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search by book name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
     
        <Typography variant="h6" component="div" sx={{  mt: "40px", width: '200px', ml:"70px" }}>
          <span style={{ color: "gray" }}> Total Employees:</span> <span style={{ color: "#000080" }} > {count} </span>
        </Typography>
        <Button sx={{ border: "1px solid ", padding: "0px", mt: "40px", ml: "30%", color: "white", background: "#000080" }} onClick={handleAddOpen}>
          Create Employee
        </Button>
      </Grid>
      {/* <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "gray" }}>
              <TableCell>Id</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Mobile No</TableCell>
              <TableCell align="right">Designation</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Course</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Created Date</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(employees) && employees.map((employee: any, index: any ) => (
              <TableRow key={employee._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                    {index + 1}
                </TableCell>
                <TableCell align="right">
                  <img src={employee.image} alt="Employee" style={{ width: '50px', height: 'auto', borderRadius: "50px" }} />
                </TableCell>
                <TableCell align="right">{employee.name}</TableCell>
                <TableCell align="right">{employee.email}</TableCell>
                <TableCell align="right">{employee.mobile_number}</TableCell>
                <TableCell align="right">{employee.designation}</TableCell>
                <TableCell align="right">{employee.gender}</TableCell>
                <TableCell align="right">{employee.course}</TableCell>
                <TableCell align="right">
                    {getStatusChip(employee.status)}
                  </TableCell>
                <TableCell align="right">
                  {new Date(employee.createdAt).toLocaleDateString('en-GB', {  //en-US
                    year: 'numeric',
                    month: 'numeric',
                    // month: 'long',
                    day: 'numeric',
                  })}
                </TableCell>

                <div>
                <Button  onClick={() => router.push(`/employees/edit/${employee._id}`)}style={{ border: "1px solid", marginLeft: "30px", marginTop: "20px", color: "white", background: "#000080" }}>Edit</Button>
                  <Button onClick={() => handleDelete(employee._id)} style={{ border: "1px solid", marginTop: "20px", color: "white", background: "red" }}>Delete</Button>
                </div>

              </TableRow>
              
            ))}
            {!Array.isArray(employees) && 
              <TableRow>
                <TableCell colSpan={8} align="center">Loading...</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer> */}

        <DataGrid
          getRowId={(employees) => employees._id}
            rows={employees}
            columns={columns}
            rowHeight={100}
              initialState={{ 
                pagination: { paginationModel: {pageSize: 5}}
              }}
            pageSizeOptions={[ 5, 10,20]}
        />
      <AddEmployeeDialog open={addOpen} handleClose={handleAddClose} />

    </div>
  );
}

