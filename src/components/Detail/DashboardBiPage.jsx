import React from 'react';
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
import { useHistory } from 'react-router-dom';

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
    width: '100%',
    bgcolor: '#FFC700',
    border: '1px solid #131522',
    borderRadius:3,
    boxShadow: 24,
    py:2,
    px:1
};

const Dashboardbipage = ({auth}) => {
    const history = useHistory();
    const [show, setShow] = useState(true);
    const handle = () => {
        setShow(!show);
    }
    const classes = useStyles();

    const newClient = () => {
        history.push({
            pathname: "/addClient",
        });
    }
    const newInvoice = () => {
        history.push({
            pathname: "/addInvoice",
        });
    }
    const pushToDashboardClient = () => {
        history.push({
            pathname: "/",
        });
    }

    const logout = () => {
        localStorage.setItem("loggedIn", "guest");
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    return (
        <Box sx={{ flexGrow: 1}}>
            <Grid>
                <Grid 
                    item 
                    xs={show ? 2 : 1} 
                    container 
                    justifyContent="center" 
                    sx={{
                        color: '#131522', 
                        backgroundColor: '#FFC700',
                        position:'fixed',
                        py:2
                    }}
                >
                    {show ? <Sidenav show={handle} auth={auth} logout={logout}/> : <Sidenavicon show={handle} logout={logout}/>}
                </Grid>
                <Grid 
                    item 
                    xs={9} 
                    container 
                    justifyContent="center" 
                    sx={{
                        mx: show ? '21%' : '16%',
                        py:8.9
                    }}
                >
                    <Box sx={{ flexGrow: 1}}>
                        <Grid container sx={{color:'white'}}>
                            <Grid 
                                item 
                                xs={4} 
                                container 
                                justifyContent="start"
                            >
                                <Item>
                                    <h1>Invoices</h1>
                                </Item>
                            </Grid>
                            <Grid 
                                item 
                                xs={8} 
                                container 
                                justifyContent="end" 
                                alignItems='center'
                                sx={{marginLeft:'-0.5%'}}
                            >
                                <Item>
                                    <Button 
                                        variant="contained" 
                                        className={`${custom.btn} ${custom.btnWidth}`}
                                        onClick={newClient}
                                    >
                                        <AddCircleOutlinedIcon sx={{marginRight:'4%'}}/>New Client
                                    </Button>
                                </Item>
                                <Item sx={{marginLeft:'8%'}}>
                                    <Button 
                                        variant="contained" 
                                        className={`${custom.btn} ${custom.btnWidth}`}
                                        onClick={newInvoice}
                                    >
                                        <AddCircleOutlinedIcon sx={{marginRight:'4%'}}/>New Invoice
                                    </Button>
                                </Item>
                                <Item sx={{marginLeft:'8%'}}>
                                    <Button 
                                        variant="contained" 
                                        className={`${custom.btn} ${custom.btnWidth}`}
                                        onClick={pushToDashboardClient}
                                    >
                                        <SearchIcon sx={{marginRight:'4%'}}/>Search
                                    </Button>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboardbipage;
