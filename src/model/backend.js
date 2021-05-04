import axios from 'axios';
let API_KEY = "API key go here"

class Backend{
    constructor() {
        this.api_key = API_KEY;
    }
    async getDateRange(start, end, productName) {
        const body = {
            'mode':'name_date',
            'queryStringParameters': {
                'start': start,
                'end': end,
                'productName':productName
            }
        }
        const response = await axios.post("https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id", body);
        return JSON.parse(response.data['body']);
    }
    async getByName(productName) {
        const body = {
            'mode':'name',
            'queryStringParameters': {
                'productName': productName
            }
        }
        const response = await axios.post("https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id", body);
        return JSON.parse(response.data['body']);
    }
    async getByMonth(month) {
        const body = {
            'mode':'month',
            'queryStringParameters': {
                'month': month
            }
        }
        const response = await axios.post("https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id", body);
        return JSON.parse(response.data['body']);
    }
    async getByMonthDate(start, end, month) {
        const body = {
            'mode':'month_date',
            'queryStringParameters': {
                'start': start,
                'end': end,
                'month':month
            }
        }
        const response = await axios.post("https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id", body);
        return JSON.parse(response.data['body']);
    }
    async getTargetDate(start, end,target) {
        const body = {
            'mode':'target_date',
            'queryStringParameters': {
                'start': start,
                'end': end,
                'target':target
            }
        }
        const response = await axios.post("https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id", body);
        return JSON.parse(response.data['body']);
    }
    async getTarget(target) {
        const body = {
            'mode':'target',
            'queryStringParameters': {
                'target':target
            }
        }
        const response = await axios.post("https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id", body);
        return JSON.parse(response.data['body']);
    }
    async getNameTargetDate(start, end, nameTarget) {
        const body = {
            'mode':'name_target_date',
            'queryStringParameters': {
                'start': start,
                'end': end,
                'name_target_date':nameTarget
            }
        }
        const response = await axios.post("https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id", body);
        return JSON.parse(response.data['body']);
    }
    async getNameTarget(target, productName) {
        const body = {
            'mode':'name_target',
            'queryStringParameters': {
                'target': target,
                'productName':productName
            }
        }
        const response = await axios.post("https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id", body);
        return JSON.parse(response.data['body']);
    }
    async put(document) {
        const body = document
        const response = await axios.post("https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/", body)
        return JSON.parse(response.data['body'])
    }
    async getDocFromImage(image) {
        
    }
    async getItem() {
        
    }
    async update(oldDoc, newDoc) {
        if (oldDoc !== newDoc) {
            let body = {
                'id': oldDoc['id'],
                'updateStringParameters': {}
            }
            for (const property in oldDOc) {
                if(oldDoc[property]!=newDoc[property])
                    body['updateStringParameters'][property] = newDoc[property]
            }
            const response=await axios.patch("https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/",body)
            return JSON.parse(response.data['body'])
        }
    }
}

export default Backend;