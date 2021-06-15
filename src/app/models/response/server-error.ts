export interface ErrorItem {
    key: string;
    message: string;
}

export interface ServerError {
    readonly errors: ErrorItem[];
    readonly code: string;
    readonly stacktrace: string[];
}
