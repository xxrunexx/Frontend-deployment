// Import modules
import React from 'react'
import { Grid } from '@mui/material'
import styles from './Register.module.css'
import wavebg from '../assets/img/wave.svg'
import Useregister from '../hooks/post/useRegister';

function Register() {
    return (
        <div className={styles.bgRegister} >
            <img src={wavebg} alt="Wavebg"/>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid  item xs={6} className={styles.gridRegisterForm}>
                    <Useregister/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Register
