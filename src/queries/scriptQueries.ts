import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import {AxiosResponse} from 'axios';
import {ScriptDto} from "../types/script";

interface ScriptResponse {
    id: string;
    name: string;
    description: string;
}

const addScript = async (formData: FormData): Promise<AxiosResponse<ScriptResponse>> => {
    return await axiosInstance.post('/script', formData);
}

const getScripts = async () => {
    const {data} = await axiosInstance.get('/script/all');
    return data;
}

const executScript = async (scriptId: string) => {
    const {data} = await axiosInstance.post(`/script/${scriptId}/start`);
    return data;
}

export function useExecuteScriptMutation() {
    return useMutation<AxiosResponse<ScriptResponse>, Error, string>(
        {
            mutationFn: executScript,
        });
}

export function useScriptsQuery() {
    return useQuery<ScriptDto[]>({queryKey: ['scripts'], queryFn: getScripts});
}

export function useAddScriptMutation() {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse<ScriptResponse>, Error, FormData>(
        {
            mutationFn: addScript,
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['scripts']}); // Ensure this matches your query key
            },
        });
}


