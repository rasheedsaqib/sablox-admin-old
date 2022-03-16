import React, {createContext, useEffect, useState} from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {

    const body = document.querySelector("body");
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const [iconHover, setIconHover] = useState(false);
    const [sideBarStyle, setSideBarStyle] = useState({value: "full", label: "Full",});
    const [sidebarposition, setSidebarposition] = useState({value: "fixed", label: "Fixed",});
    const [headerposition, setHeaderposition] = useState({value: "fixed", label: "Fixed",});
    const [sidebarLayout, setSidebarLayout] = useState({value: "vertical", label: "Vertical",});
    const [menuToggle, setMenuToggle] = useState(false);

    const changeSideBarLayout = (name) => {
        if (name.value === "horizontal") {
            if (sideBarStyle.value === "overlay") {
                setSidebarLayout(name);
                body.setAttribute("data-layout", name.value);
                setSideBarStyle({value: "full", label: "Full"});
                body.setAttribute("data-sidebar-style", "full");
            } else {
                setSidebarLayout(name);
                body.setAttribute("data-layout", name.value);
            }
        } else {
            setSidebarLayout(name);
            body.setAttribute("data-layout", name.value);
        }
    };

    const changeSideBarStyle = (name) => {
        if (sidebarLayout.value === "horizontal") {
            if (name.value === "overlay") {
                alert("Sorry! Overlay is not possible in Horizontal layout.");
            } else {
                setSideBarStyle(name);
                setIconHover(name.value === "icon-hover" ? "_i-hover" : "");
                body.setAttribute("data-sidebar-style", name.value);
            }
        } else {
            setSideBarStyle(name);
            setIconHover(name.value === "icon-hover" ? "_i-hover" : "");
            body.setAttribute("data-sidebar-style", name.value);
        }
    };

    const changeHeaderPostion = (name) => {
        setHeaderposition(name);
        body.setAttribute("data-header-position", name.value);
    };

    const openMenuToggle = () => {
        sideBarStyle.value === "overly"
            ? setMenuToggle(true)
            : setMenuToggle(false);
    };

    useEffect(() => {
        const body = document.querySelector("body");
        body.setAttribute("data-typography", "poppins");
        body.setAttribute("data-theme-version", "light");
        body.setAttribute("data-layout", "vertical");
        body.setAttribute("data-primary", "color_1");
        body.setAttribute("data-nav-headerbg", "color_1");
        body.setAttribute("data-headerbg", "color_1");
        body.setAttribute("data-sidebar-style", "overlay");
        body.setAttribute("data-sibebarbg", "color_1");
        body.setAttribute("data-primary", "color_1");
        body.setAttribute("data-sidebar-position", "fixed");
        body.setAttribute("data-header-position", "fixed");
        body.setAttribute("data-container", "wide");
        body.setAttribute("direction", "ltr");
        let resizeWindow = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
            window.innerWidth >= 768 && window.innerWidth < 1024
                ? body.setAttribute("data-sidebar-style", "mini")
                : window.innerWidth <= 768
                    ? body.setAttribute("data-sidebar-style", "overlay")
                    : body.setAttribute("data-sidebar-style", "full");
        };
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    return (
        <ThemeContext.Provider
            value={{
                body,
                sidebarposition,
                windowWidth,
                windowHeight,
                changeSideBarStyle,
                sideBarStyle,
                changeHeaderPostion,
                headerposition,
                changeSideBarLayout,
                sidebarLayout,
                iconHover,
                menuToggle,
                openMenuToggle,
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;


