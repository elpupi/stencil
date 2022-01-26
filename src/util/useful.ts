export type BooleanAttribute = boolean | 'true' | 'false' | '';

export const toBoolean = (v: BooleanAttribute) => {
    return v === '' ? true :
        typeof v === 'boolean' ? v :
            v === 'true' ? true :
                v === 'false' ? false :
                    false;
};

export const toObject = <T = unknown>(o: string | T): T => {
    return o ? typeof o === 'string' ? JSON.parse(o) : o : o;
};
