import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "../../../services/axios";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";

const Constants = props => {

    const [constants, setConstants] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getConstants();
        getPosts();
    }, []);

    const getPosts = () => {
        axios.get('/posts')
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getConstants = () => {
        axios.get('/constants')
            .then(res => {
                setConstants(res.data);
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
            });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put('/constants', constants, {headers: {Authorization: props.token}})
            .then(res => {
                toast.success(res.data.message);
                getConstants();
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
            });
    }

    const changeHandler = (e, key) => {
        const updateConstants = {...constants};
        updateConstants[key] = e.target.value;
        console.log(updateConstants[key]);
        setConstants(updateConstants);
    }

    return (
        <div className="col-xl-12 col-lg-12">
            {constants && posts ?
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Enter news</h4>
                    </div>
                    <div className="card-body">
                        <div className="basic-form">
                            <form onSubmit={e => handleUpdate(e)}>
                                {Object.keys(constants).map(key => {
                                    if (key === '_id') {
                                        return;
                                    }
                                    return (
                                        <div className="form-group mb-3">
                                            {key === 'selectedPost' ?
                                                <>
                                                    <label style={{textTransform: 'capitalize'}}>{key}:</label>
                                                    <select className="form-control" onChange={e=>changeHandler(e,key)}>
                                                        {posts.map(post => {
                                                            return (
                                                                <option value={post._id} selected={post._id === constants[key]}>{post.title}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </>
                                                :
                                                <>
                                                    <label style={{textTransform: 'capitalize'}}>{key}:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control input-default "
                                                        placeholder={key}
                                                        name={key}
                                                        value={constants[key]}
                                                        onChange={e=>changeHandler(e,key)}
                                                    />
                                                </>}
                                        </div>
                                    )
                                })}

                                <button type="submit" className="btn btn-primary">
                                    Add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                :
                <p>Loading</p>
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

export default connect(mapStateToProps)(Constants);