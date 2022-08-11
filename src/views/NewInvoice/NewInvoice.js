import * as  React from 'react';
import NavbarArrowBack from '../../components/Navbar/NavbarArrowBack';
import Forminvoice from '../../components/Detail/FormInvoice';
import Custom from './newInvoice.module.css';
import Box from '@mui/material/Box';

const Newinvoice = () => {
    const link = '/dashboard';
    return (
        <Box className={Custom.background}>
            <Box className={`container py-5 text-white`}>
                <NavbarArrowBack link={link}/> 
                <Forminvoice/>
            </Box>
        </Box>
    );
}

export default Newinvoice;
