/// Menu
import Metismenu from "metismenujs";
import React, {Component, useContext, useEffect} from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import {Link} from "react-router-dom";
import useScrollPosition from "use-scroll-position";
import {ThemeContext} from "../../../context/ThemeContext";
import {userData} from "../../../store/selectors/AuthSelectors";
import {connect} from "react-redux";

class MM extends Component {
    componentDidMount() {
        this.$el = this.el;
        this.mm = new Metismenu(this.$el);
    }

    render() {
        return (
            <div className="mm-wrapper">
                <ul className="metismenu" ref={(el) => (this.el = el)}>
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

const SideBar = props => {
    const {
        iconHover,
        sidebarposition,
        headerposition,
        sidebarLayout,
    } = useContext(ThemeContext);
    useEffect(() => {
        var btn = document.querySelector(".nav-control");
        var aaa = document.querySelector("#main-wrapper");

        function toggleFunc() {
            return aaa.classList.toggle("menu-toggle");
        }

        btn.addEventListener("click", toggleFunc);

    }, []);
    let scrollPosition = useScrollPosition();
    /// Path
    let path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];
    /// Active menu
    let dashboard = ['dashboard', ''],
        posts = ['posts', 'new-post'],
        categories = ['categories', 'new-category'],
        users = ['users', 'add-user'],
        links = ['links', 'new-link'],
        comments = ['comments'],
        settings = ['settings'],
        subscribers = ['subscribers'],
        ads = ['ads', 'new-ad'];

    return (
        <div
            className={`deznav ${iconHover} ${
                sidebarposition.value === "fixed" &&
                sidebarLayout.value === "horizontal" &&
                headerposition.value === "static"
                    ? scrollPosition > 120
                        ? "fixed"
                        : ""
                    : ""
            }`}
        >
            <PerfectScrollbar className="deznav-scroll">
                <MM className="metismenu" id="menu">

                    <li className={`${dashboard.includes(path) ? "mm-active" : ""}`}>
                        <Link className="has-arrow ai-icon" to="#">
                            <i className="flaticon-025-dashboard"></i>
                            <span className="nav-text">Dashboard</span>
                        </Link>
                        <ul>
                            <li><Link className={`${path === "" ? "mm-active" : "dashboard"}`}
                                      to="/dashboard"> Dashboard</Link></li>
                        </ul>
                    </li>

                    <li className={`${posts.includes(path) ? "mm-active" : ""}`}>
                        <Link className="has-arrow ai-icon" to="#">
                            <i className="flaticon-022-copy"/>
                            <span className="nav-text">Posts</span>
                        </Link>
                        <ul>
                            <li>
                                <Link className={`${path === "posts" ? "mm-active" : ""}`} to="/posts">
                                    All Posts
                                </Link>
                            </li>
                            <li>
                                <Link className={`${path === "new-post" ? "mm-active" : ""}`} to="/new-post">
                                    Add New Posts
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {props.userData.role === 'Admin' ?
                        <>

                            <li className={`${categories.includes(path) ? "mm-active" : ""}`}>
                                <Link className="has-arrow ai-icon" to="#">
                                    <i className="flaticon-022-copy"/>
                                    <span className="nav-text">Categories</span>
                                </Link>
                                <ul>
                                    <li>
                                        <Link className={`${path === "categories" ? "mm-active" : ""}`}
                                              to="/categories">
                                            All Categories
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className={`${path === "new-category" ? "mm-active" : ""}`}
                                              to="/new-category">
                                            New Category
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className={`${comments.includes(path) ? "mm-active" : ""}`}>
                                <Link className="has-arrow ai-icon" to="#">
                                    <i className="flaticon-022-copy"/>
                                    <span className="nav-text">Comments</span>
                                </Link>
                                <ul>
                                    <li>
                                        <Link className={`${path === "comments" ? "mm-active" : ""}`} to="/comments">
                                            All Comments
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className={`${users.includes(path) ? "mm-active" : ""}`}>
                                <Link className="has-arrow ai-icon" to="#">
                                    <i className="flaticon-022-copy"/>
                                    <span className="nav-text">Users</span>
                                </Link>
                                <ul>
                                    <li>
                                        <Link className={`${path === "users" ? "mm-active" : ""}`} to="/users">
                                            All Users
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className={`${path === "add-users" ? "mm-active" : ""}`} to="/add-users">
                                            Add Users
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className={`${links.includes(path) ? "mm-active" : ""}`}>
                                <Link className="has-arrow ai-icon" to="#">
                                    <i className="flaticon-022-copy"/>
                                    <span className="nav-text">Links</span>
                                </Link>
                                <ul>
                                    <li>
                                        <Link className={`${path === "links" ? "mm-active" : ""}`} to="/links">
                                            Links
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className={`${path === "new-link" ? "mm-active" : ""}`} to="/new-link">
                                            Add Link
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className={`${subscribers.includes(path) ? "mm-active" : ""}`}>
                                <Link className="has-arrow ai-icon" to="#">
                                    <i className="flaticon-022-copy"/>
                                    <span className="nav-text">Subscribers</span>
                                </Link>
                                <ul>
                                    <li>
                                        <Link className={`${path === "subscribers" ? "mm-active" : ""}`}
                                              to="/subscribers">
                                            Subscribers
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className={`${ads.includes(path) ? "mm-active" : ""}`}>
                                <Link className="has-arrow ai-icon" to="#">
                                    <i className="flaticon-022-copy"/>
                                    <span className="nav-text">Ads</span>
                                </Link>
                                <ul>
                                    <li>
                                        <Link className={`${path === "ads" ? "mm-active" : ""}`}
                                              to="/ads">
                                            Ads
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className={`${path === "new-ad" ? "mm-active" : ""}`}
                                              to="/new-ad">
                                            New Ad
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className={`${settings.includes(path) ? "mm-active" : ""}`}>
                                <Link className="has-arrow ai-icon" to="#">
                                    <i className="flaticon-022-copy"/>
                                    <span className="nav-text">Settings</span>
                                </Link>
                                <ul>
                                    <li>
                                        <Link className={`${path === "settings" ? "mm-active" : ""}`} to="/settings">
                                            Update
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </>
                        :
                        null
                    }
                </MM>
            </PerfectScrollbar>
        </div>
    );
};

const mapStateToProps = (state) => {
        return {
            userData: userData(state),
        };
    }
;

export default connect(mapStateToProps)(SideBar);
