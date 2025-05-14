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

export interface ModalPayload {
    title: string;
    description: string;
    imageSrc?: string;
    onPrimaryAction?: (email?: string | undefined) => Promise<void>;
    primaryActionText?: string;
    footerNote?: string;
    withInput?: boolean;
}

type AlertType = 'error' | 'success' | 'warning' | 'info';

export interface AlertPayload {
    type: AlertType;
    message?: string;
    title: string;
}
