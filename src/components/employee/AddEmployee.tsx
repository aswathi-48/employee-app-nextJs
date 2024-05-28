
"use client"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { addEmployee } from '@/redux/employee/employeeSlice';
import { useForm } from 'react-hook-form';

interface FormData {
  
  name: string;
  email: string;
  mobile_number: string;
  designation: string;
  gender: string;
  course: string;
  image: string;
}




export default function AddEmployeeDialog({ open, handleClose } : {open: any, handleClose: any}) {

  const { register, handleSubmit } = useForm<FormData>();
  const employees =useSelector((state:any) => state.employee.employees)
  const dispatch = useDispatch<any>();
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

  const handleSave = (data: FormData) => {

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile_number", data.mobile_number);
    formData.append("designation", data.designation);
    formData.append("gender", data.gender);
    formData.append("course", data.course);
    formData.append("image",data.image[0]);
    dispatch(addEmployee(formData));
    handleClose();
  };

 
  const handleImageChange = (e:any) => {
    const file = URL.createObjectURL(e.target.files[0])
     setImagePreview(file)
   };

  
   
 
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add employee details:
        </DialogContentText>
         <Grid item xs={12}>
           {imagePreview && ( 
             <Grid item xs={12}>
               <img src={imagePreview.toString()} alt="Preview" style={{ maxWidth: '15%', marginTop:"15px", marginLeft:'38%'}} />
             </Grid>
           )}
            <TextField
              required 
              fullWidth
              type="file" id="image" {...register("image")} 
              onChange={handleImageChange}
            />
          </Grid>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          {...register("name")}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          {...register("email")}
        />
        <TextField
          margin="dense"
          label="Mobile Number"
          type="tel"
          fullWidth
          {...register("mobile_number")}
        />
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Designation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register("designation")}
        >
          <MenuItem value={"HR"}>HR</MenuItem>
          <MenuItem value={"Manager"}>Manager</MenuItem>
          <MenuItem value={"Sales"} >Sales</MenuItem>
        </Select>
      </FormControl>
            <Grid item xs={12} sm={6}>
               <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    >
                    <FormControlLabel 
                    {...register("gender")} id='gender' value="female" control={<Radio />} label="Female"/>
                    <FormControlLabel 
                    {...register("gender")} id='gender' value="male" control={<Radio />} label="Male" />
                  </RadioGroup>
                </Grid>
             
           
                <FormGroup>
                    <FormLabel>Course</FormLabel>
                    <FormControlLabel
                      control={<Checkbox {...register("course")} value="MCA" />}
                      label="MCA"
                    />
                    <FormControlLabel
                      control={<Checkbox {...register("course")} value="BSC" />}
                      label="BSC"
                    />
                    <FormControlLabel
                      control={<Checkbox {...register("course")} value="BCA" />}
                      label="BCA"
                    />
                  </FormGroup>

      
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit(handleSave)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

