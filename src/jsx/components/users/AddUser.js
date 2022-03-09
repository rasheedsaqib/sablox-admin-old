import React, {useState} from "react";
import axios from "../../../services/axios";
import {toast} from "react-toastify";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";

const AddUser = props => {

    const [roles] = useState(['User', 'SubAdmin', 'Admin']);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const json = {};
        data.forEach((value, key) => json[key] = value);
        json.role = e.target.elements[2].value;

        axios.post('/user', json, {headers: { Authorization: props.token }})
            .then(res => {
                toast.success('User added successfully');
                props.history.push('/users');
            })
            .catch(err => {
                if(err.response){
                    toast.error(err.response.data.message);
                }else {
                    toast.error(err.message);
                }
            });
    }

    return(
        <>
            <div className="col-xl-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Enter post details</h4>
                    </div>
                    <div className="card-body">
                        <div className="basic-form">
                            <form onSubmit={e => handleSubmit(e)}>
                                <div className="form-group mb-3">
                                    <label>First Name:</label>
                                    <input
                                        type="text"
                                        className="form-control input-default "
                                        placeholder="First Name"
                                        name='firstName'
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Last Name:</label>
                                    <input
                                        type="text"
                                        className="form-control input-default "
                                        placeholder="Last Name"
                                        name='lastName'
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Role:</label>
                                    <select
                                        className="form-control form-control-lg fs-14"
                                    >
                                        {roles.map(role => {
                                            return <option key={role} value={role}>{role}</option>;
                                        })}
                                    </select>
                                </div>

                                <div className="form-group mb-3">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        className="form-control input-default "
                                        placeholder="Email"
                                        name='email'
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Phone:</label>
                                    <input
                                        type="number"
                                        className="form-control input-default "
                                        placeholder="Phone"
                                        name='phone'
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Password:</label>
                                    <input
                                        type="password"
                                        className="form-control input-default "
                                        placeholder="Password"
                                        name='password'
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Post
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
        return {
            token: token(state),
        };
    }
;

export default connect(mapStateToProps)(AddUser);