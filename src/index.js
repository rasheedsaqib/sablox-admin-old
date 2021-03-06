import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
import reportWebVitals from "./reportWebVitals";
import  ThemeContext  from "./context/ThemeContext";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
config.autoAddCss = false;

ReactDOM.render(
	<React.StrictMode>
		<Provider store = {store}>
            <BrowserRouter>
                <ThemeContext>
                    <ToastContainer autoClose={2000} />
                    <App />
                </ThemeContext>
            </BrowserRouter>
        </Provider>	
	</React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
