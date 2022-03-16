import React from "react";
import axios from "../../../services/axios";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import {toast} from "react-toastify";

const NewAd = props => {

    const handleNewAd = (e) => {
        e.preventDefault();
        axios.post('/code', {
            title: e.target.elements.title.value,
            jsx: e.target.elements.jsx.value
        }, {headers: {Authorization: props.token}})
            .then(res => {
                toast.success(res.data.message);
                props.history.push('/ads');
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
            });
    }

    return (
        <div className="col-xl-12 col-lg-12">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Enter ad details</h4>
                </div>
                <div className="card-body">
                    <div className="basic-form">
                        <form onSubmit={e => handleNewAd(e)}>

                            <div className="form-group mb-3">
                                <label>Title:</label>
                                <input
                                    type="text"
                                    className="form-control input-default "
                                    placeholder="Title"
                                    name='title'
                                />
                            </div>


                            <div className="form-group mb-3">
                                <label>Code:</label>
                                <textarea placeholder='Enter ad code here' required className="form-control" name="jsx"
                                          style={{resize: 'vertical', height: '100px', paddingTop: '1rem'}}/>
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

export default connect(mapStateToProps)(NewAd);