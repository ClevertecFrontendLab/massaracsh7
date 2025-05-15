export interface FilterData {
    categories: string[];
    authors: string[];
    meatTypes: string[];
    sideTypes: string[];
    excludeAllergens: boolean;
}

export type SelectOption = {
    value: string;
    label: string;
};

export type InputType = 'text' | 'code';

export interface ModalPayload {
    title: string;
    description: string;
    imageSrc?: string;
    onPrimaryAction?: () => Promise<void>;
    primaryActionText?: string;
    footerNote?: string;
    dataId?: string;
}

type AlertType = 'error' | 'success' | 'warning' | 'info';

export interface AlertPayload {
    type: AlertType;
    message?: string;
    title: string;
}
