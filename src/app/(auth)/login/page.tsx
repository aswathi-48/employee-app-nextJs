
'use client';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  type FormValues = {
    email: string;
    password: string;
  };

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = async () => {
    const response = await axios.post('http://localhost:7100/employees/login', { email, password });
    const { access_token , result} = response.data;
    console.log(response.data);
    
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('adminId',result._id),
    localStorage.setItem("role",result.role),
    localStorage.setItem("first_name",result.first_name),
    localStorage.setItem("gender",result.gender)
    router.push('/');
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
  

// 'use client';
// import React, { useState } from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';

// const schema = yup.object().shape({
//   email: yup.string().email('Invalid email').required('Email is required'),
//   password: yup.string().required('Password is required'),
// });

// function SignIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async () => {
//     const response = await axios.post('http://localhost:7100/admin/login', { email, password });
//     const { access_token, result } = response.data;
//     console.log(response.data);
    
//     localStorage.setItem('access_token', access_token);
//     localStorage.setItem('adminId', result._id);
//     localStorage.setItem("role", result.role);
//     localStorage.setItem("gender", result.gender);
//     router.push('/');
//   };

//   return (
//     <ThemeProvider theme={createTheme()}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               error={!!errors.email}
//             //   helperText={errors.email?.message}
//             //   inputRef={register}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               autoComplete="current-password"
//               error={!!errors.password}
//             //   helperText={errors.password?.message}
//             //   inputRef={register}
//             />
//             <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
//             <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default SignIn;



// 'use client'
// import React, { useState } from 'react'
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Avatar, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import * as yup from 'yup'
// import CommonSnackBars from '@/components/snackBars/CommonSnackBar';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="/">
//         BookShelf.com
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}

//     </Typography>
//   );
// }

// // TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();
// const Login = () => {
//   const [value, setValue] = useState<boolean>(false)
//   const [showPassword, setShowPassword] = useState(false);

//   const router = useRouter()

//   const [input , setInput] = useState<{ email:string, password: string }>({
//         email:"",
//         password:""
//     })

//     const handleNormalInputs = (e:any) => {
//       const { name, value } = e.target
//       setInput({ ...input, [name]: value })
//       console.log(input, "inputs")
//     } 

//     const schema = yup.object().shape({
//         email: yup.string().required(),
//         password: yup.string().required()
//     })

    


//     const userLogin = () => {
//       schema.validate(input)
//             .then(valid => console.log(valid))
//             .catch(error => console.log(error))
//       const response = axios.post('http://localhost:7100/admin/login',{ email:input.email, password:input.password }).then(res => {
//       console.log(res.data, "resData")
//       setValue(true)
//       const  access_token: string  = res.data.access_token;
//       localStorage.setItem('access_token', access_token)
//       localStorage.setItem('role', res.data.data.role)
//       localStorage.setItem('first_name', res.data.data.first_name)
//       localStorage.setItem('user_Id', JSON.stringify(res.data.data._id))
//       router.push('/home')
//       })
//     }

//     const handleSubmit = (e:any) => {
//       e.preventDefault()
//       userLogin()
//     }


//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//   };

//   return (
//     <>
//      <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box>
//             <form onSubmit={(e) => handleSubmit(e)}>
//               <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               onChange={(e) => handleNormalInputs(e)}
//               value={ input.email }
              
//             />

//             <FormControl sx={{ my: 1, width: '100%' }} variant="outlined">
//           <InputLabel htmlFor="password">Password</InputLabel>
//           <OutlinedInput
//             id="password"
//               name="password"
//             onChange={(e) => handleNormalInputs(e)}
//             value={ input.password }
//             type={ showPassword ? 'text' : 'password' }
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}
//                   onMouseDown={handleMouseDownPassword}
//                   edge="end"
//                 >
//                   { showPassword ? <VisibilityOff /> : <Visibility /> }
//                 </IconButton>
//               </InputAdornment>
//             }
//             label="Password"
//           />
//         </FormControl>

//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             </form>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="/register" variant="body2">
//                   {"Don't have an account? Register"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//     </ThemeProvider>
//     <CommonSnackBars value={ value } setValue={ setValue } />
//     </>
//   )
// }

// export default Login