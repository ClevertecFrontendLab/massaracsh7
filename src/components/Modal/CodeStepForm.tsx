import { FormControl, HStack, PinInput, PinInputField, VStack } from '@chakra-ui/react';

import { VERIFICATION_CODE_INPUT } from '~/constants/test-ids';

interface CodeStepFormProps {
    code: string;
    setCode: (val: string) => void;
    titleError?: string;
    submitCode: (val: string) => Promise<void>;
}

export const CodeStepForm = ({ code, setCode, titleError, submitCode }: CodeStepFormProps) => {
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitCode(code);
    };

    return (
        <form onSubmit={onSubmit}>
            <FormControl isInvalid={!!titleError}>
                <VStack>
                    <HStack w='100%' justifyContent='center'>
                        <PinInput otp value={code} onChange={setCode} onComplete={submitCode}>
                            {[...Array(6)].map((_, i) => (
                                <PinInputField
                                    key={i}
                                    data-test-id={`${VERIFICATION_CODE_INPUT}-${i + 1}`}
                                    borderColor={titleError ? 'red.500' : undefined}
                                    _placeholder={{ color: 'customLime.800' }}
                                    color='customLime.800'
                                />
                            ))}
                        </PinInput>
                    </HStack>
                </VStack>
            </FormControl>
        </form>
    );
};
