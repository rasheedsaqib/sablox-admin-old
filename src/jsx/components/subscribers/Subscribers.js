import React, {useEffect, useState} from "react";
import axios from "../../../services/axios";
import {toast} from "react-toastify";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";

const Subscribers = props => {

    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        getSubscribers();
    }, []);

    const getSubscribers = () => {
        axios.get('/subscribers', {headers: { Authorization: props.token }})
            .then(res => {
                setSubscribers(res.data);
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
            });
    };

    const handleDelete = (e, email) => {
        e.preventDefault();
        axios.delete(`/subscriber/${email}`, {headers: { Authorization: props.token }})
            .then(res => {
                toast.success(res.data.message);
                getSubscribers();
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
            });
    };

    return (
        <div className='col-12'>
            {subscribers.length === 0 ?
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
                                    <td>{index+1}</td>
                                    <td>{subscriber._id}</td>
                                    <td>{subscriber.email}</td>
                                    <td>
                                        <button
                                            onClick={e => handleDelete(e, subscriber.email)}
                                            className="btn btn-danger shadow btn-xs sharp"
                                        >
                                            <i className="fa fa-trash"></i>
                                        </button>
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