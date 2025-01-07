import { z } from 'zod';

export class ValidationError extends Error {
    constructor(
        public readonly resource: string,
        public readonly field: string,
        message: string,
    ) {
        super(`${resource} validation failed at ${field}: ${message}`);
        this.name = 'ValidationError';
    }
}

export class ResourceValidator {
    private static schemaMap = new Map<string, z.ZodSchema>();

    static registerSchema(type: string, schema: z.ZodSchema): void {
        this.schemaMap.set(type.toLowerCase(), schema);
    }

    static validate(type: string, data: unknown): void {
        const schema = this.schemaMap.get(type.toLowerCase());
        if (!schema) {
            throw new Error(`존재하지 않은 리소스 타입입니다`);
        }

        try {
            schema.parse(data);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const firstError = error.errors[0];
                throw new ValidationError(
                    type,
                    firstError.path.join('.'),
                    firstError.message,
                );
            }
            throw error;
        }
    }
}
