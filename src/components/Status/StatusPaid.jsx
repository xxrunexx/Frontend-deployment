import * as React from 'react';
import Grid from '@mui/material/Grid';
import CircleIcon from '@mui/icons-material/Circle';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: '#131522',
    color: 'white',
    boxShadow: 'none'
}));

const Statuspaid = () => {
    return (
        <Grid item xs={12} md={2} >
            <Item sx={{textAlign: 'center', bgcolor: 'rgba(22,136,4,0.29)', color: '#168804', py:0.8, borderRadius:6}}>
                <CircleIcon sx={{mr:1, fontSize:'0.875rem'}}/>Paid
            </Item>
        </Grid>
    );
}

export default Statuspaid;
