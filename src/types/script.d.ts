export interface ScriptDto {
    id: string;
    name: string;
    description: string | null;
    language: string;
    status: string;
    entryFilePath: string | null;
    files: string[];
    creationDateTimeUtc: string;
    lastExecutedAt: string | null;
}