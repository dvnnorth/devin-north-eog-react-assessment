import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import NavDrawer from './components/NavDrawer';
import { Dashboard, MapVis, ChartVis, FourOhFour } from './layouts';

const store = createStore();
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: 'rgb(39,49,66)'
    },
    secondary: {
      main: 'rgb(197,208,222)'
    },
    background: {
      main: 'rgb(226,231,238)'
    }
  }
});

const themeWithHeaderPadding = {
  ...theme,
  addHeaderPadding: {
    paddingTop: 56 + 10,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      paddingTop: 48 + 10
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64 + 10
    }
  }
};

const App = () => (
  <Router>
    <MuiThemeProvider theme={themeWithHeaderPadding}>
      <CssBaseline />
      <Provider store={store}>
        <Wrapper>
          <Header />
          <NavDrawer />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/map" component={MapVis} />
            <Route path="/chart" component={ChartVis} />
            <Route component={FourOhFour} />
          </Switch>
          <ToastContainer />
        </Wrapper>
      </Provider>
    </MuiThemeProvider>
  </Router>
);

export default App;
