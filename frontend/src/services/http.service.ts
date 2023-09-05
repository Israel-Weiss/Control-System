import Axios, { AxiosError, AxiosResponse } from 'axios'

const BASE_URL: string = process.env.NODE_ENV === 'production'
    ? '/api/'
    : 'http://localhost:3030/api/'

var axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint: string, data?: any) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint: string, data: any) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint: string, data?: any) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint: string, data?: any) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint: string, method: string = 'GET', data: any = null):
    Promise<AxiosResponse['data']> {

    try {
        const res: AxiosResponse = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })
        return res.data
    } catch (error) {
        const err = error as AxiosError
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
            window.location.assign('/')
        }
        throw err
    }
}