import React from 'react';
import styles from './Register.module.css';
import { Grid } from '@mui/material';
import wavebg from '../assets/img/wave.svg';
import Useregisterdetail from '../hooks/post/useRegisterDetail';

const Registerdetail = () => {   
    const dataResp = localStorage.getItem('userID');
    return (
        <div className={styles.bgRegister} >
            <img src={wavebg} alt="Wavebg"/>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid  item xs={6} className={styles.gridRegisterForm}>
                    <Useregisterdetail userID={dataResp}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default Registerdetail;
