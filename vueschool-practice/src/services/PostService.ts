import { ApiResponse } from "../models/ApiResponseModel";
import { PostSessionResponseValue, PostSessionRequestBody, UpdateSessionRequestBody } from "../models/PostModel";
import { sendRequest } from "./RequestService";
const apiPath = import.meta.env.VITE_API_URL;

export function getAllSessionOfPost(idMenu: string) {
    try {
        return sendRequest<ApiResponse<PostSessionResponseValue[]>>(`${apiPath}/post/menu/${idMenu}`);
    } catch (error) {
        console.error('Error calling the API:', error);
    }
}

export function addPostSession(body: PostSessionRequestBody) {
    try {
        return sendRequest<ApiResponse<PostSessionResponseValue>>(`${apiPath}/post`,
            {
                method: 'POST',
                body: JSON.stringify(body)
            }
        );
    } catch (error) {
        console.error('Error calling the API:', error);
    }
}

export function updatePostSession(id: string, body: UpdateSessionRequestBody) {
    try {
        return sendRequest<ApiResponse<PostSessionResponseValue>>(`${apiPath}/post/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(body)
            }
        );
    } catch (error) {
        console.error('Error calling the API:', error);
    }
}

export function deletePostSession(id: string) {
    try {
        return sendRequest<ApiResponse>(`${apiPath}/post/${id}`,
            {
                method: 'DELETE',
            }
        );
    } catch (error) {
        console.error('Error calling the API:', error);
    }
}