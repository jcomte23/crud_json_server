import Swal from 'sweetalert2'

export function smallAlertError(message) {
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: `${message}`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });
}

export function smallAlertSuccess(message) {
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: `${message}`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });
}
