export const isAuthenticated = (state) => {
    if (state.auth.auth.idToken) return true;
    return false;
};

export const userData = (state) => {
    return state.auth.auth.user;
}

export const token = (state) => {
    return state.auth.auth.idToken;
}