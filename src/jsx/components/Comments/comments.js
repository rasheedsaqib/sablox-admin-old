import React, {useContext, useEffect, useState} from "react";
import axios from "../../../services/axios";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {ThemeContext} from "../../../context/ThemeContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faSpinner, faTrash} from "@fortawesome/free-solid-svg-icons";
import {confirmAlert} from "react-confirm-alert";

const Comments = props => {
    const {setTitle} = useContext(ThemeContext);
    setTitle('Comments');
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(null);

    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments();
    }, []);

    const getComments = () => {
        axios.get('/comments')
            .then(res => {
                setComments(res.data);
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
    }

    const deleteComment = (e, commentId) => {
        e.preventDefault();
        confirmAlert({
            title: 'Confirm to delete!',
            message: 'Are you sure you want to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setDeleteLoading(commentId);
                        axios.delete('/comment/' + commentId, {headers: {Authorization: props.token}})
                            .then(res => {
                                toast.success(res.data.message);
                                getComments();
                                setDeleteLoading(null);
                            })
                            .catch(err => {
                                if (err.response) {
                                    toast.error(err.response.data.message);
                                } else {
                                    toast.error(err);
                                }
                                setDeleteLoading(null);
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        toast.error('Delete canceled');
                    }
                }
            ]
        });
    }

    return (
        <div className='col-12'>

            {loading ? <p>Loading...</p>
                : comments.length === 0 ?
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
                                                    <i><FontAwesomeIcon icon={faPen}/></i>
                                                </a>
                                                {deleteLoading === comment._id ?
                                                    <button className="btn btn-danger shadow btn-xs sharp me-1" disabled>
                                                        <i><FontAwesomeIcon icon={faSpinner} spin/></i>
                                                    </button>
                                                    :
                                                    <a
                                                        href='/'
                                                        onClick={e => deleteComment(e, comment._id)}
                                                        className="btn btn-danger shadow btn-xs sharp"
                                                    >
                                                        <i><FontAwesomeIcon icon={faTrash}/></i>
                                                    </a>
                                                }
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