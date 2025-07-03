import { redirect } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_BACKEND_API_BASE_URL;

export async function requestApi(endpoint, { method = 'GET', headers = {}, body = null }) {
    const url = `${baseUrl}${endpoint}`;

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
        options.headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
    }

    console.log(`Making ${method} request to ${url} with body:`, body);

    const response = await fetch(url, options);

    console.log(`Response from ${url}:`, response.status, response.statusText);

    if (!response.ok) {
        const statusCode = response.status;
        const body = await response.json();

        if (statusCode === 401) {
            console.error('Unauthorized access - redirecting to login');
            // Error Handler
            return redirect('/login');
        }
        if (statusCode === 403) {
            console.error('Forbidden access');
            // Error Handler
            return;
        }
        if (statusCode === 404) {
            console.error('Resource not found');
            // Error Handler
            return;
        }
        // Error Handler
        return;
    }
    if (
        response.status === 204 ||
        response.status === 205 ||
        response.headers.get('content-length') === '0'
    ) {
        console.log(`No content returned from ${url}`);
        return null;
    }
    const responseBody = await response.json();
    console.log("Type of response body:", typeof responseBody);
    console.log(`Response body from ${url}:`);
    console.log(responseBody);
    return responseBody;
}

export default {
    requestApi
};