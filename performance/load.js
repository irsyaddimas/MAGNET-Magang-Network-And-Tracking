import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 20,
    duration: '30s',
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
