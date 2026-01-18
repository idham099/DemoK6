import http from 'k6/http';
import { check } from 'k6';

//variabel
export const options = {
    vus: 20,
    duration: '2m',
};


//test data
export default function () {
    const payload = JSON.stringify({ username: 'admin' });     //Hanya username tanpa password 

    const res = http.post('https://restful-booker.herokuapp.com/auth', payload, {
        headers: { 'Content-Type': 'application/json' },
    });



// verifikasi
    check(res, {
        'status is 400 or 4xx': (r) => r.status >= 400 && r.status < 500,
    });
}