import axios from 'axios';
import React, { useState } from 'react';
import { TextField, Button, Link } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { useHistory } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import styles from '../../views/Register.module.css';
import logo from '../../assets/img/logo.png'
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import sha256 from 'js-sha256';

const Useregister = () => {
    const [msgExistingEmail, setMsgExistingEmail] = React.useState('');
    const [msgDiffPass, setMsgDiffPass] = React.useState('');
    const history = useHistory();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        comfirmedPassword: false,
        showPassword: false,
        showConfirmPassword: false,
    });
    const [, setMsg] = React.useState('');

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (values.password === values.confirmPassword) {
            setValues({
                ...values,
                confirmedPassword: !values.confirmedPassword,
            });
        } else {
            setMsgDiffPass('Password tidak cocok');
        }

        if (values.confirmedPassword) {
            const hashPassword = sha256(values.password).slice(0, 12)
            await axios.post(
                'http://18.140.197.103:8000/billissuer/register',
                {
                    name: values.name,
                    password: hashPassword,
                    email: values.email,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then(function (response) {
                    // handle success
                    setMsg(response.data.message);
                    console.log('axios', response);
                    localStorage.setItem("userID", response.data.data.id);
                    history.push({
                        pathname: "/registerDetail",
                    });
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    setMsgExistingEmail('Email sudah terdaftar');
                });
        }
    };

    const linkHome = () => {
        history.push({
            pathname: '/'
        });
    };
    return (
        <form onSubmit={handleSubmit} method="POST">
            <p id={styles.title}>
                <Link component="button" underline='none' sx={{ color: "white" }} onClick={linkHome}>
                    <img src={logo} alt="logo" className={styles.logo} /> invoice.in
                </Link>
            </p>
            <TextField
                required
                className={styles.textfieldRegister}
                // id="outlined-required"
                onChange={handleChange('name')}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                    ),
                }}
                placeholder="Name"
            />
            <TextField
                required
                className={styles.textfieldRegister}
                // id="outlined-required"
                type="email"
                onChange={handleChange('email')}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                    ),
                }}
                placeholder="Email"
            />
            {msgExistingEmail ? <p style={{color:'red', marginBottom: 0}}>{`* ${msgExistingEmail}`}</p> : null}
            <TextField
                required
                className={styles.textfieldRegister}
                // id="outlined-required"
                type={values.showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                onChange={handleChange('password')}
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
                placeholder="Password"

            />
            <TextField
                required
                className={styles.textfieldRegister}
                // id="outlined-password-input"
                type={values.showConfirmPassword ? 'text' : 'password'}
                autoComplete="current-password"
                onChange={handleChange('confirmPassword')}
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
                                onClick={handleClickShowConfirmPassword}
                                edge="end"
                            >
                                {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                placeholder="Confirm Password"
            />
            {msgDiffPass ? <p style={{color:'red', marginBottom: 0}}>{`* ${msgDiffPass}`}</p> : null}
            <p id={styles.aTerms} >By signing up, I agree to the Privacy Policy and Terms of Service</p>
            <Button variant="contained" type="submit" id={styles.btnRegister}>NEXT</Button>
        </form>
    );
}

export default Useregister;
