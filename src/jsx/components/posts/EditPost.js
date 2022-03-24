import React, {useContext, useEffect, useState} from "react";
import axios from "../../../services/axios";
import {toast} from "react-toastify";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import PostDescription from "./PostDescription";
import {ThemeContext} from "../../../context/ThemeContext";

const EditPost = props => {

    const {setTitle} = useContext(ThemeContext);
    setTitle('Edit Post');
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState([]);
    const [post, setPost] = useState({});
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        getCategories();
        getPost();
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

    const getPost = () => {
        setLoading(true);
        axios.get('/post/' + params.id)
            .then(res => {
                setPost(res.data);
                setDescription(res.data.description);
                setLoading(false);
            })
            .catch(err => {
                setPost(null);
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
                setLoading(false);
            })
    }

    const handleEditSubmit = e => {
        e.preventDefault();
        axios.put(`/post/${params.id}`, {...post, description}, {headers: {Authorization: props.token}})
            .then(res => {
                toast.success(res.data.message);
                navigate('/posts');
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
                        {loading ? <p>Loading...</p>
                            : post ?
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
                                            defaultValue={post.category ? post.category._id : null}
                                        >
                                            {categories.map(category => {
                                                return <option key={category._id}
                                                               value={category._id}>{category.name}</option>;
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
                                        <PostDescription id={post._id} description={description}
                                                         setDescription={setDescription}/>
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
                                : <p>Post not found</p>}
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