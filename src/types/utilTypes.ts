export type FilterData = {
    categories: string[];
    authors: string[];
    meatTypes: string[];
    sideTypes: string[];
    excludeAllergens: boolean;
};

export type SelectOption = {
    value: string;
    label: string;
};

export type InputType = 'text' | 'code';

export type ModalPayload = {
    title: string;
    description: string;
    imageSrc?: string;
    onPrimaryAction?: () => Promise<void>;
    primaryActionText?: string;
    footerNote?: string;
    dataId?: string;
};

export type AlertType = 'error' | 'success';
export type AlertSource = 'global' | 'auth';

export type AlertPayload = {
    type: AlertType;
    message?: string;
    title: string;
    sourse?: AlertSource;
};

export const bgMap: Record<AlertType, string> = {
    error: '#E53E3E',
    success: '#38A169',
};
