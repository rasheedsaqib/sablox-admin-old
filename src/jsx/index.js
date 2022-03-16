import React, {useContext, useEffect, useState} from "react";

/// React router dom
import {Switch, Route, Redirect} from "react-router-dom";

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
        {url: "", component: () => <Redirect to="/dashboard"/>},
        {url: "dashboard", component: Home},
        // {url: "dashboard-dark", component: DashboardDark},
        // {url: "guest-list", component: GuestList},
        // {url: "guest-detail", component: GuestDetail},
        // {url: "concierge", component: Concierge},
        // {url: "room-list", component: Room},
        // {url: "reviews", component: Reviews},
        // {url: "task", component: Task},

        //  posts
        {url: "posts", component: Posts},
        {url: "new-post", component: NewPost},
        {url: "edit-post/:id", component: EditPost},

        //  categories
        {url: "categories", component: Categories},
        {url: "new-category", component: NewCategory},
        {url: "edit-category/:id", component: EditCategory},

        //user
        {url: "users", component: Users},
        {url: "add-users", component: AddUser},

        //constants
        {url: 'constants', component: Constants},

        // comments
        {url: "comments", component: Comments},
        {url: "edit-comment/:id", component: EditComment},

        // links
        {url: "links", component: Links},
        {url: "new-link", component: AddLink},
        {url: "edit-link/:id", component: EditLink},

        //subscribers
        {url: "subscribers", component: Subscribers},

        //ads
        {url: "ads", component: Ads},
        {url: "new-ad", component: NewAd},

        //404
        {url: "*", component: NotFound}

        ///themes
        // {url: "theme1", component: Demo1},
        // {url: "theme2", component: Demo2},
        // {url: "theme3", component: Demo3},
        // {url: "theme4", component: Demo4},
        // {url: "theme5", component: Demo5},
        //
        //
        // /// Apps
        // {url: "app-profile", component: AppProfile},
        // {url: "email-compose", component: Compose},
        // {url: "email-inbox", component: Inbox},
        // {url: "email-read", component: Read},
        // {url: "app-calender", component: Calendar},
        // {url: "post-details", component: PostDetails},
        //
        // /// Chart
        // {url: "chart-sparkline", component: SparklineChart},
        // {url: "chart-chartjs", component: ChartJs},
        // {url: "chart-chartist", component: Chartist},
        // {url: "chart-apexchart", component: ApexChart},
        // {url: "chart-rechart", component: RechartJs},
        //
        // /// Bootstrap
        // {url: "ui-alert", component: UiAlert},
        // {url: "ui-badge", component: UiBadge},
        // {url: "ui-button", component: UiButton},
        // {url: "ui-modal", component: UiModal},
        // {url: "ui-button-group", component: UiButtonGroup},
        // {url: "ui-accordion", component: UiAccordion},
        // {url: "ui-list-group", component: UiListGroup},
        // {url: "ui-media-object", component: UiMediaObject},
        // {url: "ui-card", component: UiCards},
        // {url: "ui-carousel", component: UiCarousel},
        // {url: "ui-dropdown", component: UiDropDown},
        // {url: "ui-popover", component: UiPopOver},
        // {url: "ui-progressbar", component: UiProgressBar},
        // {url: "ui-tab", component: UiTab},
        // {url: "ui-pagination", component: UiPagination},
        // {url: "ui-typography", component: UiTypography},
        // {url: "ui-grid", component: UiGrid},
        //
        // /// Plugin
        // {url: "uc-select2", component: Select2},
        // {url: "uc-nestable", component: Nestable},
        // {url: "uc-noui-slider", component: MainNouiSlider},
        // {url: "uc-sweetalert", component: MainSweetAlert},
        // {url: "uc-toastr", component: Toastr},
        // {url: "map-jqvmap", component: JqvMap},
        // {url: "uc-lightgallery", component: Lightgallery},
        //
        // ///Redux
        // {url: "todo", component: Todo},
        // {url: "redux-form", component: ReduxForm},
        // {url: "redux-wizard", component: WizardForm},
        //
        // /// Widget
        // {url: "widget-basic", component: Widget},
        //
        // /// Shop
        // {url: "ecom-product-grid", component: ProductGrid},
        // {url: "ecom-product-list", component: ProductList},
        // {url: "ecom-product-detail", component: ProductDetail},
        // {url: "ecom-product-order", component: ProductOrder},
        // {url: "ecom-checkout", component: Checkout},
        // {url: "ecom-invoice", component: Invoice},
        // {url: "ecom-product-detail", component: ProductDetail},
        // {url: "ecom-customers", component: Customers},
        //
        // /// Form
        // {url: "form-element", component: Element},
        // {url: "form-wizard", component: Wizard},
        // {url: "form-editor-summernote", component: SummerNote},
        // {url: "form-pickers", component: Pickers},
        // {url: "form-validation-jquery", component: jQueryValidation},
        //
        // /// table
        // {url: 'table-filtering', component: FilteringTable},
        // {url: 'table-sorting', component: SortingTable},
        // {url: "table-datatable-basic", component: DataTable},
        // {url: "table-bootstrap-basic", component: BootstrapTable},
        //
        // /// pages
        // {url: "page-lock-screen", component: LockScreen},
        // {url: "page-login", component: Login},
        // {url: "page-error-400", component: Error400},
        // {url: "page-error-403", component: Error403},
        // {url: "page-error-404", component: Error404},
        // {url: "page-error-500", component: Error500},
        // {url: "page-error-503", component: Error503},
    ];
    const subAdminRoutes = [
        /// Dashboard
        {url: "", component: () => <Redirect to="/dashboard"/>},
        {url: "dashboard", component: Home},

        //  posts
        {url: "posts", component: Posts},
        {url: "new-post", component: NewPost},

        //404
        {url: "*", component: NotFound}
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
                        <Switch>
                            {routes.map((data, i) => (
                                <Route
                                    key={i}
                                    exact
                                    path={`/${data.url}`}
                                    component={data.component}
                                />
                            ))}
                        </Switch>
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
