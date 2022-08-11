import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import custom from './status.module.css';
import CircleIcon from '@mui/icons-material/Circle';

function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
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

const Status = (props) => {
    return (
        <Box sx={{
            display: 'grid',
            gridAutoColumns: '1fr',
            mb:2,
            mx: 20,
        }}>
            <Item className={custom.boxStatus} sx={{ 
                gridRow: '1', 
                color: '#131522',
                gridColumn: '1 / 2', 
                textAlign: 'left', 
                fontSize: '1.8rem', 
                borderRadius: 3,
                pt: 2.3,
                pl: 8,
                height: 80,
                bgcolor: '#E5E5E5',
            }}>
                Status
            </Item>
            <Item className={custom.boxDetail} sx={{ 
                gridRow: '1', 
                color: '#131522',
                gridColumn: '2 / 6', 
                textAlign: 'left', 
                fontSize: '1.2rem', 
                borderRadius: 3,
                p: 1,
                height: 80,
                bgcolor: '#E5E5E5',
            }}>
                <Item sx={{
                    bgcolor: 'rgba(216, 67, 67, 0.45)', 
                    color:'rgba(216, 67, 67, 0.89)', 
                    width:180, 
                    borderRadius: 6, 
                    pl:3, 
                    
                    mt:1.8
                }}>
                    <CircleIcon sx={{mr:2, mb:0.5}}/>{props.status}
                </Item>
            </Item>
        </Box>
    );
}

export default Status;
