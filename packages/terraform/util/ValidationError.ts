export class ValidationError extends Error {
    constructor(
        public readonly resource: string,
        public readonly field: string,
        message: string,
    ) {
        super(`${resource} 에서 ${field}속성이 필요합니다`);
        this.name = `ValidationError`;
        this.message = message;
    }
}
