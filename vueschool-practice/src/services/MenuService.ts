import { MenuRequestBody, MenuResponseValue } from '../models/MenuModel';
import { sendRequest } from './RequestService';
import { ApiResponse } from '../models/ApiResponseModel';

const apiPath = import.meta.env.VITE_API_URL;
export async function getAllMenu() {
    try {
        return sendRequest<ApiResponse<MenuResponseValue[]>>(`${apiPath}/menu`);
    } catch (error) {
        console.error('Error calling the API:', error);
    }
}

export async function addMenu(body: MenuRequestBody) {
    try {
        return sendRequest<ApiResponse<MenuResponseValue>>(`${apiPath}/menu`, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    } catch (error) {
        console.error('Error calling the API:', error);
    }
}

export async function updateMenu(body: MenuRequestBody) {
    try {
        return sendRequest<ApiResponse<MenuResponseValue>>(`${apiPath}/menu/${body.id}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    } catch (error) {
        console.error('Error calling the API:', error);
    }
}

export async function deleteMenu(id: string) {
    try {
        return sendRequest<ApiResponse<MenuResponseValue>>(`${apiPath}/menu/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error calling the API:', error);
    }
}