import React from 'react';
import {Badge, Button, Flex, Group, Text} from '@mantine/core';
import {ScriptDto} from '../../types/script';
import {useExecuteScriptMutation} from "../../queries/scriptQueries";

interface ScriptItemProps {
    script: ScriptDto;
}

const ScriptItem: React.FC<ScriptItemProps> = ({script}) => {

    const {mutate: executeScript, isPending} = useExecuteScriptMutation();
    const scriptId = script.id;

    return (
        <Flex
            bg="rgba(255, 255, 255, 1)"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid rgba(240, 240, 240, 1)'
            }}
        >
            <Group>
                <Text>{script.name}</Text>
                <Badge color="blue" variant="light">
                    {script.language}
                </Badge>
            </Group>
            <Group>
                <Text size="xs" color="dimmed">
                    Status: {script.status}
                </Text>
                <Button loading={isPending} variant="outline" size="xs" onClick={() => executeScript(scriptId)}>
                    Run
                </Button>
            </Group>
        </Flex>
    );
};

export default ScriptItem;