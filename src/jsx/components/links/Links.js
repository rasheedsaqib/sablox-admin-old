import React, {useEffect, useState} from "react";
import axios from "../../../services/axios";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";

const Links = (props) => {

    const [links, setLinks] = useState([]);

    useEffect(() => {
        getLinks();
    }, []);

    const getLinks = () => {
        axios.get('/links')
            .then(res => {
                setLinks(res.data);
                console.log(res.data);
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err);
                }
            })
    }

    const handleDelete = (e, id) => {
        e.preventDefault();
        axios.delete(`/link/${id}`, {headers: { Authorization: props.token }})
            .then(res => {
                toast.success(res.data.message);
                getLinks();
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
            {links.length === 0 ?
                <p>No links found</p>
                :
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
                                        <a href={link.url} target="_blank" className="btn btn-primary shadow btn-xs sharp me-1">
                                            <i className="fas fa-eye" />
                                        </a>
                                        <Link
                                            to={`/edit-link/${link._id}`}
                                            className="btn btn-primary shadow btn-xs sharp me-1"
                                        >
                                            <i className="fas fa-pen"></i>
                                        </Link>
                                        <a
                                            onClick={e => handleDelete(e, link._id)}
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