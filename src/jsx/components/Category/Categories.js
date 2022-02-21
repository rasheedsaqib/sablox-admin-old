import React, {useEffect, useState} from "react";
import axios from "../../../services/axios";
import {toast} from "react-toastify";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const Categories = props => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    });

    const getCategories = () => {
        axios.get('/categories')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err);
                }
            })
    }

    const deleteCategory = (e, categoryId) => {
        e.preventDefault();
        axios.delete('/category/' + categoryId, {headers: { Authorization: props.token }})
            .then(res => {
                toast.success(res.data.message);
                getCategories();
            })
            .catch(err => {
                if(err.response){
                    toast.error(err.response.data.message);
                }else {
                    toast.error(err);
                }
            })
    }

    return (
        <div className='col-12'>
            {categories.length === 0 ?
                <p>No categories found!</p>
                :
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
                        return(
                            <tr key={category._id}>
                                <td>{index+1}</td>
                                <td>{category.name}</td>
                                <td>
                                    <div className="d-flex">
                                        <Link
                                            to={`/edit-category/${category._id}`}
                                            className="btn btn-primary shadow btn-xs sharp me-1"
                                        >
                                            <i className="fas fa-pen"></i>
                                        </Link>
                                        <a
                                            onClick={e => deleteCategory(e, category._id)}
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
    )
}

const mapStateToProps = (state) => {
        return {
            token: token(state),
        };
    }
;

export default connect(mapStateToProps)(Categories);