import * as React from 'react';
import Custom from './editInvoice.module.css';
import NavbarArrowBack from '../../components/Navbar/NavbarArrowBack';
import Updateinvoice from '../../components/Detail/UpdateInvoice';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Editinvoice = () => {
    const location = useLocation();
    const [dataInvoice, setDataInvoice] = React.useState({ 
        id: '', 
        created_at: '', 
        client_name: '', 
        client_email: '',
        payment_due: '', 
        client_address: '',
        company_name: '',
        item: '',
        total: '',
        payment_status: '',
    });

    const [dataDetail, setDataDetail] = React.useState({
        company_name: '',
    })
    React.useEffect(() => {
        const getInvoices = async () => {
            await axios.get(
                `http://122.248.192.108:8000/invoice/${location.state.data.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response)=>{
                setDataInvoice({
                    id: response.data.data.id,
                    client_id: response.data.data.client_id,
                    created_at: response.data.data.created_at,
                    client_name: response.data.data.client_name,
                    client_email: response.data.data.client_email,
                    payment_due: response.data.data.payment_due,
                    client_address: response.data.data.client_address,
                    item: response.data.data.item,
                    total: response.data.data.total,
                    payment_status: response.data.data.payment_status,
                })
            });
        };
        const getBillIssuerDetail = async () => {
            await axios.get(
                `http://122.248.192.108:8000/billissuerdetail/${location.state.data.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response)=>{
                setDataDetail({
                    company_name: response.data.data.company_name,
                })
            });
        };
        getInvoices();
        getBillIssuerDetail();
    },[]);

    const link = '/dashboard';

    return (
        <Box className={Custom.background}>
            <Box className={`container py-5 text-white`}>
                <NavbarArrowBack link={link}/> 
                <Updateinvoice status={dataInvoice.payment_status} data={dataInvoice} dataDetail={dataDetail}/>
            </Box>
        </Box>
    );
}

export default Editinvoice;
