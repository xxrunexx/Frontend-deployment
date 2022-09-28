import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { InputAdornment } from '@mui/material';
import styles from '../../views/Register.module.css';
import logo from '../../assets/img/logo.png';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MapIcon from '@mui/icons-material/Map';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import axios from 'axios';

const Useregisterdetail = ({userID}) => {
    const API = "http://122.248.192.108:8000";
    const history = useHistory();
    const [values, setValues] = useState({
        companyName:'',
        companyAddress:'',
        companyPhone:'',
        companySite:'',
    });

    const [, setMsg] = useState('');

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { companyName, companyAddress, companyPhone, companySite } = values;
        await axios.post(
            `${API}/billissuerdetail/add`,
            {
                bill_issuer_id: parseInt(userID),
                company_name: companyName,
                company_address: companyAddress,
                company_phone: companyPhone,
                company_site: companySite
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: 'Bearer token...',
                },
            }
        )
        .then(function (response) {
            // handle success
            setMsg(response.data.message);
            console.log('axios', response);
            localStorage.removeItem('userID');
            history.push({
                pathname: "/login",
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    };
    return (
        <form onSubmit={handleSubmit} method="POST">
            <p id={styles.title}> 
            <img src={logo} alt="logo" className = {styles.logo}/> invoice.in 
            </p>
            <TextField
                required
                className= {styles.textfieldRegister}
                // id="outlined-required"
                onChange={handleChange('companyName')}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <BusinessCenterIcon />
                        </InputAdornment>
                    ),
                }}
                placeholder= "Company Name"
            />
            <TextField
                required
                className= {styles.textfieldRegister}
                // id="outlined-required"
                onChange={handleChange('companyAddress')}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <MapIcon />
                        </InputAdornment>
                    ),
                }}
                placeholder= "Company Address"
            />
            <TextField
                required
                className= {styles.textfieldRegister}
                // id="outlined-required"
                onChange={handleChange('companyPhone')}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <PhoneIcon />
                        </InputAdornment>
                    ),
                }}
                placeholder= "Company Phone"
            />
            <TextField
                required
                className= {styles.textfieldRegister}
                // id="outlined-required"
                onChange={handleChange('companySite')}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <LanguageIcon />
                        </InputAdornment>
                    ),
                }}
                placeholder= "Company Site"
            />
            <p id= {styles.aTerms} >By signing up, I agree to the Privacy Policy and Terms of Service</p>
            <Button variant="contained" type="submit" id= {styles.btnRegister}>CREATE ACCOUNT</Button>
        </form>
    );
}

export default Useregisterdetail;
