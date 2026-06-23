export class AppError extends Error {
    constructor(public statuscode: number, message: string) {
        super(message);
        this.name = "AppError"
    }
}