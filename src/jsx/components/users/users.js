import React, {useEffect, useState} from "react";
import axios from "../../../services/axios";
import {token} from "../../../store/selectors/AuthSelectors";
import {toast} from "react-toastify";
import {connect} from "react-redux";

const Users = props => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/users', {headers: { Authorization: props.token }})
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                if(err.response){
                    toast.error(err.response.data.message);
                }else {
                    toast.error(err.message);
                }
            });
    }, []);

    return(
        <div className='col-12'>
            {users.length === 0 ?
                <p>No users found!</p>
                :
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
                    </thead>
                    <tbody>
                    {users.map((user, index) => {
                        return(
                            <tr key={user._id}>
                                <td>{index+1}</td>
                                <td>{`${user.firstName} ${user.lastName}`}</td>
                                <td>{user.email}</td>
                                <td>{user.phone || 'No Phone number'}</td>
                                <td>{user.role}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
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