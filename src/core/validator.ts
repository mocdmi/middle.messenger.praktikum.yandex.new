export default class Validator {
    private static error: string = '';
    private static value: string;

    static validate(value: string) {
        this.value = value;
        this.error = '';
        return this;
    }

    private static isMatch(regexp: RegExp): boolean {
        return regexp.test(this.value);
    }

    static isName(): string {
        if (!this.isMatch(/^[A-ZА-ЯЁ][a-zа-яё-]+$/)) {
            this.error =
                'Должно быть на латинице или кириллице, первая буква должна быть заглавной, без пробелов и без цифр, без спецсимволов (допустим только дефис).';
        }

        return this.error;
    }

    static isEmail(): string {
        if (!this.isMatch(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/)) {
            this.error = 'Не верный формат электронной почты.';
        }

        return this.error;
    }

    static isPhone(): string {
        if (!this.isMatch(/^\+?[0-9]{10,15}$/)) {
            this.error = 'Должно состоять из цифр, может начинается с плюса. 10-15 символов.';
        }

        return this.error;
    }

    static isLogin(): string {
        if (!this.isMatch(/^(?!\d+$)[A-Za-z0-9_-]{3,20}$/)) {
            this.error =
                'Должно быть на латинице, может включать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание). 3-20 символов.';
        }

        return this.error;
    }

    static isPassword(): string {
        if (!this.isMatch(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/)) {
            this.error =
                'Должно быть на латинице и включать хотя бы одну заглавную букву и цифру. 8-40 символов.';
        }

        return this.error;
    }

    static isRequired(): string {
        if (this.value.length === 0) {
            this.error = 'Поле обязательно для заполнения';
        }

        return this.error;
    }
}
