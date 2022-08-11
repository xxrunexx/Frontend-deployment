import React from 'react';
import Dashboardhome from '../../components/Detail/DashboardHome';
import Custom from './homeDashboard.module.css';
import Box from '@mui/material/Box';

const Homedashboard = () => {
    return (
        <Box className={Custom.background}>
            <Dashboardhome/>
        </Box>
    );
}

export default Homedashboard;
