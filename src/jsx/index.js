import React, {useContext, useEffect, useState} from "react";

/// React router dom
import {Routes, Route, Navigate} from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
/// Dashboard
import Home from "./components/Dashboard/Home";
import {ThemeContext} from "../context/ThemeContext";
import Posts from "./components/posts/Posts";
import NewPost from "./components/posts/NewPost";
import Comments from "./components/Comments/comments";
import Categories from "./components/Category/Categories";
import NewCategory from "./components/Category/NewCategory";
import EditCategory from "./components/Category/EditCategory";
import Users from "./components/users/users";
import Constants from "./components/constants/constants";
import NotFound from "./pages/NotFound";
import EditPost from "./components/posts/EditPost";
import EditComment from "./components/Comments/EditComment";
import Links from "./components/links/Links";
import AddLink from "./components/links/AddLink";
import EditLink from "./components/links/EditLink";
import Subscribers from "./components/subscribers/Subscribers";
import AddUser from "./components/users/AddUser";
import {userData} from "../store/selectors/AuthSelectors";
import {connect} from "react-redux";
import Ads from "./components/ads/Ads";
import NewAd from "./components/ads/NewAd";

const Markup = props => {
    const {menuToggle} = useContext(ThemeContext);
    const adminRoutes = [
        /// Dashboard
        {url: "", component: () => <Navigate to="/dashboard"/>},
        {url: "dashboard", component: <Home />},

        //  posts
        {url: "posts", component: <Posts />},
        {url: "new-post", component: <NewPost />},
        {url: "edit-post/:id", component: <EditPost />},

        //  categories
        {url: "categories", component: <Categories />},
        {url: "new-category", component: <NewCategory />},
        {url: "edit-category/:id", component: <EditCategory />},

        //user
        {url: "users", component: <Users />},
        {url: "add-users", component: <AddUser />},

        //constants
        {url: 'constants', component: <Constants />},

        // comments
        {url: "comments", component: <Comments />},
        {url: "edit-comment/:id", component: <EditComment />},

        // links
        {url: "links", component: <Links />},
        {url: "new-link", component: <AddLink />},
        {url: "edit-link/:id", component: <EditLink />},

        //subscribers
        {url: "subscribers", component: <Subscribers />},

        //ads
        {url: "ads", component: <Ads />},
        {url: "new-ad", component: <NewAd />},

        //404
        {url: "*", component: <NotFound />}
    ];
    const subAdminRoutes = [
        /// Dashboard
        {url: "", component: () => <Navigate to="/dashboard"/>},
        {url: "dashboard", component: <Home />},

        //  posts
        {url: "posts", component: <Posts />},
        {url: "new-post", component: <NewPost />},

        //404
        {url: "*", component: <NotFound />}
    ];
    let path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];

    let [routes, setRoutes] = useState([
        //404
        {url: "*", component: NotFound}
    ]);
    useEffect(() => {
        setRoutes(props.userData.role === "Admin" ? adminRoutes : subAdminRoutes);
    }, [props.userData]);

    let pagePath = path.split("-").includes("page");
    return (
        <>
            <div
                id={`${!pagePath ? "main-wrapper" : ""}`}
                className={`${!pagePath ? "show" : "vh-100"}  ${
                    menuToggle ? "menu-toggle" : ""
                }`}
            >
                {!pagePath && <Nav/>}

                <div className={`${!pagePath ? "content-body" : ""}`}>
                    <div
                        className={`${!pagePath ? "container-fluid" : ""}`}
                        style={{minHeight: window.screen.height - 60}}
                    >
                        <Routes>
                            {routes.map((data, i) => (
                                <Route
                                    key={i}
                                    exact
                                    path={`/${data.url}`}
                                    element={data.component}
                                />
                            ))}
                        </Routes>
                    </div>
                </div>
                {!pagePath && <Footer/>}
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
        return {
            userData: userData(state),
        };
    }
;

export default connect(mapStateToProps)(Markup);
