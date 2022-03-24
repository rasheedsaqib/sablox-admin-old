import React, {useContext, useEffect, useState} from "react";
import axios from "../../../services/axios";
import {toast} from "react-toastify";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {ThemeContext} from "../../../context/ThemeContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faSpinner, faTrash} from "@fortawesome/free-solid-svg-icons";
import {confirmAlert} from "react-confirm-alert";

const Categories = props => {
    const {setTitle} = useContext(ThemeContext);
    setTitle('Categories');

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        getCategories();
    });

    const getCategories = () => {
        axios.get('/categories')
            .then(res => {
                setCategories(res.data);
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

    const deleteCategory = (e, categoryId) => {
        e.preventDefault();
        confirmAlert({
            title: 'Confirm to delete!',
            message: 'Are you sure you want to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setDeleteLoading(categoryId);
                        axios.delete('/category/' + categoryId, {headers: {Authorization: props.token}})
                            .then(res => {
                                toast.success(res.data.message);
                                getCategories();
                                setDeleteLoading(null);
                            })
                            .catch(err => {
                                if (err.response) {
                                    toast.error(err.response.data.message);
                                } else {
                                    toast.error(err);
                                }
                                setDeleteLoading(null);
                            });
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
                : categories.length === 0 ?
                    <p>No categories found!</p>
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
                            <th>Name</th>
                            <th>Action</th>
                            </thead>
                            <tbody>
                            {categories.map((category, index) => {
                                return (
                                    <tr key={category._id}>
                                        <td>{index + 1}</td>
                                        <td>{category.name}</td>
                                        <td>
                                            <div className="d-flex">
                                                <Link
                                                    to={`/edit-category/${category._id}`}
                                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                                >
                                                    <i><FontAwesomeIcon icon={faPen}/></i>
                                                </Link>
                                                {deleteLoading === category._id ?
                                                    <button className="btn btn-danger shadow btn-xs sharp me-1" disabled>
                                                        <i><FontAwesomeIcon icon={faSpinner} spin/></i>
                                                    </button>
                                                    :
                                                    <a
                                                        href='/'
                                                        onClick={e => deleteCategory(e, category._id)}
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

export default connect(mapStateToProps)(Categories);