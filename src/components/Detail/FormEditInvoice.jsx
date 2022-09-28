import * as React from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import custom from './formInvoice.module.css';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useLocation } from 'react-router-dom';
import dateFormat from 'dateformat';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1.5),
  textAlign: 'left',
  backgroundColor: '#131522',
  color: 'white',
  boxShadow: 'none'
}));

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "& .MuiOutlinedInput-input": {
      color: "black",
      padding: "10px 14px",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "black"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "black"
    },
    "& .MuiInputLabel-outlined": {
      color: "black"
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "black"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "black"
    }
  },
  noBorder: {
    border: "none",
  },
});

const Forminvoice = () => {
  const location = useLocation();
  const classes = useStyles();
  const id = React.useRef('');
  const token = React.useRef('');
  token.current = localStorage.getItem('token');
  const [values, setValues] = React.useState({
    clientID: 0,
    email: '',
    address: '',
    invoiceDate: '',
    paymentTerms: 7,
    item: location.state.data.item,
    total: location.state.data.total,
    paymentStatus: 'draft',
  });
  const credential = jwt_decode(token.current);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const days = [
    {
      value: 7,
      label: '7 Day',
    },
    {
      value: 10,
      label: '10 Day',
    },
    {
      value: 30,
      label: '30 Day',
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      'http://122.248.192.108:8000/invoice/update',
      {
        id: location.state.data.id,
        client_id: location.state.data.client_id,
        total: parseInt(values.total),
        item: values.item,
        bill_issuer_id: credential.userId,
        payment_terms: values.paymentTerms,
        payment_status: values.paymentStatus,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: 'Bearer token...',
        },
      }
    )
      .then(function (response) {
        // handle success
        console.log('axios', response);
        history.push({
          pathname: "/dashboard",
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  const history = useHistory();
  const linkDiscard = () => {
    history.push({
      pathname: '/dashboard'
    })
  }
  const convDate = dateFormat(location.state.data.created_at, "yyyy-mm-dd")

  return (
    <Box sx={{ flexGrow: 1 }} className={custom.background}>
      <Grid container justifyContent="center">
        <Grid item xs={8} >
          <Item><h1>Edit Invoice</h1></Item>
          <form onSubmit={handleSubmit} method="post">
            <Item>
              <span className={custom.titleInput}>Client's Name</span>
              <TextField
                sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
                className={classes.root}
                fullWidth
                value={location.state.data.client_name}
                disabled
                InputProps={{
                  classes: { notchedOutline: classes.noBorder }
                }}
              />
            </Item>
            <Item>
              <span className={custom.titleInput}>Client's Email</span>
              <TextField
                sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
                className={classes.root}
                fullWidth
                value={location.state.data.client_email}
                disabled
                InputProps={{
                  classes: { notchedOutline: classes.noBorder }
                }}
              />
            </Item>
            <Item>
              <span className={custom.titleInput}>Client's Address</span>
              <TextField
                sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
                className={classes.root}
                fullWidth
                value={location.state.data.client_address}
                disabled
                InputProps={{
                  classes: { notchedOutline: classes.noBorder }
                }}
              />
            </Item>
            <Item>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={12} md={6} >
                    <Item className={custom.multipleInput}>
                      <span className={custom.titleInput}>Invoice Date</span>
                      <TextField
                        sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
                        className={classes.root}
                        placeholder="Input Date for Invoice ..."
                        type="date"
                        defaultValue={convDate}
                        disabled
                        fullWidth
                        InputProps={{
                          classes: { notchedOutline: classes.noBorder }
                        }}
                      />
                    </Item>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <Item className={custom.multipleInput}>
                      <span className={custom.titleInput}>Payment Terms</span>
                      <TextField
                        sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
                        className={classes.root}
                        select
                        value={values.paymentTerms}
                        onChange={handleChange('paymentTerms')}
                        fullWidth
                        InputProps={{
                          classes: { notchedOutline: classes.noBorder }
                        }}
                      >
                        {days.map((option, key) => (
                          <MenuItem key={key} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </Item>
            <Item>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={12} md={6} >
                    <Item className={custom.multipleInput}>
                      <span className={custom.titleInput}>Item Name</span>
                      <TextField
                        required
                        sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
                        className={classes.root}
                        placeholder={location.state.data.item}
                        onChange={handleChange('item')}
                        fullWidth
                        InputProps={{
                          classes: { notchedOutline: classes.noBorder }
                        }}
                      />
                    </Item>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <Item className={custom.multipleInput}>
                      <span className={custom.titleInput}>Total</span>
                      <TextField
                        required
                        sx={{ bgcolor: '#FFFFFF', borderRadius: 2 }}
                        className={classes.root}
                        placeholder={location.state.data.total.toString()}
                        onChange={handleChange('total')}
                        fullWidth
                        InputProps={{
                          classes: { notchedOutline: classes.noBorder }
                        }}
                      />
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </Item>
            <Item>
              <Box sx={{ flexGrow: 1, mt: 5 }}>
                <Grid container justifyContent="space-between" spacing={2}>
                  <Grid item xs={12} md={3} >
                    <Item sx={{ textAlign: 'center', }} className={`${custom.multipleInput}`}>
                      <Box
                        sx={{
                          bgcolor: '#D84343',
                          borderRadius: 2,
                          color: 'black',
                          py: 1,
                          fontSize: '1.2rem'
                        }}>
                        <Link component="button" underline="none" className={custom.addNewItem} onClick={linkDiscard}>
                          {'DISCARD'}
                        </Link>
                      </Box>
                    </Item>
                  </Grid>
                  <Grid item xs={12} md={3} >
                    <Item sx={{ textAlign: 'center', }} className={`${custom.multipleInput}`}>
                      <Box
                        sx={{
                          bgcolor: '#FFC700',
                          borderRadius: 2,
                          color: 'black',
                          py: 1,
                          fontSize: '1.2rem'
                        }}>
                        <Link component="button" underline="none" className={custom.addNewItem} type="submit">
                          {'EDIT INVOICE'}
                        </Link>
                      </Box>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </Item>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Forminvoice;
