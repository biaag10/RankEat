import { toast } from 'react-toastify'

export const notifyError = (msg: string) =>
  toast.error(msg, {
    position: 'top-center',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
    className: 'font-montserrat',
  })

export const notifySuccess = (msg: string) =>
  toast.success(msg, {
    position: 'top-center',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
    className: 'font-montserrat',
  })