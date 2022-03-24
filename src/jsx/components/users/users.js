import React, {useContext, useEffect, useState} from "react";
import axios from "../../../services/axios";
import {token} from "../../../store/selectors/AuthSelectors";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import {ThemeContext} from "../../../context/ThemeContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faTrash} from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from 'react-confirm-alert';

const Users = props => {

    const {setTitle} = useContext(ThemeContext);
    setTitle('Users');

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        axios.get('/users', {headers: {Authorization: props.token}})
            .then(res => {
                setUsers(res.data);
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
    }, [props.token]);

    const handleDelete = (e, id) => {
        e.preventDefault();

        confirmAlert({
            title: 'Confirm to delete!',
            message: 'Are you sure you want to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setDeleteLoading(id);
                        axios.delete('/user/' + id, {headers: {Authorization: props.token}})
                            .then(res => {
                                toast.success(res.data.message);
                                setUsers(users.filter(user => user._id !== id));
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
                        return;
                    }
                }
            ]
        });


    }

    return (
        <div className='col-12'>
            {loading ? <p>Loading...</p>
                : users.length === 0 ?
                    <p>No users found!</p>
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                            </thead>
                            <tbody>
                            {users.map((user, index) => {
                                return (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{`${user.firstName} ${user.lastName}`}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone || 'No Phone number'}</td>
                                        <td>{user.role}</td>
                                        <td>{user.active ? 'Active' : 'Inactive'}</td>
                                        <td>
                                            {deleteLoading === user._id ?
                                                <button className="btn btn-danger shadow btn-xs sharp me-1"
                                                        disabled>
                                                    <i><FontAwesomeIcon icon={faSpinner} spin/></i>
                                                </button>
                                                :
                                                <a
                                                    href='/'
                                                    onClick={e => handleDelete(e, user._id)}
                                                    className="btn btn-danger shadow btn-xs sharp"
                                                >
                                                    <i><FontAwesomeIcon icon={faTrash} /></i>
                                                </a>
                                            }
                                        </td>
                                    </tr>
                                )
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

export default connect(mapStateToProps)(Users);