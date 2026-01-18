import http from 'k6/http';
import { check, sleep } from 'k6';

//variabel
export const options = {
    vus: 20,
    duration: '3m', 
    thresholds: {
        'http_req_duration': ['p(95)<1500'], 
        'http_req_failed': ['rate<0.01'], 
    },
};

const BASE_URL = 'https://restful-booker.herokuapp.com';


//test data
export default function () {
    // --- STEP 1: AUTH (Menggunakan kredensial valid) ---
    const authPayload = JSON.stringify({
        "username": "admin",
        "password": "password123"
    });
    const authRes = http.post(`${BASE_URL}/auth`, authPayload, {
        headers: { 'Content-Type': 'application/json' },
    });
    const token = authRes.json().token;
    check(authRes, {
        'Auth: Status 200': (r) => r.status === 200,
        'Auth: Token didapat': (r) => token !== undefined,
    });

    // --- STEP 2: CREATE BOOKING (Sesuai Test Data di Tabel) ---
    const bookingPayload = JSON.stringify({
        "firstname": "Jim" + __VU,
        "lastname": "Brown" + Date.now(), // datanya tidak boleh duplikat
        "totalprice": 150,
        "depositpaid": true,
        "bookingdates": { 
            "checkin": "2026-01-01", 
            "checkout": "2026-01-02" 
        },
        "additionalneeds": "Breakfast"
    });
    const createRes = http.post(`${BASE_URL}/booking`, bookingPayload, {
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });

    const bookingId = createRes.status === 200 ? createRes.json().bookingid : null;


//verifikasi
    check(createRes, {
        'Create: Status 200': (r) => r.status === 200,
        'Create: ID muncul': (r) => bookingId !== null,
    });

    // --- STEP 3: VERIFIKASI VIA GET /booking/{id} ---
    if (bookingId) {
        sleep(0.5);
        const getRes = http.get(`${BASE_URL}/booking/${bookingId}`, {
            headers: { 'Accept': 'application/json' },
        });

        check(getRes, {
            'Verify: Status 200': (r) => r.status === 200,
            'Step 3 - Is JSON': (r) => {
                try {
                    return r.json() !== null;
                } catch (e) {
                    return false; 
                }
            },
            'Step 3 - Nama sesuai': (r) => {
                try {
                    return r.json().firstname.includes("Jim");
                } catch (e) {
                    return false;
                }
            },
        });
    }

    if (createRes.status !== 200 && __ITER === 0) {
        console.log(`[E2E] Error pada VU ${__VU}: ${createRes.status} - ${createRes.body}`);
    }

    sleep(1); 
}