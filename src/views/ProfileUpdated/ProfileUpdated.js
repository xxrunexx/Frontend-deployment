import * as  React from 'react';
import FormProfileUpdated from '../../components/Detail/FormProfileUpdated';
import Custom from './profileUpdated.module.css';
import Box from '@mui/material/Box';

const ProfileUpdated = () => {
    return (
        <Box className={Custom.background}>
            <Box className={`container py-5 text-white`}>
                <FormProfileUpdated/>
            </Box>
        </Box>
    );
}

export default ProfileUpdated;

