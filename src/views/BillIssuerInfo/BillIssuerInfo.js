import * as  React from 'react';
import NavbarArrowBack from '../../components/Navbar/NavbarArrowBack';
import FormBillIssuerInfo from '../../components/Detail/FormBillIssuerInfo';
import Custom from './billIssuerInfo.module.css';
import Box from '@mui/material/Box';

const BillIssuerInfo = () => {
    const link = '/dashboard';

    return (
        <Box className={Custom.background}>
            <Box className={`container py-5 text-white`}>
                <NavbarArrowBack link={link}/>
                <FormBillIssuerInfo />
            </Box>
        </Box>
    );
}
export default BillIssuerInfo;