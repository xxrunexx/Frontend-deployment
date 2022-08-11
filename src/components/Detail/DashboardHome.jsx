import React from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import custom from './dashboardHome.module.css';
import { InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
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

const Dashboardhome = () => {
    const history = useHistory();
    const classes = useStyles();
    const [name, setName] = React.useState('');
    const handleChange = (e) => {
        if (e.target) {
            setName(e.target.value);
        }
    }

    const passSearch = (e) => { // Handle Submit
        localStorage.setItem("id", name);
        history.push({
            pathname: "/detail",
        });
    };
    const passDashboard = () => {
        history.push({
            pathname: "/dashboard",
        });
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center">
                <Grid
                    item
                    xs={10}
                >
                    <Box sx={{ flexGrow: 1, py: 10 }}>
                        <Grid container sx={{ color: 'white', mb: 5 }}>
                            <Grid
                                item
                                xs={6}
                                container
                                justifyContent="start"
                                alignItems='center'
                            >
                                <Item>
                                    <h1>Invoices</h1>
                                </Item>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                container
                                justifyContent="end"
                                alignItems='center'
                                sx={{ marginLeft: '-1.2%' }}
                            >
                                <Item>
                                    <Button
                                        variant="contained"
                                        className={`${custom.btn} ${custom.btnWidth}`}
                                        onClick={passDashboard}
                                    >
                                        Go To Dashboard
                                    </Button>
                                </Item>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ color: 'white', pt: 2 }}>
                            <Grid item xs={12} container justifyContent="start">
                                <TextField
                                    sx={{ bgcolor: '#FFFFFF', borderRadius: 2.5 }}
                                    className={classes.root}
                                    placeholder="Search"
                                    onChange={handleChange}
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button
                                                    variant="contained"
                                                    className={custom.btn}
                                                    onClick={passSearch}
                                                    sx={{
                                                        py: 1.2,
                                                        bgcolor: '#FFC700',
                                                        color: '#131522',
                                                        borderRadius: 2
                                                    }}>Go</Button>
                                            </InputAdornment>
                                        ),
                                        classes: { notchedOutline: classes.noBorder },
                                        style: {
                                            paddingRight: '0',
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ color: 'white', pt: 7 }}>
                            <Grid item xs={12} container justifyContent="start" sx={{ fontSize: '2rem' }}>
                                <span>{'To input by invoice_id, don’t use white space'}</span>
                            </Grid>
                            <Grid item xs={12} container justifyContent="start" sx={{ ml: 8, mb: 3, fontSize: '1.5rem' }}>
                                <span>{'> Example : 5921, 621, 51, 21'}</span>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboardhome;
