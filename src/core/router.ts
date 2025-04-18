import { Route, BlockConstructor } from '../core';

export default class Router {
    private static instance: Router;
    private routes: Route[] = [];
    private currentRoute: Route | null = null;
    private readonly rootQuery: string;

    constructor(rootQuery: string) {
        if (!Router.instance) {
            Router.instance = this;
        }

        this.rootQuery = rootQuery;
    }

    start() {
        window.onpopstate = (event) => {
            try {
                const path = (event.currentTarget as Window)?.location.pathname;
                this.onRoute(path);
            } catch (error) {
                console.error(error);
            }
        };

        this.onRoute(window.location.pathname);
    }

    private onRoute(path: string) {
        const route = this.getBlockByPath(path);

        if (!route) {
            throw new Error(`Component not found for path: ${path}`);
        }

        if (this.currentRoute && this.currentRoute !== route) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;
        route.render();
    }

    use(path: string, block: unknown, props?: object): Router {
        const route = new Route(path, block as BlockConstructor, props, this.rootQuery);
        this.routes.push(route);
        return this;
    }

    back() {
        history.back();
    }

    next() {
        history.back();
    }

    go(path: string) {
        try {
            history.pushState({}, '', path);
            this.onRoute(path);
        } catch (error) {
            console.error(error);
        }
    }

    private getBlockByPath(path: string) {
        return this.routes.find((route) => route.match(path));
    }
}
