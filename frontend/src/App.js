import React from 'react';
import { Grid, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// Colors from the target screenshot
const colors = {
  background: 'rgb(97, 113, 119)',
  text: '#FFFFFF',
};

// Logo positioned at the top-left
const Logo = styled('img')({
  position: 'absolute',
  top: '20px', // Reduced from 40px
  left: '20px', // Reduced from 40px
  width: '100px', // Reduced from 120px
});

// Set background to transparent to fix blue lines showing through.
const StyledButton = styled(Button)({
  padding: 0,
  width: '100%',
  maxWidth: '300px', // Added max width to prevent buttons from getting too large
  height: 'auto',
  display: 'block',
  backgroundColor: 'transparent', 
  '&:hover': {
    backgroundColor: 'transparent', 
    filter: 'brightness(1.1)',
  },
});

// ButtonImage component with rectangular edges
const ButtonImage = styled('img')({
  width: '100%',
  height: 'auto',
  display: 'block',
});

// Styled component for the labels
const LayoutLabel = styled(Typography)({
  color: colors.text,
  marginTop: '8px', // Reduced from 16px
  textAlign: 'center',
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
  fontSize: '0.9rem', // Added smaller font size
});


function App() {
  const getOperatingSystem = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('win')) return 'Windows';
    if (userAgent.includes('linux')) {
      if (userAgent.includes('arm') || userAgent.includes('aarch64')) return 'Raspberry Pi';
      return 'Linux';
    }
    return 'Unknown OS';
  };

  const handleButtonClick = async (buttonNumber) => {
    try {
      const os = getOperatingSystem();
      const message = `Button "${buttonNumber}" was pressed on ${os}`;
      console.log(message);

      const backendUrl = '/api/send-display-number';
      await axios.post(backendUrl, { message: buttonNumber.toString() });

      console.log('Request sent to backend successfully!');
    } catch (error) {
      console.error('Error calling the backend API:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: colors.background,
        position: 'relative',
        padding: '10px', // Reduced from 20px
      }}
    >
      <Logo src="/assets/50hertz_logo.png" alt="50Hertz Logo" />
      
      <Grid 
        container 
        spacing={2} // Reduced spacing from 5
        maxWidth="md" // Changed from lg to md to make container smaller
        justifyContent="center" 
        sx={{ 
          mt: 6, // Reduced from 8
          mx: 'auto', // Added horizontal auto margin
          px: 2 // Added horizontal padding
        }}
      >
        {/* --- Layout A --- */}
        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <StyledButton
            onClick={() => handleButtonClick(1)}
            disableRipple
          >
            <ButtonImage
              src="/assets/btn_layout1.png"
              alt="Layout A"
            />
          </StyledButton>
          <LayoutLabel>
            Layout A
          </LayoutLabel>
        </Grid>

        {/* --- Layout B --- */}
        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <StyledButton
            onClick={() => handleButtonClick(2)}
            disableRipple
          >
            <ButtonImage
              src="/assets/btn_layout2.png"
              alt="Layout B"
            />
          </StyledButton>
          <LayoutLabel>
            Layout B
          </LayoutLabel>
        </Grid>

        {/* --- Layout C --- */}
        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <StyledButton
            onClick={() => handleButtonClick(3)}
            disableRipple
          >
            <ButtonImage
              src="/assets/btn_layout3.png"
              alt="Layout C"
            />
          </StyledButton>
          <LayoutLabel>
            Layout C
          </LayoutLabel>
        </Grid>

        {/* --- Layout D --- */}
        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <StyledButton
            onClick={() => handleButtonClick(4)}
            disableRipple
          >
            <ButtonImage
              src="/assets/btn_layout4.png"
              alt="Layout D"
            />
          </StyledButton>
          <LayoutLabel>
            Layout D
          </LayoutLabel>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;