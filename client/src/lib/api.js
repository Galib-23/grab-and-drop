const API_BASE_URL = "https://grab-and-drop.onrender.com";

const buildApiUrl = (pathname) => {
    if (!pathname) return API_BASE_URL;
    const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
    return `${API_BASE_URL}${normalizedPath}`;
};

export { API_BASE_URL, buildApiUrl };
