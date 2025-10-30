interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    photo_url?: string;
}

interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
        user?: TelegramUser;
        query_id?: string;
        auth_date?: string;
        hash?: string;
    };
    ready(): void;
    expand(): void;
    close(): void;
    sendData(data: string): void;
    MainButton: {
        text: string;
        color?: string;
        textColor?: string;
        isVisible: boolean;
        isActive: boolean;
        setText(text: string): void;
        onClick(callback: () => void): void;
        show(): void;
        hide(): void;
    };
}

interface TelegramWindow extends Window {
    Telegram?: {
        WebApp?: TelegramWebApp;
    };
}

declare global {
    interface Window {
        Telegram?: {
            WebApp?: TelegramWebApp;
        };
    }
}

export {};
