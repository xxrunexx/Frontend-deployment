// Import modules
import React from 'react'
import { Grid, TextField, Button } from '@mui/material'
import { InputAdornment } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import styles from './Login.module.css';
import wavebg from '../assets/img/wave.svg';
import Link from '@mui/material/Link';
import Logo from '../assets/img/logo.png';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import sha256 from 'js-sha256';

function Login() {
    const [msgWrongPass, setMsgWrongPass] = React.useState('');
    const history = useHistory();
    const [values, setValues] = React.useState({
        email:'',
        password: '',
        showPassword: false,
    });
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const [, setMsg] = React.useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const hashPassword = sha256(values.password).slice(0, 12)
        await axios
          .post(
            'http://122.248.192.108:8000/billissuer/login',
            {
                email: values.email,
                password: hashPassword,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
          )
          .then(function (response) {
            // handle success
            setMsg(response.data.data.message);
            console.log('axios', response);
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("loggedIn", "bill_issuer");
            console.log(response.data.data.token);
            history.push('/');
          })
          .catch(function (error) {
            // handle error
            console.log('error');
            setMsgWrongPass('Email atau Password salah!');
          });
    };
    const passHome= () => {
        history.push({
            pathname: "/",
        });
    };
    const passRegister= () => {
        history.push({
            pathname: "/register",
        });
    };
    return (
        <div className={styles.bgLogin}>
            <img src={wavebg} alt="Wavebg"/>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item xs={6} className={styles.gridLoginform}>
                    <Link component="button" underline="none" onClick={passHome}>                        
                        <p id={styles.title}>
                            <img src={Logo} alt="logo" style={{width:'70px'}}/> invoice.in
                        </p>
                    </Link>
                    <form onSubmit={handleSubmit} method="POST">
                        <TextField
                            required
                            className= {styles.textfieldLogin}
                            type="text"
                            onChange={handleChange('email')}
                            id="outlined-required"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <EmailIcon />
                                    </InputAdornment>
                                ),
                                }}
                            placeholder= "Email"
                        />
                        <TextField
                            required
                            className= {styles.textfieldLogin}
                            id="outlined-password-input"
                            type={values.showPassword ? 'text' : 'password'}
                            onChange={handleChange('password')}
                            autoComplete="current-password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <LockIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                
                            }}
                            placeholder= "Password"
                        />
                        {msgWrongPass ? <p style={{color:'red', marginBottom: 0}}>{`* ${msgWrongPass}`}</p> : null}
                        <Button variant="contained" type="submit" id={styles.btnLogin}>Login</Button>
                    </form>
                    <Link sx={{mx:20}} component="button" underline="none" onClick={passRegister} id={styles.aRegister}>
                        {`Don't have an account ? `}<span style={{color:'#FFC700'}}>Click Here</span>
                    </Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login
