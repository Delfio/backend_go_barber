interface ICacheProvider {
    save(key: string, value: string): Promise<void>;
    invalidade(key: string): Promise<void>;
    invalidadePrefix(prefix: string): Promise<void>;
    recover<T>(key: string): Promise<T | null>;
}

export default ICacheProvider;
