import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
    key: 'f566a73b20b1548b5a13',
    cluster: 'ap2',
  encrypted: true, // Ensure encryption is enabled to match backend
  forceTLS: true, // Force TLS for secure communication
  authEndpoint: `https://api.discoun3ree.com/broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export default echo;
