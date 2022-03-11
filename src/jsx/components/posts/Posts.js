import React, {useEffect, useState} from "react";
import {Dropdown, Table} from "react-bootstrap";
import {toast} from 'react-toastify';
import axios from "../../../services/axios";
import {Link} from "react-router-dom";
import {token, userData} from '../../../store/selectors/AuthSelectors';
import {connect} from "react-redux";

const Posts = props => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
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

    const handleEdit = (id) => {
        props.history.push(`/edit-post/${id}`);
    }

    const handleDelete = (id) => {
        axios.delete(`/post/${id}`, {headers: {Authorization: props.token}})
            .then(res => {
                toast.success(res.data.message);
                getPosts();
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
            })
    }

    return (
        <div className='row'>
            {posts.map(post => {
                return (
                    <div className="col-xl-3 col-xxl-4 col-lg-6 col-md-6 col-sm-6" key={post._id}>
                        <div className="card project-boxed">
                            <div className="img-bx">
                                <img src={post.image} alt="" className=" me-3 card-list-img w-100" width="130"/>
                            </div>
                            <div className="card-header align-items-start">
                                <div>
                                    <p className="fs-14 mb-2 text-primary">{post.category.name}</p>
                                    <h6 className="fs-18 font-w500 mb-3"><Link to="#"
                                                                               className="text-black user-name">{post.title}</Link>
                                    </h6>
                                    <div
                                        className="text-dark fs-14 text-nowrap">{`${post.owner.firstName} ${post.owner.lastName} . ${new Date(post.createdAt).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}`}</div>
                                </div>
                                {props.userData.role === 'Admin' ?
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
                                            <Dropdown.Item onClick={e => handleEdit(post._id)}>Edit</Dropdown.Item>
                                            <Dropdown.Item className="text-danger"
                                                           onClick={() => handleDelete(post._id)}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown> : null}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
        return {
            token: token(state),
            userData: userData(state)
        };
    }
;

export default connect(mapStateToProps)(Posts);