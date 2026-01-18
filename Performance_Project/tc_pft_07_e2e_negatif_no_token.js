import http from 'k6/http';
import { check } from 'k6';

//variabel
export const options = {
    vus: 20,
    duration: '3m',
};


//testdata
export default function () {
    const payload = JSON.stringify({
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 150,
        depositpaid: true,
        bookingdates: { checkin: "2026-01-01", checkout: "2026-01-02" }
    });

    // Langsung tembak Create Booking tanpa menyertakan Cookie/Token di Header
    const res = http.post('https://restful-booker.herokuapp.com/booking', payload, {
        headers: { 'Content-Type': 'application/json' },
    });


//verifikasi
    // Kriteria Lulus: Response 403 Forbidden (Unauthorized)
    check(res, {
        'status is 403': (r) => r.status === 403,
    });
}