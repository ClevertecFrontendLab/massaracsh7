import { setAppAlert } from '~/store/app-slice';
import { AppDispatch } from '~/store/hooks';

export type HandleBlogPageProps = {
    err: unknown;
    title?: string;
    message?: string;
    dispatch: AppDispatch;
    sourse?: 'global' | 'auth';
};

export const handleBlogPageError = ({
    err,
    title = 'Ошибка сервера',
    message = 'Попробуйте немного позже.',
    sourse = 'global',
    dispatch,
}: HandleBlogPageProps) => {
    if (typeof err === 'object' && err !== null && 'status' in err) {
        dispatch(
            setAppAlert({
                type: 'error',
                title,
                message,
                sourse,
            }),
        );
    } else {
        console.error('Unexpected error:', err);
    }
};
