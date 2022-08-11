import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import custom from './buttonBillIssuer.module.css';
import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';
import { useHistory } from 'react-router-dom';

function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          color: 'white',
          fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
}

Item.propTypes = {
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};

const Buttonbillissuer = () => {
    const history = useHistory();
    const goLogin = () => {
        history.push({
            pathname: '/login'
        });
    }
    return (
        <Box sx={{
            display: 'grid',
            gridAutoColumns: '1fr',
            gap: 1,
            alignItems: 'center',
            mb: 2,
            flexGrow: 1,
        }}>
            <Grid container justifyContent="right">
             <Grid item xs={2.3} >
            <Item 
                sx={{ 
                    textAlign: 'center',
                    gridRow: '1', 
                    gridColumn: '1',  
                    fontSize: '2.5rem', 
                    borderRadius: 1,
                    p: 1,
                    height: 80,
                    
                }}>
              <Box 
                sx={{
                    textAlign: 'center',
                    bgcolor: '#FFC700', 
                    borderRadius:2, 
                    color:'black', 
                    py:1, 
                    fontSize:'1.2rem'
              }}>
                  <LoginIcon/>
                <Link component="button" underline="none" className={custom.addNewItem} onClick={goLogin}>
                    {'LOGIN BILL ISSUER'}
                </Link>
              </Box>
          </Item>
          </Grid>
          </Grid>
        </Box>
    );
}

export default Buttonbillissuer;
