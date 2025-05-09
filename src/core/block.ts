import Handlebars from 'handlebars';
import { Attributes, EventBus } from '@core';

type Children = Record<string, Block | Block[]>;

export default abstract class Block<
    TProps extends object = object,
    TAttrs extends object = object,
> {
    private static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    } as const;

    private element: HTMLElement = document.createElement('div');
    private readonly meta: {
        tagName: string;
        props: TProps & Attributes<TAttrs>;
    };
    private readonly eventBus: EventBus = new EventBus();
    readonly children: Children;
    readonly props: TProps & Attributes<TAttrs>;
    protected readonly id = crypto.randomUUID();

    protected constructor(
        tagName: string = 'div',
        props: TProps & Attributes<TAttrs>,
        children: Children = {},
    ) {
        this.children = children;

        this.meta = {
            tagName,
            props: { className: '', attrs: {}, events: {}, ...props },
        };

        this.props = this.makePropsProxy(props);
        this.registerEvents();
        this.eventBus.emit(Block.EVENTS.INIT);
    }

    private registerEvents(): void {
        this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private createResources(): void {
        const { tagName, props } = this.meta;
        this.element = this.createDocumentElement(tagName);

        if (props.className) {
            const classes: string[] = props.className
                .replace(/\n/g, '')
                .split(' ')
                .filter((cn) => cn);

            this.element.classList.add(...classes);
        }

        if (props.attrs) {
            Object.entries(props.attrs).forEach(([attrName, attrValue]) => {
                if (typeof attrValue === 'string') {
                    this.element.setAttribute(attrName, attrValue);
                }
            });
        }
    }

    init(): void {
        this.createResources();
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
    }

    componentDidMount(): void {}

    dispatchComponentDidMount(): void {
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: TProps, newProps: TProps): void {
        const response: boolean = this.componentDidUpdate(oldProps, newProps);

        if (!response) {
            return;
        }

        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidUpdate(_oldProps: TProps, _newProps: TProps): boolean {
        return true;
    }

    componentWillUnmount(): void {}

    setProps = (nextProps: TProps): void => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    private compile(): DocumentFragment {
        const propsAndStubs = { ...this.props } as Record<string, unknown>;

        Object.entries(this.children).forEach(([key, child]): void => {
            if (Array.isArray(child)) {
                propsAndStubs[key] = child.map((component): string => {
                    return `<div data-id="${component.id}"></div>`;
                });
            } else {
                propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
            }
        });

        const fragment: HTMLTemplateElement = this.createDocumentElement(
            'template',
        ) as HTMLTemplateElement;
        const template = Handlebars.compile(this.render());

        fragment.innerHTML = template(propsAndStubs);

        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach((component) => {
                    const stub: Element | null = fragment.content.querySelector(
                        `[data-id="${component.id}"]`,
                    );

                    stub?.replaceWith(component.getContent());
                    component.dispatchComponentDidMount();
                });
            } else {
                const stub: Element | null = fragment.content.querySelector(
                    `[data-id="${child.id}"]`,
                );

                stub?.replaceWith(child.getContent());
                child.dispatchComponentDidMount();
            }
        });

        return fragment.content;
    }

    private _render(): void {
        this.removeEvents();

        const block: DocumentFragment = this.compile();

        if (this.element.children.length === 0) {
            this.element.appendChild(block);
        } else {
            this.element.replaceChildren(block);
        }

        this.addEvents();
    }

    abstract render(): string;

    getContent(): HTMLElement {
        return this.element;
    }

    private makePropsProxy(props: TProps): TProps {
        return new Proxy<TProps>(props, {
            get: (target: TProps, prop: PropertyKey) => {
                const key = prop as keyof TProps;
                const value: TProps[keyof TProps] = target[key];

                return typeof value === 'function' ? value.bind(target) : value;
            },

            set: (target: TProps, prop: PropertyKey, value): boolean => {
                const key = prop as keyof TProps;
                const oldTarget: TProps = { ...target };

                target[key] = value;
                this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);

                return true;
            },

            deleteProperty: (): never => {
                throw new Error('No access to delete props');
            },
        });
    }

    private addEvents(): void {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this.element.addEventListener(eventName, events[eventName]);
        });
    }

    private removeEvents(): void {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this.element.removeEventListener(eventName, events[eventName]);
        });
    }

    private createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    show(): void {
        this.getContent().style.display = 'block';
    }

    hide(): void {
        this.getContent().style.display = 'none';
    }
}
