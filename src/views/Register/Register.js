import * as  React from 'react';
import NavbarArrowBack from '../../components/Navbar/NavbarArrowBack';
import Forminvoice from '../../components/Detail/FormInvoice';
import Custom from './register.module.css';
import Box from '@mui/material/Box';

const Newinvoice = () => {
    return (
        <Box className={Custom.background}>
            <Box className={`container py-5 text-white`}>
                <NavbarArrowBack/> 
                <Forminvoice/>
            </Box>
        </Box>
    );
}

export default Newinvoice;
