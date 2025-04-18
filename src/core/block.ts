import Handlebars from 'handlebars';
import { Attributes, EventBus } from '../core';

type Children = Record<string, Block | Block[]>;

export default abstract class Block<T extends object = object, P extends object = object> {
    private static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    } as const;

    private element: HTMLElement = document.createElement('div');
    private readonly meta: {
        tagName: string;
        props: T & Attributes<P>;
    };
    private readonly eventBus: EventBus = new EventBus();
    protected readonly children: Children;
    readonly props: T & Attributes<P>;
    protected readonly id = crypto.randomUUID();

    protected constructor(
        tagName: string = 'div',
        props: T & Attributes<P>,
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
                this.element.setAttribute(attrName, attrValue);
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

    private _componentDidUpdate(oldProps: T, newProps: T): void {
        const response: boolean = this.componentDidUpdate(oldProps, newProps);

        if (!response) {
            return;
        }

        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidUpdate(oldProps: T, newProps: T): boolean {
        void oldProps;
        void newProps;
        return true;
    }

    setProps = (nextProps: T): void => {
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
                });
            } else {
                const stub: Element | null = fragment.content.querySelector(
                    `[data-id="${child.id}"]`,
                );

                stub?.replaceWith(child.getContent());
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

    private makePropsProxy(props: T): T {
        return new Proxy<T>(props, {
            get: (target: T, prop: PropertyKey) => {
                const key = prop as keyof T;
                const value: T[keyof T] = target[key];

                return typeof value === 'function' ? value.bind(target) : value;
            },

            set: (target: T, prop: PropertyKey, value): boolean => {
                const key = prop as keyof T;
                const oldTarget: T = { ...target };

                target[key] = value;
                this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);

                return true;
            },

            deleteProperty: (): never => {
                throw new Error('Нет доступа');
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
