import { Block } from '../../../core';
import { LabelInput } from '../../label-input';
import styles from '../styles.module.css';

interface SearchFormProps {
    formState: {
        search: string;
    };
}

export default class SearchForm extends Block<SearchFormProps> {
    constructor() {
        super(
            'form',
            {
                formState: {
                    search: '',
                },
                className: styles.search,
                attrs: {
                    action: '#',
                    method: 'POST',
                },
                events: {
                    submit: (e) => {
                        e.preventDefault();
                        const el = e.target as HTMLFormElement;
                        console.log(this.props.formState);
                        el.reset();
                    },
                },
            },
            {
                SearchInput: new LabelInput({
                    'placeholder-center': true,
                    'theme-color': true,
                    placeholder: 'Поиск',
                    icon: 'search',
                    type: 'text',
                    name: 'search',
                    value: '',
                    required: true,
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                search: el.value,
                            },
                        });
                    },
                }) as Block,
            },
        );
    }

    render(): string {
        return '{{{SearchInput}}}';
    }
}
