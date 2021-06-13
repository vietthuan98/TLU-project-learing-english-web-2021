import swal from 'sweetalert2';

export const genId = () => {
  return Math.random()
    .toString(36)
    .substr(2, 9);
};

export async function confirmDelete() {
  return await swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });
}

export async function successMessage(message = "It's ok.") {
  return await swal.fire('', message, 'success');
}

export async function errorMessage(message = "Something went wrong.") {
  return await swal.fire('', message, 'error');
}

export async function guestConfirmation() {
  return await swal.fire({
    text: 'You must be logged in to view this feature.',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `Register`,
    denyButtonText: `Login`,
    customClass: {
      popup: 'guest-confirmation',
    }
  });
}