import * as React from 'react';
import Custom from './newClient.module.css';
import NavbarArrowBack from '../../components/Navbar/NavbarArrowBack';
import Formclient from '../../components/Detail/FormClient';
import Box from '@mui/material/Box';

const Newclient = () => {
    const link = '/dashboard';
    return (
        <Box className={Custom.background}>
            <Box className={`container py-5 text-white`}>
                <NavbarArrowBack link={link}/> 
                <Formclient/>
            </Box>
        </Box>
    );
}

export default Newclient;
