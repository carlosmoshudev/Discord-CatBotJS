declare namespace Intl {
    type ListType = "conjunction" | "disjunction";

    interface ListFormatOptions {
        localeMatcher?: "lookup" | "best fit";
        type?: ListType;
        style?: "long" | "short" | "narrow";
    }

    interface ListFormatPart {
        type: "element" | "literal";
        value: string;
    }

    export class ListFormat {
        constructor(locales?: string | Array<string>, options?: ListFormatOptions);
        format(values: Array<any>): string;
        formatToParts(values: Array<any>): ListFormatPart[];
        supportedLocalesOf(
            locales: string | Array<string>,
            options?: ListFormatOptions,
        ): Array<string>;
    }
}