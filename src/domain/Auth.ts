export default interface AuthStrategy {
    auth(token: string): Promise<string>;
}