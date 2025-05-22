export const VALIDATION_MESSAGES = {
    PASSWORD_NONEMPTY: 'Введите пароль',
    CONFIRM_PASSWORD_NONEMPTY: 'Повторите пароль',
    LOGIN_NONEMPTY: 'Введите логин',
    FORMAT_ERROR: 'Не соответствует формату',
    MAXLENGTH_ERROR: 'Максимальная длина 50 символов',

    EMAIL_NONEMPTY: 'Введите e-mail',
    EMAIL_ERROR: 'Введите корректный e-mail',
    FIRSTNAME_NONEMPTY: 'Введите имя',
    LASTNAME_NONEMPTY: 'Введите фамилию',
    CAPITAL_ERROR: 'Должно начинаться с кириллицы А-Я',
    ALPHABET_ERROR: 'Только кириллица А-Я, и "-"',
    CONFIRM_PASSWORD_ERROR: 'Пароли должны совпадать',

    PASSWORD_HELPER: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
    LOGIN_HELPER: 'Логин не менее 5 символов, только латиница',
} as const;
