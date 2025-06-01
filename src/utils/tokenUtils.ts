import { jwtDecode } from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'accessToken';

export const saveAccessToken = (accessToken: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const getAccessToken = (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY);

export const removeTokens = (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
};

interface DecodedToken {
    exp: number;
    [key: string]: unknown;
}

export const getTokenExp = (token: string): number => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.exp ?? 0;
    } catch (error) {
        console.error('Ошибка декодирования токена:', error);
        return 0;
    }
};

export const isTokenExpired = (token: string): boolean => {
    const exp = getTokenExp(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return exp < currentTime;
};

export const isRecipeAuthor = (recipeAuthorId: string): boolean => {
    const token = getAccessToken();
    if (!token || isTokenExpired(token)) return false;
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.userId === recipeAuthorId;
    } catch (error) {
        console.error('Ошибка при проверке автора рецепта:', error);
        return false;
    }
};
