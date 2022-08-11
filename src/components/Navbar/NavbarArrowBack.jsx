import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import custom from './navbarArrowBack.module.css';
import { useHistory } from 'react-router-dom';

function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          color: 'white',
          fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
}

Item.propTypes = {
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};

const NavbarArrowBack = (props) => {
    const history = useHistory();
    const passHome= () => {
        history.push({
            pathname: props.link
        });
    };
    return (
        <Box sx={{
            display: 'grid',
            gridAutoColumns: '1fr',
            gap: 1,
            alignItems: 'center',
            mb: 2
        }}>
            <Item sx={{ 
                gridRow: '1', 
                gridColumn: '1', 
                textAlign: 'left', 
                fontSize: '2.5rem', 
                borderRadius: 1,
                p: 1,
                height: 80,
            }}>
                <Link component="button" underline="none" onClick={passHome}>
                    <ArrowCircleLeftIcon className={custom.arrowIcon} sx={{
                        mx:1,
                        color: '#FFC700'
                    }}/>
                </Link>
            </Item>
        </Box>
    );
}

export default NavbarArrowBack;
