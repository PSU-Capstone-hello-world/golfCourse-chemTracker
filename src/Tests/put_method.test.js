import Backend from '../model/backend'
import axios from 'axios';

const form_test = {
    "id": "1",
    "productName": "Chemical-X",
    "date": "2021-04-05",
    "target": "greens",
    "signature": "Michael",
    "sigDate": "2021-04-05"
}

test('test put method', async () => {
    const test = new Backend();
    const data = await test.put(form_test);
    expect(data['status code']).toBe('200');
});

