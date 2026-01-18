import http from 'k6/http';
import { check, sleep } from 'k6';

//variabel
export const options = {
    vus: 20,
    duration: '2m',
    thresholds: {
        // Sasaran Pengujian: p(95) < 800ms
        'http_req_duration': ['p(95)<800'],
        // Sasaran Pengujian: Error Rate < 1%
        'http_req_failed': ['rate<0.01'],
    },
};

//tes data
export default function () {
    const url = 'https://restful-booker.herokuapp.com/booking';

    const payload = JSON.stringify({
        "firstname": "Jim" + __VU, // data Akan jadi Jim1, Jim2, dst.
        "lastname": "Brown" + Date.now(), // Nama belakang jadi angka unik (timestamp)
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": { 
            "checkin": "2018-01-01", 
            "checkout": "2019-01-01" 
        },
        "additionalneeds": "Breakfast"
    });

    const params = {
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
        },
    };

// Eksekusi Request
    const res = http.post(url, payload, params);

//Verifikasi sesuai Test Step di tabel Mas
    check(res, {
        'status is 200': (r) => r.status === 200,
        'is json response': (r) => {
            try {
                return r.json() !== null;
            } catch (e) {
                return false;
            }
        },
        'has bookingid': (r) => {
            // Kita hanya cek bookingid jika statusnya 200
            if (r.status === 200) {
                return r.json().bookingid !== undefined;
            }
            return false;
        },
    });

    if (res.status !== 200) {
        console.log(`Waduh! Server Error ${res.status}: ${res.body}`);
    }

    sleep(1);
}