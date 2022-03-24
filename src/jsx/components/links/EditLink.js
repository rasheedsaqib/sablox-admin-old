import {useContext, useEffect, useState} from "react";
import axios from "../../../services/axios";
import {toast} from "react-toastify";
import {token} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {ThemeContext} from "../../../context/ThemeContext";

const EditLink = props => {

    const {setTitle} = useContext(ThemeContext);
    setTitle('Edit Link');

    const [link, setLink] = useState(props.link);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`/link/${params.id}`)
            .then(res => {
                setLink(res.data);
                setLoading(false);
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err.message);
                }
                setLoading(false);
            });
    }, [params.id]);

    const onChange = e => {
        setLink({...link, [e.target.name]: e.target.value});
    }

    const handleEdit = (e) => {
        e.preventDefault();

        axios.put(`/link/${params.id}`, link, {headers: {Authorization: props.token}})
            .then(res => {
                toast.success(res.data.message);
                navigate('/links');
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
            {loading ? <p>Loading...</p>
                : link ?
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Enter link details</h4>
                        </div>

                        <div className="card-body">
                            <div className="basic-form">
                                <form onSubmit={e => handleEdit(e)}>
                                    <div className="form-group mb-3">
                                        <label>Title:</label>
                                        <input
                                            type="text"
                                            className="form-control input-default "
                                            placeholder="Title"
                                            name='title'
                                            value={link.title}
                                            onChange={e => onChange(e)}
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
                                            value={link.link}
                                            onChange={e => onChange(e)}
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
                                            value={link.expiry}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">
                                        Edit
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                    : <p>Link not found!</p>
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

export default connect(mapStateToProps)(EditLink);