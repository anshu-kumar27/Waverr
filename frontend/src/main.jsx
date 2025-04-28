// main.jsx or index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import './index.css'
import { SocketContextProvider } from './socket/socket';
import { CallProvider } from './socket/CallContext'; 
import { BrowserRouter as Router } from 'react-router-dom';
import { StreamContext } from './socket/streamContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketContextProvider>
        <CallProvider>
          <StreamContext>
        <Router>
        <App />
        </Router>
        </StreamContext>
        </CallProvider>
      </SocketContextProvider>
    </Provider>
  </React.StrictMode>
);
