import React, {useContext, useEffect, useState} from "react";
import axios from "../../../services/axios";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import {ThemeContext} from "../../../context/ThemeContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faPen, faCopy, faEye, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {confirmAlert} from "react-confirm-alert";

const Links = (props) => {

    const {setTitle} = useContext(ThemeContext);
    setTitle('Links');

    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        getLinks();
    }, []);

    const getLinks = () => {
        axios.get('/links')
            .then(res => {
                setLinks(res.data);
                setLoading(false);
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err);
                }
                setLoading(false);
            })
    }

    const handleDelete = (e, id) => {
        e.preventDefault();
        confirmAlert({
            title: 'Confirm to delete!',
            message: 'Are you sure you want to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setDeleteLoading(id);
                        axios.delete(`/link/${id}`, {headers: {Authorization: props.token}})
                            .then(res => {
                                toast.success(res.data.message);
                                getLinks();
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
        })
    }

    const handleCopy = (e, link) => {
        e.preventDefault();
        navigator.clipboard.writeText(link)
            .then(() => {
                toast.success("Link copied!")
            })
            .catch(err => {
                toast.error(err);
            })
    }

    return (
        <div className='col-12'>
            {loading ? <p>Loading...</p>
                : links.length === 0 ?
                    <p>No links found</p>
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
                            <th>Title</th>
                            <th>Link</th>
                            <th>Expiry</th>
                            <th>Action</th>
                            </thead>
                            <tbody>
                            {links.map((link, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{link.title}</td>
                                        <td>{link.link}</td>
                                        <td>{link.expiresIn}</td>
                                        <td>
                                            <div className="d-flex">
                                            <span onClick={e => handleCopy(e, link.url)} target="_blank"
                                                  className="btn btn-primary shadow btn-xs sharp me-1">
                                                <i><FontAwesomeIcon icon={faCopy} /></i>
                                            </span>
                                                <a href={link.url} target="_blank" rel='noreferrer'
                                                   className="btn btn-primary shadow btn-xs sharp me-1">
                                                    <i><FontAwesomeIcon icon={faEye} /></i>
                                                </a>
                                                <Link
                                                    to={`/edit-link/${link._id}`}
                                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                                >
                                                    <i><FontAwesomeIcon icon={faPen} /></i>
                                                </Link>
                                                {deleteLoading === link._id ?
                                                    <button className="btn btn-danger shadow btn-xs sharp me-1"
                                                            disabled>
                                                        <i><FontAwesomeIcon icon={faSpinner} spin/></i>
                                                    </button>
                                                    :
                                                    <a
                                                        href='/'
                                                        onClick={e => handleDelete(e, link._id)}
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
    );
};

const mapStateToProps = (state) => {
        return {
            token: token(state),
        };
    }
;

export default connect(mapStateToProps)(Links);