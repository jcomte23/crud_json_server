(() => {
    const isAutorizated=localStorage.getItem("isAutorizated")
    const path= window.location.pathname
    const routeActive=path.substring(path.lastIndexOf("/"))
    const privateRoutes=["indexUsers.html"]

    if (privateRoutes.includes(routeActive) && !isAutorizated) {
        window.location.href = "index.html"
    }
    
    console.log(window.location.host);
    console.log(window.location.pathname);
})()