import React from "react";
import {toast} from "react-toastify";
import axios from "../../../services/axios";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

const NewCategory = props => {

    const navigate = useNavigate();

    const handleNewCategory = e => {
        e.preventDefault();
        if(e.target.elements.name.value === ''){
            toast.warn('Enter name');
        }else {
            axios.post('/category', {name: e.target.elements.name.value}, {headers: { Authorization: props.token }})
                .then(res => {
                    toast.success(res.data.message);
                    navigate('/categories');
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

    return(
        <div className="col-xl-12 col-lg-12">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Enter category details</h4>
                </div>
                <div className="card-body">
                    <div className="basic-form">
                        <form onSubmit={e => handleNewCategory(e)}>
                            <div className="form-group mb-3">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    className="form-control input-default "
                                    placeholder="Name"
                                    name='name'
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Add
                            </button>
                        </form>
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

export default connect(mapStateToProps)(NewCategory);