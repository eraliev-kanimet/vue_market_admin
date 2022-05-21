export function isAuth() {
    return localStorage.getItem('token') || false;
}

export function isAdmin() {
    return localStorage.getItem('admin_key') || false;
}