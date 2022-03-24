import React, {useContext, useEffect, useState} from "react";
import axios from "../../../services/axios";
import {toast} from "react-toastify";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import {ThemeContext} from "../../../context/ThemeContext";
import {confirmAlert} from "react-confirm-alert";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faTrash} from "@fortawesome/free-solid-svg-icons";

const Subscribers = props => {

    const {setTitle} = useContext(ThemeContext);
    setTitle('Subscribers');

    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        getSubscribers();
    }, []);

    const getSubscribers = () => {
        axios.get('/subscribers', {headers: {Authorization: props.token}})
            .then(res => {
                setSubscribers(res.data);
                setLoading(false);
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
                setLoading(false);
            });
    };

    const handleDelete = (e, email) => {
        e.preventDefault();
        confirmAlert({
            title: 'Confirm to delete!',
            message: 'Are you sure you want to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setDeleteLoading(email);
                        axios.delete(`/subscriber/${email}`, {headers: {Authorization: props.token}})
                            .then(res => {
                                toast.success(res.data.message);
                                getSubscribers();
                                setDeleteLoading(null);
                            })
                            .catch(err => {
                                if (err.response) {
                                    toast.error(err.response.data.message);
                                } else {
                                    toast.error(err.message);
                                }
                                setDeleteLoading(null);
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
    };

    return (
        <div className='col-12'>
            {loading ? <p>Loading...</p>
                : subscribers.length === 0 ?
                    <p>No subscribers found</p>
                    :
                    <div style={{overflowX: 'auto'}}>
                        <table
                            id="example"
                            className="display w-100 dataTable"
                            role="grid"
                            aria-describedby="example_info"
                        >
                            <thead>
                            <th>Index</th>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Action</th>
                            </thead>
                            <tbody>
                            {subscribers.map((subscriber, index) => {
                                return (
                                    <tr key={subscriber.id}>
                                        <td>{index + 1}</td>
                                        <td>{subscriber._id}</td>
                                        <td>{subscriber.email}</td>
                                        <td>
                                            {deleteLoading === subscriber.email ?
                                                <button className="btn btn-danger shadow btn-xs sharp me-1"
                                                        disabled>
                                                    <i><FontAwesomeIcon icon={faSpinner} spin/></i>
                                                </button>
                                                :
                                                <button
                                                    onClick={e => handleDelete(e, subscriber.email)}
                                                    className="btn btn-danger shadow btn-xs sharp"
                                                >
                                                    <i><FontAwesomeIcon icon={faTrash} /></i>
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
        return {
            token: token(state),
        };
    }
;

export default connect(mapStateToProps)(Subscribers);