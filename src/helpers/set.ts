type Indexed = Record<string, unknown>;

function isObject(value: unknown): value is Indexed {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const key in rhs) {
        if (!Object.prototype.hasOwnProperty.call(rhs, key)) continue;

        try {
            if (isObject(rhs[key])) {
                rhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
            } else {
                lhs[key] = rhs[key];
            }
        } catch {
            lhs[key] = rhs[key];
        }
    }

    return lhs;
}

export default function set(object: object, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || Array.isArray(object) || object === null) {
        return object;
    }

    const result = path.split('.').reduceRight<Indexed>(
        (acc, key) => ({
            [key]: acc,
        }),
        value as Indexed,
    );

    return merge(object as Indexed, result);
}
