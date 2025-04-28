import { chakra } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const highlightText = (text: string, query: string): ReactNode => {
    if (!query || query.length < 3) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <chakra.span color='customLime.600' key={index}>
                {part}
            </chakra.span>
        ) : (
            <span key={index}>{part}</span>
        ),
    );
};
