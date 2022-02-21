import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "../../../services/axios";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";

const EditCategory = props => {

    const [category, setCategory] = useState({});

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
    }, []);

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
                                <form onSubmit={e => (e)}>
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