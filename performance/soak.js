import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 30 }, // ramp up
        { duration: '1m', target: 30 },  // hold
        { duration: '30s', target: 10 }, // ramp down
    ],
};

export default function () {
    const routes = [
        '/',
        '/pengembang',
        '/tata-tertib',
        '/cara-magang',
        '/tips-memilih-magang',
    ];
    for (const route of routes) {
        const res = http.get(`http://127.0.0.1:8001${route}`);
        check(res, { [`${route} status is 200`]: (r) => r.status === 200 });
        sleep(1);
    }
}
