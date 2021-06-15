export interface AuthenticatedSessionStorage<T> {
    store(session: T): void;
    destroy(): void;
}
