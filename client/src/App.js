import React, { useMemo } from 'react';
import { Routes, Route} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme.js';
import HomeScreen from './components/screens/HomeScreen.js';
import LoginScreen from './components/screens/LoginScreen.js';
import RegisterScreen from './components/screens/RegisterScreen.js';
import SummaryScreen from './components/screens/SummaryScreen.js';
import Navbar from './components/Navbar.js';

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
          <Navbar />
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/login" element={<LoginScreen />} />
            <Route exact path="/register" element={<RegisterScreen />} />
            <Route exact path="/summary" element={<SummaryScreen/>}></Route>
          </Routes>
        
      </ThemeProvider>
    </div>
  );
}

export default App;
