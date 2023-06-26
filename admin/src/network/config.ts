let BASE_URL = '';
const TIME_OUT = 10000;

if (import.meta.env.MODE == 'development') {
  BASE_URL = import.meta.env.VITE_DEV_API_URL;
}
if (import.meta.env.MODE == 'production') {
  BASE_URL = import.meta.env.VITE_PRO_API_URL;
}
export { BASE_URL, TIME_OUT };
