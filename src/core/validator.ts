export default class Validator {
    private static errors: string[];
    private static value: string;

    static validate(value: string) {
        this.errors = [];
        this.value = value;
        return this;
    }

    private static testMatch(regexp: RegExp): boolean {
        return regexp.test(this.value);
    }

    static isMatch(regexp: RegExp, errorMessage?: string) {
        if (!this.testMatch(regexp)) {
            this.errors.push(errorMessage || 'Вы ввели не допустимые символы.');
        }

        return this;
    }

    static isLength(min: number, max?: number) {
        if (this.value.length < min || (max && this.value.length > max)) {
            this.errors.push(`Поле должно содержать от ${min} до ${max} символов.`);
        }

        return this;
    }

    static isName() {
        if (!this.testMatch(/^[A-ZА-Я][a-zа-я-]*$/)) {
            this.errors.push(
                `Должно быть на латинице или кириллице, первая буква должна быть заглавной, без пробелов
                и без цифр, без спецсимволов (допустим только дефис).`,
            );
        }

        return this;
    }

    static isEmail() {
        if (!this.testMatch(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/)) {
            this.errors.push('Не верный формат электронной почты.');
        }

        return this;
    }

    static isPhone() {
        if (!this.testMatch(/^\+?[0-9]*$/)) {
            this.errors.push('Должно состоять из цифр, может начинается с плюса.');
        }

        return this;
    }

    static isLogin() {
        if (!this.testMatch(/^[a-zA-Z0-9-_]*$/)) {
            this.errors.push(
                `Должно быть на латинице и включать цифры, без пробелов, без спецсимволов (допустимы дефис и
                нижнее подчёркивание).`,
            );
        }

        return this;
    }

    static isPassword() {
        if (!this.testMatch(/^(?=.*\d)[a-zA-Z0-9]*$/)) {
            this.errors.push(
                'Должен быть на латинице и включать хотя бы одна заглавную букву и цифру.',
            );
        }

        return this;
    }

    static isRequired() {
        if (this.value.length === 0) {
            this.errors.push('Поле обязательно для заполнения');
        }

        return this;
    }

    static exec() {
        return this.errors;
    }
}
