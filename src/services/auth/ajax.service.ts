import axios, { AxiosAdapter, AxiosError, AxiosResponse } from "axios"
import { AjaxOutput } from "../../interfaces/ajax.dto";

function handeleError(error: AxiosError | unknown): AjaxOutput {
    return { error, status: "Failed" }
}
function handleSuccess(data: any): AjaxOutput {
    return { data, status: "Success" }
}


async function get(url: string, params: string): Promise<AjaxOutput> {
    try {
        const response: AxiosResponse = await axios.get(`${url}${params}`);
        return handleSuccess(response.data)
    }
    catch (error) {
        return handeleError(error)
    }
}


async function post(url: string, body: any): Promise<AjaxOutput> {
    try {
        const response: AxiosResponse = await axios.post(`${url}`, body);
        return handleSuccess(response.data)
    }
    catch (error) {
        return handeleError(error)
    }
}

async function destroy(url: string, params: string): Promise<AjaxOutput> {
    try {
        const response: AxiosResponse = await axios.delete(`${url}${params}`);
        return handleSuccess(response.data)
    }
    catch (error) {
        return handeleError(error)
    }
}


function setAuthToken(token: string) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}


export default {
    get, post, destroy, setAuthToken
};