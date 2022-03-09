import React, {useEffect, useState} from "react";
import axios from "../../../services/axios";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {Link} from "@material-ui/core";

const Comments = props => {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments();
    }, []);

    const getComments = () => {
        axios.get('/comments')
            .then(res => {
                setComments(res.data);
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
            })
    }

    const deleteComment = (e, commentId) => {
        e.preventDefault();
        console.log(props.token);
        axios.delete('/comment/' + commentId, {headers: {Authorization: props.token}})
            .then(res => {
                toast.success(res.data.message);
                getComments();
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err);
                }
            })
    }

    return (
        <div className='col-12'>

            {comments.length === 0 ?
                <p>No comments found</p>
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
                        <th>Comment</th>
                        <th>User</th>
                        <th>Action</th>
                        </thead>
                        <tbody>
                        {comments.map((comment, index) => {
                            return (
                                <tr key={comment._id}>
                                    <td>{index + 1}</td>
                                    <td>{comment.content}</td>
                                    <td>{`${comment.user.firstName} ${comment.user.lastName}`}</td>
                                    <td>
                                        <div className="d-flex">
                                            <a
                                                href={`/edit-comment/${comment._id}`}
                                                className="btn btn-primary shadow btn-xs sharp me-1"
                                            >
                                                <i className="fas fa-pen"></i>
                                            </a>
                                            <a
                                                onClick={e => deleteComment(e, comment._id)}
                                                className="btn btn-danger shadow btn-xs sharp"
                                            >
                                                <i className="fa fa-trash"></i>
                                            </a>
                                        </div>
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

export default connect(mapStateToProps)(Comments);