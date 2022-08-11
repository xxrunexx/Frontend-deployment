import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import custom from './formBillIssuerUpdated.module.css';
import Link from '@mui/material/Link';
import billIssuerUpdated from '../../assets/img/billIssuerUpdated.png'
import { useHistory } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1.5),
    textAlign: 'left',
    backgroundColor: '#131522',
    color: 'white',
    boxShadow: 'none'
}));

const FormBillIssuerUpdated = () => {
    const history = useHistory();

    const linkProfile = () => {
      history.push({
        pathname:'/billissuer'
      });
    }
    return (
    <Box sx={{ flexGrow: 1}} marginTop="60px">
      <Grid container justifyContent="center" >
        <Grid item xs={8}>          
        <Item sx={{
                    textAlign: 'center', 
                    py:1, 
                    fontFamily: 'Michroma',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '64px',
                    lineHeight: '91px',
                    color: '#E5E5E5',                    
          }}>
            <p>PROFILE UPDATED</p>
          </Item>
          <Item sx={{
                    textAlign: 'center', 
                    py:1, 
                    fontFamily: 'Michroma',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '64px',
                    lineHeight: '91px',
                    color: '#E5E5E5',                    
          }}>
            <img src={billIssuerUpdated} alt="billIssuerUpdated"  position="center"/>
          </Item>
          <Item sx={{
                    textAlign: 'center',
                    color:'#E5E5E5', 
                    py:1, 
                    fontSize:'1.2rem'
          }}>
            <p>Your profile has been updated!</p>
          </Item>
          <Item sx={{textAlign: 'center',}}>
              <Box 
                sx={{
                    bgcolor: '#FFC700', 
                    borderRadius:2, 
                    color:'black', 
                    py:1, 
                    fontSize:'1.2rem'
              }}>
                <Link component="button" underline="none" className={custom.login} onClick={linkProfile}>
                    {'BACK TO PROFILE'}
                </Link>
              </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
    );
}

export default FormBillIssuerUpdated;
