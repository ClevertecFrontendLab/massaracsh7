type FocusStylesParams = {
    hasError: boolean;
    errorColor?: string;
    normalColor?: string;
};

export const getFocusStyles = ({
    hasError,
    errorColor = 'red.500',
    normalColor = 'customLime.150',
}: FocusStylesParams) => ({
    borderColor: hasError ? errorColor : normalColor,
    boxShadow: hasError ? `0 0 0 1px ${errorColor}` : `0 0 0 1px ${normalColor}`,
});
