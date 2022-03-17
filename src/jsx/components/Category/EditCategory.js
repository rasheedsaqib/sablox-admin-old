import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "../../../services/axios";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

const EditCategory = props => {

    const [category, setCategory] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/category/' + props.match.params.id)
            .then(res => {
                setCategory(res.data);
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
            })
    }, [props.match.params.id]);

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`/category/${props.match.params.id}`, category, {headers: { Authorization: props.token }})
            .then(res => {
                toast.success(res.data.message);
                navigate('/categories');
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
            })
    }

    return (
        <>
            {category ?
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
                                            name='name'
                                            value={category.name}
                                            onChange={e => setCategory({...category, name: e.target.value})}
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
                <p>Loading</p>
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

export default connect(mapStateToProps)(EditCategory);