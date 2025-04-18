export default function isErrorsEmpty(errors: Record<string, string>): boolean {
    return Object.values(errors).every((arr) => arr.length === 0);
}
