
"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { editEmployee } from '@/redux/employee/employeeSlice';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
interface Data {
  name: string;
  email: string;
  mobile_number: string;
  designation: string;
  gender: string;
  course: string;
  image: string;
  date: string;
  status: string
}
const defaultData: Data = {
  name: "",
  email: "",
  mobile_number: "",
  designation: '',
  gender: "",
  course: "",
  date: "",
  image: "",
  status: ""
};
const EditEmployee = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Data>();
  // const storedToken = localStorage.getItem("access_token") || "{}";
  const [mca , setMca]= useState(false);
  const [bca , setBca]= useState(false);
  const [bsc , setBsc]= useState(false);

    const [formValue, setFormValue] = useState({
      name: "",
      email: "",
      mobile_number: "",
      designation: '',
      gender: "",
      course: "",
      date: "",
      image: "",
      status: ""
  })
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.post("http://localhost:7100/employee/view", { employeeId: params.id });
        const fetchData = response.data;
        setFormValue(fetchData.data)
        reset(fetchData.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    fetchBookData();
  }, [params.id, reset]);

  const onSubmit: SubmitHandler<Data> = async (data) => {
    console.log(data,"dd");
    
    const formData = new FormData();
    formData.append("employeeId",params.id)
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile_number", data.mobile_number);
    formData.append("designation", data.designation);
    formData.append("gender", data.gender);
    formData.append("course", data.course);
    formData.append("status", data.status);
    formData.append("image", image);
    dispatch(editEmployee(formData)); 
    router.push('/employees')
  };

  useEffect(() =>{
    if(formValue.course.toLowerCase().includes("mca")) {
      setMca(true)
    }
    if(formValue.course.toLowerCase().includes("bca")) {
      setMca(true)
    }
    if(formValue.course.toLowerCase().includes("bsc")) {
      setMca(true)
    }
  },[formValue])

  const handleInputChange = (e:any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value} )  
  }

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
    setImage(file);
  };

   const handleChange1 = () => {
    mca ? setMca(false) : setMca(true)
  }
  const handleChange2 = () => {
    bca ? setBca(false) : setBca(true)
  }
  const handleChange3 = () => {
    bsc ? setBsc(false) : setBsc(true)
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} style={{ padding:"30px 0px"}}>
          <Grid item xs={12}>
          {imagePreview ?
             <Grid item xs={12}>
               <img src={imagePreview.toString()} alt="Preview" style={{ maxWidth: '15%', marginTop:"15px", marginLeft:'38%'}} />
             </Grid>
             :
             <Grid item xs={12}>
               <img src={formValue.image} alt="Preview" style={{ maxWidth: '15%', marginTop:"15px", marginLeft:'38%'}} />
             </Grid>
           }
              <input
                accept="image/*"
                id="image"
                type="file"
                {...register("image")}
                onChange={handleImageChange}
                hidden
              />
              {/* <img src={fetch.image} alt="" /> */}
              <label htmlFor="image">
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                {...register("name")}
                onChange={handleInputChange}
                name="name"
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                {...register("email")}
                onChange={handleInputChange}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                required
                fullWidth
                id="gender"
                {...register("gender")}
                onChange={handleInputChange}
                name="gender"
                autoComplete="gender"
              /> */}
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    value={formValue.gender}
                
                    >
                    <FormControlLabel 
                   id='gender' value="female"     {...register("gender")}   onChange={handleInputChange}  control={<Radio />} label="Female"/>
                    <FormControlLabel 
                     id='gender' value="male"      {...register("gender")}  onChange={handleInputChange}  control={<Radio />} label="Male" />
                  </RadioGroup>
            </Grid>
            <Grid item xs={12}>   
              <TextField
                required
                fullWidth
                id="mobile_number"
                {...register("mobile_number")}
                onChange={handleInputChange}
                name="mobile_number"
                autoComplete="mobile_number"
              />
            </Grid>

            <Grid item xs={12}>

             <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Designation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formValue.designation}
                {...register("designation")}
                onChange={handleInputChange}
              >
                <MenuItem value={"HR"}>HR</MenuItem>
                <MenuItem value={"Manager"}>Manager</MenuItem>
                <MenuItem value={"Sales"} >Sales</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormLabel id='course' required>Courses</FormLabel>
            <FormGroup sx={{ display: "flex", flexDirection: "row"}}>
              <FormControlLabel
              id='course' 
              control={<Checkbox  {...register("course")} onChange={handleChange1} checked={mca} />} 
              value="MCA" label="MCA" />

              <FormControlLabel id='course' 
              control={<Checkbox  {...register("course")} onChange={handleChange2} checked={bca} />} 
              value="BCA" label="BCA" />

              <FormControlLabel  id='course' 
              control={<Checkbox {...register("course")} onChange={handleChange3} checked={bsc} />} 
              value="BSC" label="BSC" />
            </FormGroup>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formValue.status}
                  {...register("status")}  onChange={handleInputChange} 
                >
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"InActive"}>InActive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
           
          </Grid>
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default EditEmployee;

