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

const Statusdraft = () => {
    return (
        <Grid item xs={12} md={2} >
            <Item sx={{textAlign: 'center', bgcolor: 'rgba(119,93,244,0.39)', color: 'rgba(119,93,244,0.85)', py:0.8, borderRadius:6}}>
                <CircleIcon sx={{mr:1, fontSize:'0.875rem'}}/>Draft
            </Item>
        </Grid>
    );
}

export default Statusdraft;
