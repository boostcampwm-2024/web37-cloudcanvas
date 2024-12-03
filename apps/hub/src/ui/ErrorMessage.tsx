import { Button } from './Button';

interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
    <div className="text-center text-red-500 py-10">
        <p className="mb-10">Error: {message}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
    </div>
);
