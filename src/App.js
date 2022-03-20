import {lazy, Suspense, useEffect} from 'react';

/// Components
import Index from "./jsx";
import {connect, useDispatch} from 'react-redux';
import {Route, Routes, useNavigate} from 'react-router-dom';
// action
import {checkAutoLogin} from './services/AuthService';
import {isAuthenticated} from './store/selectors/AuthSelectors';
/// Style
import "./css/style.css";

const Login = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('./jsx/pages/Login')), 500);
    });
});

function App(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        checkAutoLogin(dispatch, navigate);
    }, [dispatch, navigate]);

    let routes = (
        <Routes>
            <Route path='/login' element={<Login />}/>
        </Routes>
    );
    if (props.isAuthenticated) {
        return (
            <>
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1" />
                            <div className="sk-child sk-bounce2" />
                            <div className="sk-child sk-bounce3" />
                        </div>
                    </div>
                }
                >
                    <Index/>
                </Suspense>
            </>
        );

    } else {
        return (
            <div className="vh-100">
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1" />
                            <div className="sk-child sk-bounce2" />
                            <div className="sk-child sk-bounce3" />
                        </div>
                    </div>
                }
                >
                    {routes}
                </Suspense>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
        return {
            isAuthenticated: isAuthenticated(state),
        };
    }
;

export default connect(mapStateToProps)(App);

