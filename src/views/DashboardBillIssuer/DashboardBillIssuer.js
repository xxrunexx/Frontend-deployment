import * as React from 'react';
import Box from '@mui/material/Box';
import Custom from './dashboardBillIssuer.module.css';
import Dashboardbipage from '../../components/Detail/DashboardBiPage';
import Dashboardbipagecard from '../../components/Detail/DashboardBiPageCard';
import jwt_decode from "jwt-decode";
import axios from 'axios';

const Dashboardbillissuer = () => {
    const [dataApi, setDataApi] = React.useState(null);

    React.useEffect(() => {
        const getInvoices = async () => {
            await axios.get(
                'http://122.248.192.108:8000/invoice',
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then((response) => {
                    setDataApi(response.data.data);
                });
        };
        getInvoices();
    }, []);


    const token = localStorage.getItem("token");
    let authData = jwt_decode(token);
    return (
        <Box className={Custom.background}>
            <Dashboardbipage auth={authData} />
            {dataApi?.map((value, key) => {
                return (
                    <Dashboardbipagecard key={key} data={value} auth={authData} />
                );
            })}
        </Box>
    );
}

export default Dashboardbillissuer;
