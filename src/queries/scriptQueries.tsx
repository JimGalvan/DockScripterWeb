import {useMutation, useQueryClient} from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';
import {AxiosResponse} from 'axios';

interface ScriptResponse {
    id: string;
    name: string;
    description: string;
}

const addScript = async (formData: FormData): Promise<AxiosResponse<ScriptResponse>> => {
    return await axiosInstance.post('/script', formData);
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
