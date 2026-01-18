import http from 'k6/http';
import { check, sleep } from 'k6';

//variabel
export const options = {
    vus: 20,
    duration: '2m',
    thresholds: {
        'http_req_duration': ['p(95)<500'], 
    },
};


//test data
export default function () {
    const url = 'https://restful-booker.herokuapp.com/booking';

    const payload = JSON.stringify({
        "firstname": "Bad" + __VU,
        "lastname": "Data" + Date.now(),
        "totalprice": 999,
        "depositpaid": true,
        "bookingdates": { 
            "checkin": "2019-01-01", 
            "checkout": "2018-01-01"  // tanggal checkout nya lebih awal
        },
        "additionalneeds": "None"
    });

    const params = {
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    };

    const res = http.post(url, payload, params);


// VERIFIKASI
    check(res, {
        'Status is NOT 200 (Expected)': (r) => r.status !== 200,
        'Status is 400 or 422': (r) => r.status === 400 || r.status === 422,
    });

    if (res.status === 200) {
        console.warn(`BUG terdeteksi! Server menerima data invalid: ${res.body}`);
    }

    sleep(1);
}