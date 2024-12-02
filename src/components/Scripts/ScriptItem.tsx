import React from 'react';
import {Badge, Button, Flex, Group, Text} from '@mantine/core';
import {ScriptDto} from '../../types/script';

interface ScriptItemProps {
    script: ScriptDto;
    onRun: (script: ScriptDto) => void;
}

const ScriptItem: React.FC<ScriptItemProps> = ({script, onRun}) => {
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
                <Button variant="outline" size="xs" onClick={() => onRun(script)}>
                    Run
                </Button>
            </Group>
        </Flex>
    );
};

export default ScriptItem;