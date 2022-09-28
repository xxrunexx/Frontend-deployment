import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import CircleIcon from '@mui/icons-material/Circle';
import custom from './updateInvoice.module.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import dateFormat from 'dateformat';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    // padding: theme.spacing(2),
    textAlign: 'left',
    backgroundColor: '#E5E5E5',
    color: '#131522',
    boxShadow: 'none',
}));

const Updateinvoice = ({data,dataDetail, status}) => {
    const history = useHistory();
    const convCreateAt = dateFormat(data.created_at, "yyyy-mm-dd");
    const convPaymentDue = dateFormat(data.payment_due, "yyyy-mm-dd");

    const handleDelete = (e) => {
        e.preventDefault();
        axios
         .delete(
            `http://122.248.192.108:8000/invoice/${data.id}`,
            
         )
         .then(function () {
            history.go(-1);
         })
    }

    const handleGoEdit = () => {
        history.push({
            pathname: "/formeditinvoice",
            state: {data: data},
        });
    };

    const handleUpdateStatus = (e) => {
        e.preventDefault();
        axios
         .put(
            'http://122.248.192.108:8000/invoice/update',
            {
                id: data.id,
                client_id: data.client_id,
                total: data.total,
                item: data.item,
                bill_issuer_id: data.bill_issuer_id,
                payment_due: data.payment_due,
                payment_status: 'paid',
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
         )
         .then(function() {
            history.go(-1);
         })
    }

    const handleSubmitInvoice = (e) => {
        e.preventDefault();
        axios
         .put(
            'http://122.248.192.108:8000/invoice/update',
            {
                id: data.id,
                client_id: data.client_id,
                total: data.total,
                item: data.item,
                bill_issuer_id: data.bill_issuer_id,
                payment_due: data.payment_due,
                payment_status: 'unpaid',
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
         )
         .then(function() {
            history.go(-1);
         })
    }

    return (
        <Box sx={{ flexGrow: 1}}>
            <Grid container justifyContent="center">
                <Grid item xs={8} >
                    <Item sx={{pt:4, pb:3, px:5, borderRadius:5}}>
                        <Box sx={{ flexGrow: 1}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} lg={5} >
                                    <Item>
                                        <Box sx={{ flexGrow: 1,}}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={4} >
                                                    <h3>Status</h3> 
                                                </Grid>
                                                <Grid item xs={12} md={5} sx={{mt:0.2}} >
                                                    <Item sx={{textAlign: 'center', bgcolor: 'rgba(216,67,67,0.45)', color: 'rgba(231,70,70,0.90)', 
                                                    py:0.8, borderRadius:6}}>
                                                        <CircleIcon sx={{mr:1, fontSize:'0.875rem'}}/>{status}
                                                    </Item>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={12} lg={7}>
                                    <Item>
                                        <Box sx={{ flexGrow: 1}}>
                                            <Grid container spacing={2} justifyContent="flex-end">
                                                {data.payment_status === 'draft' && <Grid item xs={12} md={2}>
                                                        <Item sx={{textAlign: 'center', bgcolor: '#6C6C73', py:1, borderRadius:2}}>
                                                            <Link onClick={handleGoEdit} component="button" underline="none" className={custom.link}>
                                                                {'Edit'}
                                                            </Link>
                                                        </Item>
                                                    </Grid>
                                                }
                                                <Grid item xs={12} md={2}>
                                                    <Item sx={{textAlign: 'center', bgcolor: 'rgba(231,70,70,0.90)', py:1, borderRadius:2}}>
                                                        <form onSubmit={handleDelete} method="post">
                                                            <Link component="button" underline="none" className={custom.link}>
                                                                {'Delete'}
                                                            </Link>
                                                        </form>
                                                    </Item> 
                                                </Grid>
                                                {data.payment_status === 'unpaid' && <Grid item xs={12} md={4}>
                                                        <Item sx={{textAlign: 'center', bgcolor: '#FFC700', py:1, borderRadius:2}}>
                                                        <form onSubmit={handleUpdateStatus} method="post">
                                                            <Link component="button" underline="none" className={custom.link}>
                                                                {'Mark as Paid'}
                                                            </Link>
                                                        </form>
                                                        </Item> 
                                                    </Grid>
                                                }
                                                {data.payment_status === 'draft' && <Grid item xs={12} md={4}>
                                                        <Item sx={{textAlign: 'center', bgcolor: '#FFC700', py:1, borderRadius:2}}>
                                                        <form onSubmit={handleSubmitInvoice} method="post">
                                                            <Link component="button" underline="none" className={custom.link}>
                                                                {'Submit Invoice'}
                                                            </Link>
                                                        </form>
                                                        </Item> 
                                                    </Grid>
                                                }
                                            </Grid>
                                        </Box>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </Item>
                </Grid>
                <Grid item xs={8} sx={{mt:2}} >
                    <Item sx={{py:7, px:5, borderRadius:5}}>
                        <Box sx={{ flexGrow: 1}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} lg={12} >
                                    <Item>
                                        <Box sx={{ flexGrow: 1,}}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={4} >
                                                    <h3>{data.id}</h3> 
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12} >
                                    <Item>
                                        <Box sx={{ flexGrow: 1,}}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={4} >
                                                    <h5>Invoice Date</h5> 
                                                    <span>{convCreateAt}</span>
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <h5>Bill To</h5> 
                                                    <span>{data.client_name}</span> 
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <h5>Send To</h5> 
                                                    <span>{data.client_email}</span> 
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12} >
                                    <Item>
                                        <Box sx={{ flexGrow: 1,}}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={4} >
                                                    <h5>Payment Date</h5> 
                                                    <span>{convPaymentDue}</span>
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <h5>Address</h5> 
                                                    <span>{data.client_address}</span> 
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <h5>From</h5> 
                                                    <span>{dataDetail.company_name}</span> 
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12} >
                                    <Item sx={{bgcolor:'#131522', color:'white', borderRadius:5, px:3, py:3}}>
                                        <Box sx={{ flexGrow: 1,}}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6} className={custom.responsive}>
                                                    <div className={`mb-3 ${custom.headInfo}`}>
                                                        <span>Item Name</span>
                                                    </div>
                                                    <div className={custom.detailInfo}>
                                                        <span>{data.item}</span>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={6} sx={{textAlign:'right'}} className={custom.responsive}>
                                                    <div className={`mb-3 ${custom.headInfo}`}>
                                                        <span>Total</span>
                                                    </div>
                                                    <div className={custom.detailInfo}>
                                                        <span>Rp. {data.total}</span>
                                                    </div> 
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Updateinvoice;
