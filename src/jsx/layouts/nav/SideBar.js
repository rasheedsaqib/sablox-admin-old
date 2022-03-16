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

/// Image
//import profile from "../../../images/profile/pic1.jpg";
//import plus from "../../../images/plus.png";

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
        constants = ['constants'],
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

                            <li className={`${constants.includes(path) ? "mm-active" : ""}`}>
                                <Link className="has-arrow ai-icon" to="#">
                                    <i className="flaticon-022-copy"/>
                                    <span className="nav-text">Constants</span>
                                </Link>
                                <ul>
                                    <li>
                                        <Link className={`${path === "constants" ? "mm-active" : ""}`} to="/constants">
                                            Update
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
                        </>
                        :
                        null
                    }

                    {/*<li className={`${app.includes(path) ? "mm-active" : ""}`}>*/}
                    {/*    <Link className="has-arrow ai-icon" to="#">*/}
                    {/*        <i className="flaticon-050-info"></i>*/}
                    {/*        <span className="nav-text">Apps</span>*/}
                    {/*    </Link>*/}
                    {/*    <ul>*/}
                    {/*        <li><Link className={`${path === "app-profile" ? "mm-active" : ""}`}*/}
                    {/*                  to="/app-profile">Profile</Link></li>*/}
                    {/*        <li><Link className={`${path === "post-details" ? "mm-active" : ""}`} to="/post-details">Post*/}
                    {/*            Details</Link></li>*/}
                    {/*        <li className={`${email.includes(path) ? "mm-active" : ""}`}><Link className="has-arrow"*/}
                    {/*                                                                           to="#">Email</Link>*/}
                    {/*            <ul className={`${email.includes(path) ? "mm-show" : ""}`}>*/}
                    {/*                <li><Link className={`${path === "email-compose" ? "mm-active" : ""}`}*/}
                    {/*                          to="/email-compose">Compose</Link></li>*/}
                    {/*                <li><Link className={`${path === "email-inbox" ? "mm-active" : ""}`}*/}
                    {/*                          to="/email-inbox">Inbox</Link></li>*/}
                    {/*                <li><Link className={`${path === "email-read" ? "mm-active" : ""}`}*/}
                    {/*                          to="/email-read">Read</Link></li>*/}
                    {/*            </ul>*/}
                    {/*        </li>*/}
                    {/*        <li><Link className={`${path === "app-calender" ? "mm-active" : ""}`}*/}
                    {/*                  to="/app-calender">Calendar</Link></li>*/}
                    {/*        <li className={`${shop.includes(path) ? "mm-active" : ""}`}><Link className="has-arrow"*/}
                    {/*                                                                          to="#">Shop</Link>*/}
                    {/*            <ul className={`${shop.includes(path) ? "mm-show" : ""}`}>*/}
                    {/*                <li><Link className={`${path === "ecom-product-grid" ? "mm-active" : ""}`}*/}
                    {/*                          to="/ecom-product-grid">Product Grid</Link></li>*/}
                    {/*                <li><Link className={`${path === "ecom-product-list" ? "mm-active" : ""}`}*/}
                    {/*                          to="/ecom-product-list">Product List</Link></li>*/}
                    {/*                <li><Link className={`${path === "ecom-product-detail" ? "mm-active" : ""}`}*/}
                    {/*                          to="/ecom-product-detail">Product Details</Link></li>*/}
                    {/*                <li><Link className={`${path === "ecom-product-order" ? "mm-active" : ""}`}*/}
                    {/*                          to="/ecom-product-order">Order</Link></li>*/}
                    {/*                <li><Link className={`${path === "ecom-checkout" ? "mm-active" : ""}`}*/}
                    {/*                          to="/ecom-checkout">Checkout</Link></li>*/}
                    {/*                <li><Link className={`${path === "ecom-invoice" ? "mm-active" : ""}`}*/}
                    {/*                          to="/ecom-invoice">Invoice</Link></li>*/}
                    {/*                <li><Link className={`${path === "ecom-customers" ? "mm-active" : ""}`}*/}
                    {/*                          to="/ecom-customers">Customers</Link></li>*/}
                    {/*            </ul>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</li>*/}
                    {/*<li className={`${charts.includes(path) ? "mm-active" : ""}`}>*/}
                    {/*    <Link className="has-arrow ai-icon" to="#">*/}
                    {/*        <i className="flaticon-041-graph"></i>*/}
                    {/*        <span className="nav-text">Charts</span>*/}
                    {/*    </Link>*/}
                    {/*    <ul>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "chart-rechart" ? "mm-active" : ""}`}*/}
                    {/*                to="/chart-rechart"*/}
                    {/*            >*/}
                    {/*                RechartJs*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "chart-chartjs" ? "mm-active" : ""}`}*/}
                    {/*                to="/chart-chartjs"*/}
                    {/*            >*/}
                    {/*                Chartjs*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "chart-chartist" ? "mm-active" : ""}`}*/}
                    {/*                to="/chart-chartist"*/}
                    {/*            >*/}
                    {/*                Chartist*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "chart-sparkline" ? "mm-active" : ""}`}*/}
                    {/*                to="/chart-sparkline"*/}
                    {/*            >*/}
                    {/*                Sparkline*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "chart-apexchart" ? "mm-active" : ""}`}*/}
                    {/*                to="/chart-apexchart"*/}
                    {/*            >*/}
                    {/*                Apexchart*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</li>*/}
                    {/*<li className={`${bootstrap.includes(path) ? "mm-active" : ""}`}>*/}
                    {/*    <Link className="has-arrow ai-icon" to="#">*/}
                    {/*        <i className="flaticon-086-star"></i>*/}
                    {/*        <span className="nav-text">Bootstrap</span>*/}
                    {/*    </Link>*/}
                    {/*    <ul>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "ui-accordion" ? "mm-active" : ""}`}*/}
                    {/*                to="/ui-accordion"*/}
                    {/*            >*/}
                    {/*                Accordion*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "ui-alert" ? "mm-active" : ""}`}*/}
                    {/*                to="/ui-alert"*/}
                    {/*            >*/}
                    {/*                Alert*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "ui-badge" ? "mm-active" : ""}`}*/}
                    {/*                to="/ui-badge"*/}
                    {/*            >*/}
                    {/*                Badge*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "ui-button" ? "mm-active" : ""}`}*/}
                    {/*                to="/ui-button"*/}
                    {/*            >*/}
                    {/*                Button*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "ui-modal" ? "mm-active" : ""}`}*/}
                    {/*                to="/ui-modal"*/}
                    {/*            >*/}
                    {/*                Modal*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "ui-button-group" ? "mm-active" : ""}`}*/}
                    {/*                to="/ui-button-group"*/}
                    {/*            >*/}
                    {/*                Button Group*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "ui-list-group" ? "mm-active" : ""}`}*/}
                    {/*                to="/ui-list-group"*/}
                    {/*            >*/}
                    {/*                List Group*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "ui-card" ? "mm-active" : ""}`}*/}
                    {/*                to="/ui-card"*/}
                    {/*            >*/}
                    {/*                Cards*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "ui-carousel" ? "mm-active" : ""}`}*/}
                    {/*                to="/ui-carousel"*/}
                    {/*            >*/}
                    {/*                Carousel*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "ui-dropdown" ? "mm-active" : ""}`}*/}
                    {/*                to="/ui-dropdown"*/}
                    {/*            >*/}
                    {/*                Dropdown*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "ui-popover" ? "mm-active" : ""}`}*/}
                    {/*                to="/ui-popover"*/}
                    {/*            >*/}
                    {/*                Popover*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "ui-progressbar" ? "mm-active" : ""}`}*/}
                    {/*                to="/ui-progressbar"*/}
                    {/*            >*/}
                    {/*                Progressbar*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "ui-tab" ? "mm-active" : ""}`}*/}
                    {/*                to="/ui-tab"*/}
                    {/*            >*/}
                    {/*                Tab*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "ui-typography" ? "mm-active" : ""}`}*/}
                    {/*                to="/ui-typography"*/}
                    {/*            >*/}
                    {/*                Typography*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "ui-pagination" ? "mm-active" : ""}`}*/}
                    {/*                to="/ui-pagination"*/}
                    {/*            >*/}
                    {/*                Pagination*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "ui-grid" ? "mm-active" : ""}`}*/}
                    {/*                to="/ui-grid"*/}
                    {/*            >*/}
                    {/*                Grid*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</li>*/}
                    {/*<li className={`${plugins.includes(path) ? "mm-active" : ""}`}>*/}
                    {/*    <Link className="has-arrow ai-icon" to="#">*/}
                    {/*        <i className="flaticon-045-heart"></i><span className="nav-text">Plugins</span>*/}
                    {/*    </Link>*/}
                    {/*    <ul>*/}
                    {/*        <li><Link className={`${path === "uc-select2" ? "mm-active" : ""}`} to="/uc-select2">Select*/}
                    {/*            2</Link></li>*/}
                    {/*        <li><Link className={`${path === "uc-nestable" ? "mm-active" : ""}`}*/}
                    {/*                  to="/uc-nestable">Nestedable</Link></li>*/}
                    {/*        <li><Link className={`${path === "uc-noui-slider" ? "mm-active" : ""}`}*/}
                    {/*                  to="/uc-noui-slider">Noui Slider</Link></li>*/}
                    {/*        <li><Link className={`${path === "uc-sweetalert" ? "mm-active" : ""}`} to="/uc-sweetalert">Sweet*/}
                    {/*            Alert</Link></li>*/}
                    {/*        <li><Link className={`${path === "uc-toastr" ? "mm-active" : ""}`}*/}
                    {/*                  to="/uc-toastr">Toastr</Link></li>*/}
                    {/*        <li><Link className={`${path === "map-jqvmap" ? "mm-active" : ""}`} to="/map-jqvmap">Jqv*/}
                    {/*            Map</Link></li>*/}
                    {/*        <li><Link className={`${path === "uc-lightgallery" ? "mm-active" : ""}`}*/}
                    {/*                  to="/uc-lightgallery">Light Gallery</Link></li>*/}
                    {/*    </ul>*/}
                    {/*</li>*/}
                    {/*<li className={`${redux.includes(path) ? "mm-active" : ""}`}>*/}
                    {/*    <Link className="has-arrow ai-icon" to="#">*/}
                    {/*        <i className="flaticon-087-stop"></i><span className="nav-text">Redux</span>*/}
                    {/*    </Link>*/}
                    {/*    <ul>*/}
                    {/*        <li><Link className={`${path === "todo" ? "mm-active" : ""}`} to="/todo">Todo</Link></li>*/}
                    {/*        <li><Link className={`${path === "redux-form" ? "mm-active" : ""}`} to="/redux-form">Redux*/}
                    {/*            Form</Link></li>*/}
                    {/*        <li><Link className={`${path === "redux-wizard" ? "mm-active" : ""}`} to="/redux-wizard">Redux*/}
                    {/*            Wizard</Link></li>*/}
                    {/*    </ul>*/}
                    {/*</li>*/}
                    {/*<li className={`${widget.includes(path) ? "mm-active" : ""}`}>*/}
                    {/*    <Link to="widget-basic" className="ai-icon">*/}
                    {/*        <i className="flaticon-013-checkmark"></i>*/}
                    {/*        <span className="nav-text">Widget</span>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    {/*<li className={`${forms.includes(path) ? "mm-active" : ""}`}>*/}
                    {/*    <Link className="has-arrow ai-icon" to="#">*/}
                    {/*        <i className="flaticon-072-printer"></i>*/}
                    {/*        <span className="nav-text forms">Forms</span>*/}
                    {/*    </Link>*/}
                    {/*    <ul>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "form-element" ? "mm-active" : ""}`}*/}
                    {/*                to="/form-element"*/}
                    {/*            >*/}
                    {/*                Form Elements*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "form-wizard" ? "mm-active" : ""}`}*/}
                    {/*                to="/form-wizard"*/}
                    {/*            >*/}
                    {/*                Wizard*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${*/}
                    {/*                    path === "form-editor-summernote" ? "mm-active" : ""*/}
                    {/*                }`}*/}
                    {/*                to="/form-editor-summernote"*/}
                    {/*            >*/}
                    {/*                Summernote*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${path === "form-pickers" ? "mm-active" : ""}`}*/}
                    {/*                to="/form-pickers"*/}
                    {/*            >*/}
                    {/*                Pickers*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${*/}
                    {/*                    path === "form-validation-jquery" ? "mm-active" : ""*/}
                    {/*                }`}*/}
                    {/*                to="/form-validation-jquery"*/}
                    {/*            >*/}
                    {/*                Form Validate*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</li>*/}
                    {/*<li className={`${table.includes(path) ? "mm-active" : ""}`}>*/}
                    {/*    <Link className="has-arrow ai-icon" to="#"><i className="flaticon-043-menu"></i><span*/}
                    {/*        className="nav-text">Table</span></Link>*/}
                    {/*    <ul>*/}
                    {/*        <li>*/}
                    {/*            <Link className={`${path === "table-filtering" ? "mm-active" : ""}`}*/}
                    {/*                  to="/table-filtering">*/}
                    {/*                Table Filtering*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link className={`${path === "table-sorting" ? "mm-active" : ""}`} to="/table-sorting">*/}
                    {/*                Table Sorting*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link className={`${path === "table-bootstrap-basic" ? "mm-active" : ""}`}*/}
                    {/*                  to="/table-bootstrap-basic">*/}
                    {/*                Bootstrap*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link className={`${path === "table-datatable-basic" ? "mm-active" : ""}`}*/}
                    {/*                  to="/table-datatable-basic">*/}
                    {/*                Datatable*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</li>*/}
                    {/*<li className={`${pages.includes(path) ? "mm-active" : ""}`}>*/}
                    {/*    <Link className="has-arrow ai-icon" to="#">*/}
                    {/*        <i className="flaticon-022-copy"></i>*/}
                    {/*        <span className="nav-text">Pages</span>*/}
                    {/*    </Link>*/}
                    {/*    <ul>*/}
                    {/*        <li className={`${error.includes(path) ? "mm-active" : ""}`}>*/}
                    {/*            <Link className="has-arrow" to="#">Error</Link>*/}
                    {/*            <ul>*/}
                    {/*                <li><Link className={`${path === "page-error-400" ? "mm-active" : ""}`}*/}
                    {/*                          to="/page-error-400">Error 400</Link></li>*/}
                    {/*                <li><Link className={`${path === "page-error-403" ? "mm-active" : ""}`}*/}
                    {/*                          to="/page-error-403">Error 403</Link></li>*/}
                    {/*                <li><Link className={`${path === "page-error-404" ? "mm-active" : ""}`}*/}
                    {/*                          to="/page-error-404">Error 404</Link></li>*/}
                    {/*                <li><Link className={`${path === "page-error-500" ? "mm-active" : ""}`}*/}
                    {/*                          to="/page-error-500">Error 500</Link></li>*/}
                    {/*                <li><Link className={`${path === "page-error-503" ? "mm-active" : ""}`}*/}
                    {/*                          to="/page-error-503">Error 503</Link></li>*/}
                    {/*            </ul>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link*/}
                    {/*                className={`${*/}
                    {/*                    path === "page-lock-screen" ? "mm-active" : ""*/}
                    {/*                }`}*/}
                    {/*                to="/page-lock-screen"*/}
                    {/*            >*/}
                    {/*                Lock Screen*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</li>*/}
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
