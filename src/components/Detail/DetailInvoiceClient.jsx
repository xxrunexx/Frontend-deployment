import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CircleIcon from '@mui/icons-material/Circle';
import custom from './detailInvoice.module.css';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    backgroundColor: '#E5E5E5',
    color: '#131522',
    boxShadow: 'none',
}));

const Detailinvoiceclient = ({ status, data }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center">
                <Grid item xs={8} >
                    <Item sx={{ pt: 4, pb: 3, px: 5, borderRadius: 5 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} lg={5} >
                                    <Item>
                                        <Box sx={{ flexGrow: 1, }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={4} >
                                                    <h3>Status</h3>
                                                </Grid>
                                                <Grid item xs={12} md={5} sx={{ mt: 0.2 }} >
                                                    <Item sx={{ textAlign: 'center', bgcolor: 'rgba(216,67,67,0.45)', color: 'rgba(231,70,70,0.90)', py: 0.8, borderRadius: 6 }}>
                                                        <CircleIcon sx={{ mr: 1, fontSize: '0.875rem' }} />{status}
                                                    </Item>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </Item>
                </Grid>
                <Grid item xs={8} sx={{ mt: 2 }} >
                    <Item sx={{ py: 7, px: 5, borderRadius: 5 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} lg={12} >
                                    <Item>
                                        <Box sx={{ flexGrow: 1, }}>
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
                                        <Box sx={{ flexGrow: 1, }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={4} >
                                                    <h5>Invoice Date</h5>
                                                    <span>{data.created_at}</span>
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
                                        <Box sx={{ flexGrow: 1, }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={4} >
                                                    <h5>Payment Date</h5>
                                                    <span>{data.payment_due}</span>
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <h5>Address</h5>
                                                    <span>{data.client_address}</span>
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <h5>From</h5>
                                                    <span>{data.bill_issuer_name}</span>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12} >
                                    <Item sx={{ bgcolor: '#131522', color: 'white', borderRadius: 5, px: 3, py: 3 }}>
                                        <Box sx={{ flexGrow: 1, }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6} className={custom.responsive} >
                                                    <div className={`mb-3 ${custom.headInfo}`}>
                                                        <span>Item Name</span>
                                                    </div>
                                                    <div className={custom.detailInfo}>
                                                        <span>{data.item}</span>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={6} sx={{ textAlign: 'right' }} className={custom.responsive}>
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

        // <h2>{data.client_name}</h2>
    );
}

export default Detailinvoiceclient;
