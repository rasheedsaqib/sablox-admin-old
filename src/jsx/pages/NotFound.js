import {Link} from "react-router-dom";

const NotFound = props => {
    return(
        <p>Return to <Link to={'/dashboard'}>Home</Link></p>
    )
}

export default NotFound;