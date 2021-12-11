import Swal from "sweetalert2";


export default function warningAlert(onConfirm) {
    Swal.fire({
        title: '',
        text: 'Are your sure you want to delete?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No, cancel!',
        confirmButtonText: 'Yes, delete it!',
        customClass: {
            confirmButton: 'btn btn-danger',
            cancelButton: 'btn '
        },
        buttonsStyling: false
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm()
        }
        // else if (
        //     /* Read more about handling dismissals below */
        //     result.dismiss === Swal.DismissReason.cancel
        // ) {
        //     console.log('Canceled');
        // }
    })
}