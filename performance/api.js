import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,
    duration: '1m',
};

export default function () {
    const res = http.get('http://127.0.0.1:8001/api/user');
    check(res, { 'status is 401': (r) => r.status === 401 }); // 401 expected if not authenticated
    sleep(1);
}
