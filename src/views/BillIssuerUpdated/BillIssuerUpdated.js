import * as  React from 'react';
// import NavbarArrowBack from '../../components/Navbar/NavbarArrowBack';
import FormBillIssuerUpdated from '../../components/Detail/FormBillIssuerUpdated';
import Custom from './billIssuerUpdated.module.css';
import Box from '@mui/material/Box';

const BillIssuerUpdated = () => {
    return (
        <Box className={Custom.background}>
            <Box className={`container py-5 text-white`}>
                {/* <NavbarArrowBack/>  */}
                <FormBillIssuerUpdated/>
            </Box>
        </Box>
    );
}

export default BillIssuerUpdated;

