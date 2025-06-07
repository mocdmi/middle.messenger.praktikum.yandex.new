import Block from './block';

interface ComponentProps {
    text: string;
}

class Component extends Block<ComponentProps> {
    constructor(props: ComponentProps) {
        super('div', {
            text: props.text,
        });
    }

    // language=handlebars
    render(): string {
        return '{{text}}';
    }
}

class ChildComponent extends Block {
    constructor() {
        super('div', {});
    }

    // language=handlebars
    render(): string {
        return 'Child';
    }
}

class ParentComponent extends Block {
    constructor() {
        super(
            'div',
            {},
            {
                Child: new ChildComponent() as Block,
            },
        );
    }

    // language=handlebars
    render(): string {
        return `{{{Child}}}`;
    }
}

describe('Block', () => {
    let component: Component;
    let parentComponent: ParentComponent;
    let childComponent: ChildComponent;

    beforeEach(() => {
        component = new Component({ text: 'Hello' });
        parentComponent = new ParentComponent();
        childComponent = new ChildComponent();
    });

    test('should render correct HTML content', () => {
        const content = component.getContent();

        expect(content).toBeInstanceOf(HTMLElement);
        expect(content.textContent).toBe('Hello');
    });

    test('componentDidUpdate is called and content updates on setProps', () => {
        const spy = jest.spyOn(component, 'componentDidUpdate');

        component.setProps({ text: 'World' });

        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining({ text: 'Hello' }),
            expect.objectContaining({ text: 'World' }),
        );

        expect(component.getContent().textContent).toBe('World');

        spy.mockRestore();
    });

    test('componentDidUpdate should be called with same props when setting identical values', () => {
        const spy = jest.spyOn(component, 'componentDidUpdate');

        component.setProps({ text: 'Hello' });

        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining({ text: 'Hello' }),
            expect.objectContaining({ text: 'Hello' }),
        );

        expect(component.getContent().textContent).toBe('Hello');

        spy.mockRestore();
    });

    test('should call componentDidMount when component is mounted', () => {
        const emitSpy = jest.spyOn(component.getEventBus(), 'emit');

        component.dispatchComponentDidMount();

        expect(emitSpy).toHaveBeenCalledWith('flow:component-did-mount');
    });

    test('should set display block style when show() is called', () => {
        component.hide();
        component.show();

        const content = component.getContent();
        expect(content.style.display).toBe('block');
    });

    test('should set hide block style when hide() is called', () => {
        component.hide();

        const content = component.getContent();
        expect(content.style.display).toBe('none');
    });

    test('should render correct children', () => {
        const content = parentComponent.getContent();

        expect(content).toBeInstanceOf(HTMLElement);
        expect(content.textContent).toBe('Child');
    });

    test('should call componentDidMount when children is mounted', () => {
        const emitSpy = jest.spyOn(childComponent.getEventBus(), 'emit');

        childComponent.dispatchComponentDidMount();

        expect(emitSpy).toHaveBeenCalledWith('flow:component-did-mount');
    });

    test('should add event listeners on render', () => {
        const mockClick = jest.fn();

        class ClickableComponent extends Block {
            constructor() {
                super('div', {
                    events: {
                        click: mockClick,
                    },
                });
            }

            // language=handlebars
            render(): string {
                return 'Clickable';
            }
        }

        const clickableComponent = new ClickableComponent();
        const content = clickableComponent.getContent();

        content.dispatchEvent(new Event('click'));
        expect(mockClick).toHaveBeenCalled();

        mockClick.mockClear();

        clickableComponent.setProps({});

        content.dispatchEvent(new MouseEvent('click'));
        expect(mockClick).toHaveBeenCalled();
    });
});
