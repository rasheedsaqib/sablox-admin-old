import React, {useEffect, useState} from "react";
import axios from "../../../services/axios";
import {toast} from "react-toastify";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import PostDescription from "./PostDescription";
import {useNavigate} from "react-router-dom";

const NewPost = props => {

    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        axios.get('/categories')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                if(err.response){
                    toast.error(err.response.data.message);
                }else {
                    toast.error(err.message);
                }
            })
    }

    const handlePostSubmit = e => {
        e.preventDefault();
        if(e.target.elements.title.value === '' || e.target.elements[1].value === '' || e.target.elements.slug.value === '' || description === '' || e.target.thumbnail.value === ''){
            toast.warn('Enter all the details');
        }else {
            const formData = new FormData();
            formData.append('title', e.target.elements.title.value);
            formData.append('categoryId', e.target.elements[1].value);
            formData.append('slug', e.target.elements.slug.value);
            formData.append('description', description.toString());
            formData.append('thumbnail', e.target.thumbnail.value);

            axios.post('/post', formData, {headers: { Authorization: props.token }})
                .then(res => {
                    toast.success(res.data.message);
                    navigate('/posts');
                })
                .catch(err => {
                    if(err.response){
                        toast.error(err.response.data.message);
                    }else {
                        toast.error(err.message);
                    }
                });
        }
    }

    return (
        <>
            <div className="col-xl-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Enter post details</h4>
                    </div>
                    <div className="card-body">
                        <div className="basic-form">
                            <form onSubmit={e => handlePostSubmit(e)}>
                                <div className="form-group mb-3">
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        className="form-control input-default "
                                        placeholder="Title"
                                        name='title'
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Category:</label>
                                    <select
                                        className="form-control form-control-lg fs-14"
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
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Description:</label>
                                    <PostDescription setDescription={setDescription} />
                                    {/*<textarea placeholder='Description' className="form-control" name="description" style={{resize: 'vertical', height: '200px', paddingTop: '1rem'}} />*/}
                                </div>

                                <div className="form-group mb-3">
                                    <label>Thumbnail:</label>
                                    <input
                                        type="text"
                                        className="form-control input-default "
                                        placeholder="Thumbnail url"
                                        name='thumbnail'
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

export default connect(mapStateToProps)(NewPost);