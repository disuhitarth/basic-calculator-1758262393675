```jsx
import React, { useState, useEffect } from 'react';
import { 
  Container,
  Paper,
  Grid,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const CalcButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
  minWidth: '64px',
  minHeight: '64px',
  fontSize: '1.25rem'
}));

const CalcDisplay = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'right',
  minHeight: '80px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}));

const App = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [history, setHistory] = useState([]);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;
      if (/[0-9.]/.test(key)) {
        handleNumber(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperation(key);
      } else if (key === 'Enter') {
        handleEquals();
      } else if (key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, operation, prevValue]);

  const handleNumber = (num) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      if (num === '.' && display.includes('.')) return;
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op) => {
    if (prevValue === null) {
      setPrevValue(parseFloat(display));
      setOperation(op);
      setShouldResetDisplay(true);
    } else {
      handleEquals();
      setOperation(op);
    }
  };

  const handleEquals = () => {
    if (prevValue === null || operation === null) return;

    const current = parseFloat(display);
    let result;

    try {
      switch (operation) {
        case '+':
          result = prevValue + current;
          break;
        case '-':
          result = prevValue - current;
          break;
        case '*':
          result = prevValue * current;
          break;
        case '/':
          if (current === 0) throw new Error('Division by zero');
          result = prevValue / current;
          break;
        default:
          return;
      }

      // Format result and update history
      const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '');
      const calculation = `${prevValue} ${operation} ${current} = ${formattedResult}`;
      
      setHistory(prev => [...prev.slice(-9), calculation]);
      setDisplay(formattedResult);
      setPrevValue(null);
      setOperation(null);
      setShouldResetDisplay(true);
      
    } catch (error) {
      setDisplay('Error');
      setPrevValue(null);
      setOperation(null);
      setShouldResetDisplay(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <CalcDisplay elevation={1}>
              <Typography variant="h4" component="div">
                {display}
              </Typography>
              {operation && (
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {`${prevValue} ${operation}`}
                </Typography>
              )}
            </CalcDisplay>

            <Box sx={{ mt: 2 }}>
              <Grid container>
                <Grid item xs={12}>
                  <CalcButton fullWidth variant="contained" color="error" onClick={handleClear}>
                    C
                  </CalcButton>
                </Grid>
                {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
                  <Grid item xs={3} key={btn}>
                    <CalcButton
                      fullWidth
                      variant={['+', '-', '*', '/', '='].includes(btn) ? 'contained' : 'outlined'}
                      color={btn === '=' ? 'primary' : 'inherit'}
                      onClick={() => {
                        if (btn === '=') handleEquals();
                        else if (['+', '-', '*', '/'].includes(btn)) handleOperation(btn);
                        else handleNumber(btn);
                      }}
                    >
                      {btn}
                    </CalcButton>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              History
              <Button size="small" onClick={handleClearHistory} sx={{ float: 'right' }}>
                Clear
              </Button>
            </Typography>
            <List dense>
              {history.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
```