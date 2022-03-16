import React, {useEffect, useState} from "react";
import axios from "../../../services/axios";
import {token} from "../../../store/selectors/AuthSelectors";
import {toast} from "react-toastify";
import {connect} from "react-redux";

const Users = props => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/users', {headers: {Authorization: props.token}})
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
            });
    }, [props.token]);

    const handleDelete = (e, id) => {
        e.preventDefault();
        axios.delete('/user/' + id, {headers: {Authorization: props.token}})
            .then(res => {
                toast.success(res.data.message);
                setUsers(users.filter(user => user._id !== id));
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
            });
    }

    return (
        <div className='col-12'>
            {users.length === 0 ?
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
                                    <td>
                                        <a
                                            href='/'
                                            onClick={e => handleDelete(e, user._id)}
                                            className="btn btn-danger shadow btn-xs sharp"
                                        >
                                            <i className="fa fa-trash"></i>
                                        </a>
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