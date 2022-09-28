import * as React from 'react';
import Custom from './detailInvoice.module.css';
import NavbarArrowBack from '../../components/Navbar/NavbarArrowBack';
import Detailinvoiceclient from '../../components/Detail/DetailInvoiceClient';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect } from 'react';

const link = '/';
const Detailinvoice = () => {
    const [dataApi, setDataApi] = React.useState('');
    useEffect(() => {
        function getApiData() {
            const paramApi = localStorage.getItem("id");
            axios.get(`http://122.248.192.108:8000/invoice/${paramApi}`)
                .then(res => {
                    setDataApi(res.data.data);
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getApiData();
    }, []);

    return (
        <Box className={Custom.background}>
            <Box className={`container py-5 text-white`}>
                <NavbarArrowBack link={link} />
                <Detailinvoiceclient status={dataApi.payment_status} data={dataApi} />
            </Box>
        </Box>
    );
}

export default Detailinvoice;
