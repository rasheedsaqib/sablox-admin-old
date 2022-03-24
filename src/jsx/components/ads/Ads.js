import React, {useContext, useEffect, useState} from "react";
import axios from "../../../services/axios";
import {toast} from "react-toastify";
import JsxParser from "react-jsx-parser";
import {Dropdown} from "react-bootstrap";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import {ThemeContext} from "../../../context/ThemeContext";
import {confirmAlert} from "react-confirm-alert";

const Ads = props => {

    const {setTitle} = useContext(ThemeContext);
    setTitle('Ads');

    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAds();
    }, []);

    const getAds = () => {
        axios.get('/codes')
            .then(res => {
                setAds(res.data);
                setLoading(false);
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err);
                }
                setLoading(false);
            });
    }

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm to delete!',
            message: 'Are you sure you want to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`/code/${id}`, {headers: {Authorization: props.token}})
                            .then(res => {
                                toast.success(res.data.message);
                                getAds();
                            })
                            .catch(err => {
                                if (err.response) {
                                    toast.error(err.response.data.message);
                                } else {
                                    toast.error(err);
                                }
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        toast.error('Canceled');
                    }
                }
            ]
        });
    }

    return (
        <div className="row">
            {loading ? <p>Loading...</p>
                : ads.length === 0 ? <p>No ads found!</p>
                    : <>
                        {ads.map(ad => (
                            <div className="col-xl-3 col-xxl-4 col-lg-6 col-md-6 col-sm-6" key={ad._id}>
                                <div className="card project-boxed">
                                    <JsxParser components={{}} jsx={`${ad.jsx}`} />
                                </div>
                                <div className="card-header align-items-start">
                                    <div>
                                        <h6>{ad.title}</h6>
                                    </div>
                                    <Dropdown className="">
                                        <Dropdown.Toggle variant="" as="div" className="btn-link i-false">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                                    stroke="#342E59" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"/>
                                                <path
                                                    d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                                                    stroke="#342E59" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"/>
                                                <path
                                                    d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                                                    stroke="#342E59" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"/>
                                            </svg>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu alignRight={true} className="dropdown-menu-right">
                                            <Dropdown.Item className="text-danger"
                                                           onClick={() => handleDelete(ad._id)}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        ))}
                    </>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
        return {
            token: token(state),
        };
    }
;

export default connect(mapStateToProps)(Ads);