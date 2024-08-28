import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';

const AnimatedButton = animated(Button);

const Navbar = () => {
  const buttonProps = useSpring({
    from: { transform: 'translateY(-20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
    config: { tension: 300, friction: 10 },
  });

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1 }}>
          Zynco
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {['Home', 'Events', 'Login', 'Signup'].map((text, index) => (
            <AnimatedButton
              key={text}
              color="inherit"
              component={Link}
              to={text === 'Home' ? '/' : `/${text.toLowerCase()}`}
              style={{
                ...buttonProps,
                transition: `all 0.3s ease-in-out`,
                delay: index * 100,
              }}
              sx={{
                '&:hover': {
                  backgroundColor: '#34495e',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                },
              }}
            >
              {text}
            </AnimatedButton>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;