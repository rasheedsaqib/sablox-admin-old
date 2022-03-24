import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {userData} from '../../../store/selectors/AuthSelectors';
import profile from "../../../images/avatar/pic1.jpg";
import {Dropdown} from "react-bootstrap";
import LogoutPage from './Logout';
import {connect} from "react-redux";
import {ThemeContext} from "../../../context/ThemeContext";

const Header = props => {
    const {title} = useContext(ThemeContext);

    return (
        <div className="header">
            <div className="header-content">
                <nav className="navbar navbar-expand">
                    <div className="collapse navbar-collapse justify-content-between">
                        <div className="header-left">
                            <div
                                className="dashboard_bar"
                                style={{textTransform: "capitalize"}}
                            >
                                {title}
                            </div>

                        </div>
                        <ul className="navbar-nav header-right main-notification">

                            <Dropdown as="li" className="nav-item dropdown header-profile">
                                <Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
                                    <img src={profile} width={20} style={{borderRadius: '200px'}} alt=""/>
                                    <div className="header-info ms-3 flex align-items-center">
                                        <p className='m-0'><span>{props.userData.firstName + ' ' + props.userData.lastName}</span></p>
                                        <small>{props.userData.role}</small>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu align="right" className="mt-3 dropdown-menu dropdown-menu-end">
                                    <Link to="/profile" className="dropdown-item ai-icon">
                                        <svg
                                            id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary"
                                            width={18} height={18} viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                            <circle cx={12} cy={7} r={4}/>
                                        </svg>
                                        <span className="ms-2">Profile </span>
                                    </Link>
                                    <LogoutPage />
                                </Dropdown.Menu>
                            </Dropdown>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
        return {
            userData: userData(state),
        };
    }
;

export default connect(mapStateToProps)(Header);
