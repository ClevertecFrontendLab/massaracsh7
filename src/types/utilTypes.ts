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
    onPrimaryAction?: () => void;
    primaryActionText?: string;
    footerNote?: string;
}
