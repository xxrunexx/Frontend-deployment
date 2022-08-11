import * as React from 'react';
import Custom from './dashboardClient.module.css';
import TitleDashboard from '../../components/Detail/TitleDashboard';
import NavbarArrowBack from '../../components/Navbar/NavbarArrowBack';
import Detailclient from '../../components/Detail/DetailClient';
import Box from '@mui/material/Box';
import axios from 'axios';

const DashboardListClient = () => {
    const link = '/dashboard';
    const title = 'Clients';
    const token = React.useRef('');
    token.current = localStorage.getItem('token');
    const [datas, setDatas] = React.useState(null);
    React.useEffect(() => {
        const getClient = async () => {
            await axios.get(
                'http://18.140.197.103:8000/client',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.current}`,
                    },
                }
            )
            .then((response)=>{
                setDatas(response.data);
            });
        };
        getClient();
    },[]);
    return (
        <Box className={Custom.background}>
            <Box className={`container py-5 text-white`}>
                <NavbarArrowBack link={link}/> 
                <TitleDashboard title={title}/>
                {datas?.data.map((value, key) => {
                    return (
                        <Detailclient key={key} data={value}/> 
                    );
                })}
            </Box>
        </Box>
    );
}

export default DashboardListClient;
