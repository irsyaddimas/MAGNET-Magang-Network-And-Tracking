import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '20s', target: 10 },
        { duration: '20s', target: 30 },
        { duration: '20s', target: 150 },
        { duration: '20s', target: 100 },
        { duration: '20s', target: 50 },
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
