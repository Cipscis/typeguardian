export type TypeDef = {
    name: string;
    extendedInterface?: string;
    props: Array<[string, string]>;
    exported: boolean;
};
