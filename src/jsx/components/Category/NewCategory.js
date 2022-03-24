import React, {useContext} from "react";
import {toast} from "react-toastify";
import axios from "../../../services/axios";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ThemeContext} from "../../../context/ThemeContext";

const NewCategory = props => {

    const navigate = useNavigate();
    const {setTitle} = useContext(ThemeContext);
    setTitle('New Category');
    const [loading, setLoading] = React.useState(false);

    const handleNewCategory = e => {
        e.preventDefault();
        setLoading(true);
        if(e.target.elements.name.value === ''){
            toast.warn('Enter name');
            setLoading(false);
        }else {
            axios.post('/category', {name: e.target.elements.name.value}, {headers: { Authorization: props.token }})
                .then(res => {
                    toast.success(res.data.message);
                    navigate('/categories');
                    setLoading(false);
                })
                .catch(err => {
                    if(err.response){
                        toast.error(err.response.data.message);
                    }else {
                        toast.error(err.message);
                    }
                    setLoading(false);
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

                            <button type="submit" className={`btn btn-primary ${loading ? 'disabled' : ''}`}>
                                {loading ? 'Loading...' : 'Submit'}
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