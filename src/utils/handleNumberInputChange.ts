export const handleNumberInputChange = (
    valueString: string,
    valueAsNumber: number,
    onChange: (value: string | number) => void,
) => {
    if (valueString === '-' || valueString === '') {
        onChange(valueString);
    } else if (!isNaN(valueAsNumber)) {
        onChange(valueAsNumber);
    }
};
