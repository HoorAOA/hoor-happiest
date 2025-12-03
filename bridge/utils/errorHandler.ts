
import axios from 'axios';

export const handleApiError = (errorStack: unknown): string => {
    if (axios.isAxiosError(errorStack)) {
        return errorStack.response?.data.message || 'An API error occurred';
    } else if (errorStack instanceof Error) {
        return errorStack.message;
    } else {
        return String(errorStack);
    }
};

export const logError = (context: string, error: unknown): void => {
    console.error(`[${context}]`, error);
};
