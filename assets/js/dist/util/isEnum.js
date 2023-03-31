/**
 * A utility function for creating custom typeguards for enums.
 *
 * Works with enums created using TypeScript's `enum` keyword, and
 * with enums created using JavaScript objects.
 *
 * If using the `enum` keyword to create a numeric enum, be aware that
 * TypeScript creates reverse lookups in these enums, which means it
 * will include your key strings as values of the enum.
 *
 * {@link https://www.typescriptlang.org/play?#code/KYOwrgtgBAsgngUXNA3gKCpqBpBBNKAXigEYAaDLAZQQGEB5AOQBEB9XA4gJgoF800AekFQ8AezBQIASwDmACwAuUYAA8ADsADGyxfOkBnKIrFQARsCgADANrkoXALpW0WsSAPLQkAGoBDABswYCNiejMAK21FADoAN0DggwAKeCRIAEoAbgFhKAAhMGVpRQByIz8dMECAuGsbUo5SsihSmgYWdnxm0hanFzcPMQDgGICxWWTvCH8gkOzckQAVfSNDc20-MANgFoAzMQAnKE9D6RBZFWQjA00taT3pLRq4FqW4TSotM-VlQINTDtFEYwOooIdgHFgIcdlBxmIANaggwxITLVZQADuEgCABM4cBlHAJFBcaY9OdZEYAtIEZZxrJZJSoBJlFY0sgbNNZsEAGKHMQQXlgEA6aTuACCh1kkFAimcxjEaKgskJUD8ICukCgCTm5SgdLqfgqJ0UZwuLTMRSgJQJflxRgpjox6hKexq6qMmOAAQCqOVAFUDMzTszphU4mJpA7jC63TUYlAqKYySEoNtmQApPwJL4-ZRiSLRNYeRTAe0svaxyxWaZWA3AODYw641FAA An explanation of this pitfall}
 *
 * @example
 * ```typescript
 * const MyEnum = {
 *     KEY: 'value',
 *     SECOND_KEY: 'other value',
 * } as const;
 * type MyEnum = EnumTypeOf<typeof MyEnum>;
 *
 * const isMyEnum = isEnum(MyEnum);
 *
 * // It can be used to check if a value exists in your enum
 * isMyEnum(MyEnum.KEY); // true
 * isMyEnum('another value'); // false
 *
 * // It can also be used for type narrowing
 * const myString: string = MyEnum.KEY; // typed as `string`
 * if (isMyEnum(myString)) {
 *     myString; // typed as `MyEnum`
 * }
 * ```
 */
export function isEnum(enumToCheck) {
    const values = Object.values(enumToCheck);
    return function isEnumToCheck(value) {
        return values.includes(value);
    };
}
//# sourceMappingURL=isEnum.js.map