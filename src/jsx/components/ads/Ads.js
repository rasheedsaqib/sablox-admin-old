import {useEffect, useState} from "react";
import axios from "../../../services/axios";
import {toast} from "react-toastify";
import JsxParser from "react-jsx-parser";

const Ads = props => {

    const [ads, setAds] = useState([]);

    useEffect(() => {
        getAds();
    }, []);

    const getAds = () => {
        axios.get('/ads')
            .then(res => {
                setAds(res.data);
            })
            .catch(err => {
                if (err.response) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error(err);
                }
            });
    }

    const styles = {
        width: '300px',
        height: '250px',
        background: '#5338EA10',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        margin: '1rem'
    }

    const format = (ad) => {
        const update = ad.jsx.split('').map(letter => {
            return letter === "'" ? '"' : letter;
        });
        return {...ad, jsx: `${update.join('')}`};
    }

    return(
        <div className="row">
            {ads.map(ad => (
                <div className="col-md-4" style={styles} key={ad._id}>
                    {/*<p>{ad.jsx}</p>*/}
                    <JsxParser components={{}} jsx={`${ad.jsx}`} />
                </div>
            ))}
        </div>
    );
}

export default Ads;