document.addEventListener('DOMContentLoaded', function () {  
    const theme=localStorage.getItem("jws_theme")
    if (theme===null) {
        document.documentElement.setAttribute('data-bs-theme', "light")
    }else{
        document.documentElement.setAttribute('data-bs-theme', theme)
    }

    const btnLight = document.getElementById('theme-light')
    const btnDark = document.getElementById('theme-dark')

    btnLight.addEventListener("click",() => {
        document.documentElement.setAttribute('data-bs-theme', "light");
        localStorage.setItem('jws_theme', "light");
    })

    btnDark.addEventListener("click",() => {
        document.documentElement.setAttribute('data-bs-theme', "dark");
        localStorage.setItem('jws_theme', "dark");
    })

});
