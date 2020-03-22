import Swal from 'sweetalert2';

export default (icon, title, text) => {
  Swal.fire({
    icon,
    title,
    text
  });
};
