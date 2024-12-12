window.addEventListener("resize", checkScreenSize);

function checkScreenSize() {
    const minWidth = 980;
    const minHeight = 350;

    if (window.innerWidth < minWidth || window.innerHeight < minHeight) {
        Swal.fire({
            title: "Screen Size Too Small",
            text: "Your screen is not big enough for this game. Please use a desktop with a keyboard.",
            icon: "warning",
            confirmButtonText: "Got it",
            confirmButtonColor: "#1E3229",
            footer: "Minimum screen size: 980x350",
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
    }
}
