import http from 'k6/http';
import { check } from 'k6';

//variabel
export const options = {
    vus: 20,
    duration: '2m',
    thresholds: {
        'http_req_duration': ['p(95)<1200'], // SLA dilonggarkan 
    },
};

//test data
export default function () {
    const heavyText = "a".repeat(1100);     // Membuat teks 1000+ karakter  

    const payload = JSON.stringify({
        firstname: "Jim" + __VU,
        lastname: "Brown" + Date.now(),
        totalprice: 111,
        depositpaid: true,
        bookingdates: { checkin: "2018-01-01", checkout: "2019-01-01" },
        additionalneeds: heavyText 
    });

    const res = http.post('https://restful-booker.herokuapp.com/booking', payload, {
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json' 
        },
    });

    if (res.status !== 200 && __ITER === 0) {
        console.log(`[VU: ${__VU}] Menemukan Error ${res.status}: ${res.body}`);
    }

//verifikasi
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}