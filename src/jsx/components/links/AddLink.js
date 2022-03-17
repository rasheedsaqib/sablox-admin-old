import React from "react";
import axios from "../../../services/axios";
import {toast} from "react-toastify";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

const AddLink = props => {

    const navigate = useNavigate();

    const handleNewLink = e => {
        e.preventDefault();
        const { link, title, expiry } = e.target;
        console.log(link.value, title.value, expiry.value);
        axios.post('/link', {
            link: link.value,
            title: title.value,
            expiry: expiry.value
        }, {headers: { Authorization: props.token }})
            .then(res => {
                toast.success(res.data.message);
                navigate('/links');
            })
            .catch(err => {
                if(err.response){
                    toast.error(err.response.data.message);
                }else {
                    toast.error(err.message);
                }
            });
    };

    return(
        <div className="col-xl-12 col-lg-12">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Enter link details</h4>
                </div>

                <div className="card-body">
                    <div className="basic-form">
                        <form onSubmit={e => handleNewLink(e)}>
                            <div className="form-group mb-3">
                                <label>Title:</label>
                                <input
                                    type="text"
                                    className="form-control input-default "
                                    placeholder="Title"
                                    name='title'
                                    required
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Link:</label>
                                <input
                                    type="text"
                                    className="form-control input-default "
                                    placeholder="Link"
                                    name='link'
                                    required
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Expiry:</label>
                                <input
                                    type="number"
                                    className="form-control input-default "
                                    placeholder="Expiry"
                                    name='expiry'
                                    required
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

export default connect(mapStateToProps)(AddLink);