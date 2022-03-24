import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "../../../services/axios";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {ThemeContext} from "../../../context/ThemeContext";

const EditComment = props => {

    const {setTitle} = useContext(ThemeContext);
    setTitle('Edit Comment');

    const [loading, setLoading] = useState(false);

    const [comment, setComment] = useState({});
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get('/comment/' + params.id)
            .then(res => {
                setComment(res.data);
                setLoading(false);
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
                setLoading(false);
            })
    }, [params.id]);

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        axios.put(`/comment/${params.id}`, comment, {headers: { Authorization: props.token }})
            .then(res => {
                toast.success(res.data.message);
                setLoading(false);
                navigate('/comments');
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
                setLoading(false);
            })
    }

    return (
        <>
            {loading ? <p>Loading...</p>
                : comment ?
                    <div className="col-xl-12 col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Enter category details</h4>
                            </div>
                            <div className="card-body">
                                <div className="basic-form">
                                    <form onSubmit={e => handleSubmit(e)}>
                                        <div className="form-group mb-3">
                                            <label>Name:</label>
                                            <input
                                                type="text"
                                                className="form-control input-default "
                                                placeholder="Name"
                                                name='content'
                                                value={comment.content}
                                                onChange={e => setComment({...comment, content: e.target.value})}
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-primary">
                                            Edit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <p>Comment not found!</p>
            }
        </>
    )
}

const mapStateToProps = (state) => {
        return {
            token: token(state),
        };
    }
;

export default connect(mapStateToProps)(EditComment);