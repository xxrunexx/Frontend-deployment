import * as React from 'react';
import Custom from './dashboard.module.css';
import NavbarArrowBack from '../../components/Navbar/NavbarArrowBack';
import Box from '@mui/material/Box';
import Detaildashboard from '../../components/Detail/DetailDashboard';
import TitleDashboard from '../../components/Detail/TitleDashboard';
import axios from 'axios';

const Dashboarddraft = () => {
    const [datas, setDatas] = React.useState(null);
    React.useEffect(() => {
        const getDraftInvoice = async () => {
            await axios.get(
                'http://122.248.192.108:8000/invoice',
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response)=>{
                // Filtering data from API to get only paid invoice
                setDatas(response.data.data.filter(i => {return i.payment_status === 'draft'}));
            });
        };
        getDraftInvoice();
    },[]);
    
    const status = 'Draft';
    const link = '/dashboard';
    const title = 'Draft';
    return (
        <Box className={Custom.background}>
            <Box className={`container py-5 text-white`}>
                <NavbarArrowBack link={link}/>
                <TitleDashboard title={title}/>
                {datas?.map((value, key) => {
                    return (
                        <Detaildashboard key={key} status={status} data={value}/> 
                    )
                })}
            </Box>
        </Box>
    );
}

export default Dashboarddraft;
