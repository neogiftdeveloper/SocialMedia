import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { promises, resolve } from 'dns';


axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (Response: AxiosResponse) => Response.data;

const sleep = (ms: number) => (response : AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(2000)).then(responseBody),
    post: (url: string, body: {})  => axios.post(url, body).then(sleep(2000)).then(responseBody),
    put: (url:string, body:{}) => axios.put(url, body).then(sleep(2000)).then(responseBody),
    delete:  (url: string) => axios.delete(url).then(sleep(2000)).then(responseBody)  
}

const Activities = {
    list: () :Promise<IActivity []>  => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post('/activities', activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`/activities/${id}`)
}

export default {
    Activities
}