import http from 'k6/http';
import { check, sleep } from 'k6';

//variabel
export const options = {
    vus: 20, // Target Beban
    duration: '2m', // Durasi 
    thresholds: {
        'http_req_duration': ['p(95)<600'], // Sasaran Pengujian kelulusan
    },
};


//data
export default function () {
    const payload = JSON.stringify({
        username: 'admin',      // Test Data 
        password: 'password123' 
    });

    const params = {
        headers: { 'Content-Type': 'application/json' },
        tags: { name: 'Auth_Login' },
    };

    const res = http.post('https://restful-booker.herokuapp.com/auth', payload, params);



// Verifikasi 
    check(res, {
        'status is 200': (r) => r.status === 200,
        'has token': (r) => r.json().token !== undefined,
    });

    sleep(1);
}