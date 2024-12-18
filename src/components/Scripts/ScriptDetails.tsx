import React from 'react';
import {Badge, Button, Card, Container, Group, Text, Title} from '@mantine/core';

interface ScriptDetailsProps {
    script: {
        id: string;
        name: string;
        language: string;
        status: string;
        logs: string[];
    };
}

const ScriptDetails: React.FC<ScriptDetailsProps> = ({script}) => {
    return (
        <Container>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group position="apart" style={{ marginBottom: 5 }}>
                    <Title order={2}>{script.name}</Title>
                    <Badge color="blue" variant="light">
                        {script.language}
                    </Badge>
                </Group>
                <Text size="sm" color="dimmed">
                    Status: {script.status}
                </Text>
                <Button variant="outline" size="sm" style={{ marginTop: 10 }}>
                    Run Script
                </Button>
            </Card>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ marginTop: 20 }}>
                <Title order={3}>Execution Logs</Title>
                <div style={{ marginTop: 10 }}>
                    {script.logs.length > 0 ? (
                        script.logs.map((log, index) => (
                            <Text key={index} size="sm" color="dimmed">
                                {log}
                            </Text>
                        ))
                    ) : (
                        <Text size="sm" color="dimmed">
                            No logs available.
                        </Text>
                    )}
                </div>
            </Card>
        </Container>
    );
};

export default ScriptDetails;