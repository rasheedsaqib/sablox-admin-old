import React, {useEffect, useState} from "react";
import axios from "../../../services/axios";
import {toast} from "react-toastify";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";

const EditPost = props => {
    const [categories, setCategories] = useState([]);
    const [post, setPost] = useState({});

    useEffect(() => {
        getCategories();
        getPosts();
    }, []);

    const getCategories = () => {
        axios.get('/categories')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
            })
    }

    const getPosts = () => {
        axios.get('/post/' + props.match.params.id)
            .then(res => {
                setPost(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleEditSubmit = e => {
        e.preventDefault();
        axios.put(`/post/${props.match.params.id}`, post, {headers: { Authorization: props.token }})
            .then(res => {
                toast.success(res.data.message);
                props.history.push('/posts');
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
            })
    }

    const onChangeHandle = e => {
        setPost({...post, [e.target.name]: e.target.value});
    }

    return (
        <div className="col-xl-12 col-lg-12">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Edit post</h4>
                </div>
                <div className="card-body">
                    <div className="basic-form">

                        {post && categories ?
                            <form onSubmit={e => handleEditSubmit(e)}>
                                <div className="form-group mb-3">
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        className="form-control input-default "
                                        placeholder="Title"
                                        name='title'
                                        value={post.title}
                                        onChange={e => onChangeHandle(e)}
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Category:</label>
                                    <select
                                        className="form-control form-control-lg fs-14"
                                        onChange={e => onChangeHandle(e)}
                                        defaultValue={post.category ? post.category._id: null}
                                    >
                                        {categories.map(category => {
                                            return <option key={category._id} value={category._id}>{category.name}</option>;
                                        })}
                                    </select>
                                </div>

                                <div className="form-group mb-3">
                                    <label>Slug:</label>
                                    <input
                                        type="text"
                                        className="form-control input-default "
                                        placeholder="Slug"
                                        name='slug'
                                        value={post.slug}
                                        onChange={e => onChangeHandle(e)}
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Description:</label>
                                    <textarea placeholder='Description'
                                              className="form-control"
                                              name="description"
                                              style={{resize: 'vertical', height: '200px', paddingTop: '1rem'}}
                                              value={post.description}
                                              onChange={e => onChangeHandle(e)} />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Thumbnail:</label>
                                    <input
                                        type="text"
                                        className="form-control input-default "
                                        placeholder="Thumbnail url"
                                        name='image'
                                        value={post.image}
                                        onChange={e => onChangeHandle(e)}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Post
                                </button>

                            </form>
                            : <p>Loading</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
        return {
            token: token(state),
        };
    }
;

export default connect(mapStateToProps)(EditPost);