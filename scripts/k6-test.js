import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 10, // jumlah virtual users
    duration: '30s', // durasi test
};

export default function () {
    // Ganti URL di bawah ini dengan endpoint API yang ingin diuji
    const res = http.get('http://localhost:8000/');
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    sleep(1);
}
