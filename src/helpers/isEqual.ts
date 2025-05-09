type PlainObject<T = unknown> = {
    [k in string]: T;
};

type ArrayOrObject = PlainObject | unknown[];

function isPlainObject(value: unknown): value is PlainObject {
    return (
        typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]'
    );
}

function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is PlainObject | unknown[] {
    return isPlainObject(value) || isArray(value);
}

export default function isEqual<T extends object>(
    lhs: T | ArrayOrObject,
    rhs: T | ArrayOrObject,
): boolean {
    if (isArray(lhs) && isArray(rhs)) {
        if (lhs.length !== rhs.length) {
            return false;
        }

        return lhs.every((value, index) =>
            isEqual(value as ArrayOrObject, rhs[index] as ArrayOrObject),
        );
    }

    if (isPlainObject(lhs) && isPlainObject(rhs)) {
        const lhsKeys = Object.keys(lhs);
        const rhsKeys = Object.keys(rhs);

        if (lhsKeys.length !== rhsKeys.length) {
            return false;
        }

        return lhsKeys.every((key) => {
            const rightValue = rhs[key];
            const leftValue = lhs[key];

            if (isArrayOrObject(leftValue) && isArrayOrObject(rightValue)) {
                return isEqual(leftValue, rightValue);
            }

            return leftValue === rightValue;
        });
    }

    return lhs === rhs;
}
