import { Block } from '@core';

// TODO: Сделать более надежную реализацию, cейчас зависит от порядка инпутов
export default function validateOnSubmit(
    validators: ((value: string) => string)[],
    formState: object,
    errors: object,
    children: Record<string, Block | Block[]>,
    callback: (name: string, error: string) => void,
): void {
    validators.forEach((validator, key) => {
        const value: string = Object.values(formState)[key];
        const input = Object.values(children)[key] as Block;
        const error: string = validator(value);
        const name = Object.keys(errors)[key];

        input.setProps({ ...input.props, error });

        callback(name, error);
    });
}
