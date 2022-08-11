import React from 'react'
import { styled } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Sidenav from '../SideNav/SideNav';
import useState from 'react-hook-use-state';
import Sidenavicon from '../SideNav/SideNavIcon';
import Button from '@mui/material/Button';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import custom from './dashboardBi.module.css';
import { InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useHistory } from 'react-router-dom';
import Detaildashboard from './DetailDashboard';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#131522",
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#131522",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#131522",
      },
      "& .MuiOutlinedInput-input": {
        color: "#131522",
        padding: "10px",
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "#131522"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "#131522"
      },
      "& .MuiInputLabel-outlined": {
        color: "#131522"
      },
      "&:hover .MuiInputLabel-outlined": {
        color: "#131522"
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "#131522"
      }
    },
    noBorder: {
        border: "none",
    },
});

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: 'transparent',
    color: 'white',
    boxShadow: 'none'
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: '#FFC700',
    border: '1px solid #131522',
    borderRadius:3,
    boxShadow: 24,
    py:2,
    px:1
};


const Dashboardbipagecard = ({data}) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = useState({
    nik:data.client_nik,
    phone:data.client_phone,
    address:data.client_address,
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
        'http://18.140.197.103:8000/client',
        {   
          id: data.client_id,
          nik: parseInt(values.nik),
          name: data.client_name,
          phone: values.phone,
          address: values.address,
          email: data.client_email,
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
        history.go(0);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
  }

  return (
    <>
      <Grid container sx={{color:'white'}}>
          <Grid item xs={12} container>
              <Detaildashboard data={data} modal={handleOpen}/>
          </Grid>
      </Grid>
      <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={custom.modalBox}>
                    <Grid container sx={{color:'#131522'}}>
                        <Grid item container justifyContent="end">
                            <Button variant="text" sx={{color:'#131522', minWidth:'40px', padding:0}} onClick={handleClose}><CloseIcon/></Button>
                        </Grid>
                    </Grid>
                    <Grid container sx={{color:'#131522'}} justifyContent="center">
                        <Grid item xs={9}>
                          <form onSubmit={handleSubmit} method="POST">
                              <Grid container justifyContent="center" alignItems="center">
                                  <Grid item xs={12} md={3}>
                                      <AccountCircleOutlinedIcon sx={{fontSize:'5rem'}}/>
                                  </Grid>
                                  <Grid item xs={12} md={9}>
                                      <h2 className={custom.topModal}>{data.client_name}</h2>
                                      <p className={custom.topModal}>{data.client_email}</p>
                                  </Grid>
                              </Grid>
                              <Grid container justifyContent="center" alignItems="center" sx={{mt:4}}>
                                  <TextField
                                      required
                                      sx={{bgcolor: '#FFFFFF', borderRadius:2}}
                                      className={classes.root}
                                      id="outlined-uncontrolled"
                                      label="NIK"
                                      fullWidth
                                      defaultValue={data.client_nik}
                                      onChange={handleChange('nik')}
                                      variant="filled"
                                      InputProps={{
                                          startAdornment: (
                                              <InputAdornment position="start">
                                                  <EmailIcon />
                                              </InputAdornment>
                                          ),
                                      }}
                                  />
                              </Grid>
                              <Grid container justifyContent="center" alignItems="center" sx={{mt:2}}>
                                  <TextField
                                      required
                                      sx={{bgcolor: '#FFFFFF', borderRadius:2}}
                                      className={classes.root}
                                      id="outlined-uncontrolled"
                                      label="Phone Number"
                                      fullWidth
                                      defaultValue={data.client_phone}
                                      onChange={handleChange('phone')}
                                      variant="filled"
                                      InputProps={{
                                          startAdornment: (
                                              <InputAdornment position="start">
                                                  <LockIcon />
                                              </InputAdornment>
                                          ),
                                          classes:{notchedOutline:classes.noBorder},
                                      }}
                                  />
                              </Grid>
                              <Grid container justifyContent="center" alignItems="center" sx={{mt:2}}>
                                  <TextField
                                      required
                                      sx={{bgcolor: '#FFFFFF', borderRadius:2}}
                                      className={classes.root}
                                      id="outlined-uncontrolled"
                                      label="Address"
                                      fullWidth
                                      defaultValue={data.client_address}
                                      onChange={handleChange('address')}
                                      variant="filled"
                                      InputProps={{
                                          startAdornment: (
                                              <InputAdornment position="start">
                                                  <LockIcon />
                                              </InputAdornment>
                                          ),
                                          classes:{notchedOutline:classes.noBorder},
                                      }}
                                  />
                              </Grid>
                              <Grid container justifyContent="center" alignItems="center" sx={{mt:4, mb:2}}>
                                  <Button 
                                      variant="contained" 
                                      fullWidth 
                                      sx={{
                                          borderRadius:2, 
                                          color:'#FFC700', 
                                          bgcolor:'#131522'
                                      }} 
                                      className={custom.modalUpdate}
                                      type="submit">
                                          Update
                                  </Button>
                              </Grid>
                          </form>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
    </>  
      
  )
}


export default Dashboardbipagecard;