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
import Select from '@mui/material/Select';
import axios from 'axios';
import jwt_decode from "jwt-decode";

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
    const classes = useStyles();
    const id = React.useRef('');
    const token = React.useRef('');
    token.current = localStorage.getItem('token');
    const [datas, setDatas] = React.useState(null);
    const [values, setValues] = React.useState({
        clientID:0,
        email:'',
        address:'',
        invoiceDate:'',
        terms:7,
        itemName:'',
        total:0,
    });
    const credential = jwt_decode(token.current);
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
    
    const handlerUserData = (event) => {
      id.current = event.target.value;
      axios.get(
          `http://18.140.197.103:8000/client/${id.current}`,
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token.current}`,
              },
          }
      )
      .then((response)=>{
        setValues({
          ...values,
          clientID: id.current,
          email: response.data.data.email,
          address: response.data.data.address,
        })
      });
    }

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
      await axios.post(
          'http://18.140.197.103:8000/invoice/add',
          {   
              client_id: values.clientID,
              item: values.itemName,
              total: parseInt(values.total),
              bill_issuer_id: credential.userId,
              payment_terms: values.terms
          },
          {
              headers: {
                  'Content-Type': 'application/json',
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
    
    return (
    <Box sx={{ flexGrow: 1}}>
      <Grid container justifyContent="center">
        <Grid item xs={8} >
          <Item><h1>New Invoice</h1></Item>
          <form onSubmit={handleSubmit} method="post">
            <Item>
              <span className={custom.titleInput}>Client's Name</span>
              <Select
                  required
                  sx={{bgcolor: '#FFFFFF', borderRadius:2}}
                  className={classes.root}
                  select 
                  value={values.clientID} 
                  onChange={handlerUserData}
                  fullWidth
                  InputProps={{
                      classes:{notchedOutline:classes.noBorder}
                  }}
              >   
                  <MenuItem disabled value={0}><em>Select Client</em></MenuItem>
                  {datas?.data.map((value, key) => {
                    return (
                      <MenuItem key={key} value={value.id} data={value}>{value.name}</MenuItem>
                    );
                  })}
              </Select>
            </Item>
            <Item>
              <span className={custom.titleInput}>Client's Email</span>
              <TextField
                sx={{bgcolor: '#FFFFFF', borderRadius:2}}
                className={classes.root}
                placeholder="Input Client Email ..."
                onChange={handleChange('email')}
                fullWidth
                value={values.email}
                disabled
                InputProps={{
                  classes:{notchedOutline:classes.noBorder}
                }}
              />
            </Item>
            <Item>
              <span className={custom.titleInput}>Client's Address</span>
              <TextField
                sx={{bgcolor: '#FFFFFF', borderRadius:2}}
                className={classes.root}
                placeholder="Input Client Address ..."
                onChange={handleChange('address')}
                fullWidth
                value={values.address}
                disabled
                InputProps={{
                  classes:{notchedOutline:classes.noBorder}
                }}
              />
            </Item>
            <Item>
              <Box sx={{ flexGrow: 1}}>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={12} md={6} >
                      <Item className={custom.multipleInput}>
                          <span className={custom.titleInput}>Invoice Date</span>
                          <TextField
                              sx={{bgcolor: '#FFFFFF', borderRadius:2}}
                              className={classes.root}
                              placeholder="Input Date for Invoice ..."
                              type="date"
                              defaultValue="2022-07-13"
                              onChange={handleChange('invoiceDate')}
                              fullWidth
                              InputProps={{
                                  classes:{notchedOutline:classes.noBorder}
                              }}
                          />
                      </Item>
                  </Grid>
                  <Grid item xs={12} md={6} >
                      <Item className={custom.multipleInput}>
                          <span className={custom.titleInput}>Payment Terms</span>
                          <TextField
                              required
                              sx={{bgcolor: '#FFFFFF', borderRadius:2}}
                              className={classes.root}
                              select
                              value={values.terms}
                              onChange={handleChange('terms')}
                              fullWidth
                              InputProps={{
                                  classes:{notchedOutline:classes.noBorder}
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
              <Box sx={{ flexGrow: 1}}>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={12} md={6} >
                      <Item className={custom.multipleInput}>
                          <span className={custom.titleInput}>Item Name</span>
                          <TextField
                              required
                              sx={{bgcolor: '#FFFFFF', borderRadius:2}}
                              className={classes.root}
                              placeholder="Input Item Name for Invoice ..."
                              onChange={handleChange('itemName')}
                              fullWidth
                              InputProps={{
                                  classes:{notchedOutline:classes.noBorder}
                              }}
                          />
                      </Item>
                  </Grid>
                  <Grid item xs={12} md={6} >
                      <Item className={custom.multipleInput}>
                          <span className={custom.titleInput}>Total</span>
                          <TextField
                              required
                              sx={{bgcolor: '#FFFFFF', borderRadius:2}}
                              className={classes.root}
                              placeholder="Input Total ..."
                              onChange={handleChange('total')}
                              fullWidth
                              InputProps={{
                                  classes:{notchedOutline:classes.noBorder}
                              }}
                          />
                      </Item>
                  </Grid>
                </Grid>
              </Box>
            </Item>
            <Item>
            <Box sx={{ flexGrow: 1, mt:5}}>
                <Grid container justifyContent="space-between" spacing={2}>
                  <Grid item xs={12} md={3} >
                      <Item sx={{textAlign: 'center',}} className={`${custom.multipleInput}`}>
                          <Box 
                              sx={{
                                  bgcolor: '#D84343', 
                                  borderRadius:2, 
                                  color:'black', 
                                  py:1, 
                                  fontSize:'1.2rem'
                          }}>
                              <Link component="button" underline="none" className={custom.addNewItem} onClick={linkDiscard}>
                                  {'DISCARD'}
                              </Link>
                          </Box>
                      </Item>
                  </Grid>
                  <Grid item xs={12} md={3} >
                      <Item sx={{textAlign: 'center',}} className={`${custom.multipleInput}`}>
                          <Box 
                              sx={{
                                  bgcolor: '#FFC700', 
                                  borderRadius:2, 
                                  color:'black', 
                                  py:1, 
                                  fontSize:'1.2rem'
                          }}>
                              <Link component="button" underline="none" className={custom.addNewItem} type="submit">
                                  {'CREATE INVOICE'}
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
