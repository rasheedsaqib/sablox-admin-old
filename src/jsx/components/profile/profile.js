import {useContext, useEffect, useState} from "react";
import {auth, token, userData} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import axios from "../../../services/axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {saveTokenInLocalStorage} from "../../../services/AuthService";
import {ThemeContext} from "../../../context/ThemeContext";

const Profile = props => {

    const {setTitle} = useContext(ThemeContext);
    setTitle('Profile');

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const {firstName, lastName, email, phone, about} = props.userData;
        setUser({firstName, lastName, email, phone, about});
    }, [props.userData]);

    const handleUpdate = e => {
        e.preventDefault();
        setLoading(true);
        axios.put(`/user/${props.userData._id}`, user, {headers: { Authorization: props.token}}).then(res => {
            toast.success("Profile updated successfully");
            saveTokenInLocalStorage({
                kind: "identitytoolkit#SignupNewUserResponse",
                idToken: props.token,
                email: user.email,
                refreshToken: props.token,
                    expiresIn: props.auth.expiresIn,
                localId: user._id,
                user: {...props.auth.user, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, about: user.about}
            });
            setLoading(false);
            navigate('/');
        }).catch(err => {
            if(err.response){
                toast.error(err.response.data.message);
            }else {
                toast.error(err.message);
            }
            setLoading(false);
        });
    }

    return (
        <>
            <div className="col-xl-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Enter post details</h4>
                    </div>
                    <div className="card-body">
                        <div className="basic-form">
                            <form onSubmit={e => handleUpdate(e)}>
                                <div className="form-group mb-3">
                                    <label>First Name:</label>
                                    <input
                                        type="text"
                                        className="form-control input-default "
                                        placeholder="First Name"
                                        name='firstName'
                                        value={user.firstName}
                                        onChange={e => setUser({...user, firstName: e.target.value})}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Last Name:</label>
                                    <input
                                        type="text"
                                        className="form-control input-default "
                                        placeholder="Last Name"
                                        name='lastName'
                                        value={user.lastName}
                                        onChange={e => setUser({...user, lastName: e.target.value})}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        className="form-control input-default "
                                        placeholder="Email"
                                        name='email'
                                        value={user.email}
                                        onChange={e => setUser({...user, email: e.target.value})}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Phone:</label>
                                    <input
                                        type="number"
                                        className="form-control input-default "
                                        placeholder="Phone"
                                        name='phone'
                                        value={user.phone}
                                        onChange={e => setUser({...user, phone: e.target.value})}
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label>About:</label>
                                    <textarea
                                        className="form-control"
                                        style={{height: '150px', padding: '1rem 1.5rem'}}
                                        value={user.about}
                                        onChange={e => setUser({...user, about: e.target.value})}
                                        id="exampleFormControlTextarea1"
                                        rows="10" />
                                </div>

                                <button type="submit" className={`btn btn-primary ${loading ? 'disabled' : ''}`}>
                                    {loading ? 'Loading...' : 'Update'}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
        return {
            userData: userData(state),
            token: token(state),
            auth: auth(state)
        };
    }
;

export default connect(mapStateToProps)(Profile);