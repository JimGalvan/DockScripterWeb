import React from 'react';
import {Box, Button, FileInput, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useAddScriptMutation} from '../../queries/scriptQueries';

const CreateScriptForm = () => {
    const form = useForm({
        initialValues: {
            name: '',
            description: '',
            entryFilePath: '',
            language: 'Python',
            dockerImage: 'python:3.8',
            files: null as File | null,
        },
    });

    const {mutate: addScript, isPending} = useAddScriptMutation();

    const handleSubmit = () => {
        const {name, description, entryFilePath, language, dockerImage, files} = form.values;

        // Construct a FormData payload
        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Description', description);
        formData.append('EntryFilePath', entryFilePath || 'main_script.py');
        formData.append('Language', language);
        formData.append('DockerImage', dockerImage);

        if (files) {
            formData.append('Files', files);
            const scriptFile = {
                Name: files.name,
                Content: '',
            };
            formData.append('Files', JSON.stringify(scriptFile));
        }

        addScript(formData as FormData);
    };

    return (
        <Box p="sm" mb="sm">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput label="Script Name" {...form.getInputProps('name')} required/>
                <TextInput label="Description" {...form.getInputProps('description')} />
                <TextInput label="Entry File Path" {...form.getInputProps('entryFilePath')} />
                <TextInput label="Language" {...form.getInputProps('language')} />
                <TextInput label="Docker Image" {...form.getInputProps('dockerImage')} />
                <FileInput
                    label="Upload File"
                    placeholder="Select a file"
                    value={form.values.files}
                    onChange={(files) => form.setFieldValue('files', files)}
                    required
                />
                <Box style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Saving...' : 'Save'}
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default CreateScriptForm;
