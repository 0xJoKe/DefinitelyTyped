// Type definitions for clean-css v4.2.1
// Project: https://github.com/jakubpawlowicz/clean-css
// Definitions by: Andrew Potter <https://github.com/GolaWaya>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />
import { RequestOptions as HttpsRequestOptions } from "https";
import { RequestOptions as HttpRequestOptions } from "http";

declare namespace CleanCSS {
    /**
     * Options passed when initializing a new instance of CleanCSS
     */
    interface Options {
        /**
         * Controls compatibility mode used; defaults to ie10+ using `'*'`
         */
        compatibility?: "*" | "ie9" | "ie8" | "ie7" | CompatibilityOptions;

        /**
         * Controls a function for handling remote requests; Defaults to the build in `loadRemoteResource` function
         */
        fetch?: (uri: string, inlineRequest: HttpRequestOptions | HttpsRequestOptions, inlineTimeout: number, callback: FetchCallback) => void;

        /**
         * Controls output CSS formatting; defaults to `false`
         */
        format?: "beautify" | "keep-breaks" | Format | false;

        /**
         * inline option whitelists which @import rules will be processed.  Defaults to `'local'`
         * Accepts the following values: 
         *  'local': enables local inlining; 
         *  'remote': enables remote inlining; 
         *  'none': disables all inlining; 
         *  'all': enables all inlining, same as ['local', 'remote']; 
         *  '[uri]': enables remote inlining from the specified uri; 
         *  '![url]': disables remote inlining from the specified uri; 
         */
        inline?: string[] | false;

        /**
         * Controls extra options for inlining remote @import rules
         */
        inlineRequest?: HttpRequestOptions | HttpsRequestOptions;

        /**
         * Controls number of milliseconds after which inlining a remote @import fails; defaults to `5000`;
         */
        inlineTimeout?: number;

        /**
         * Controls optimization level used; defaults to `1`
         */
        level?: 0 | 1 | 2 | optimizationsOptions;

        /**
         * Controls URL rebasing; defaults to `true`;
         */
        rebase?: boolean;

        /**
         * controls a directory to which all URLs are rebased, most likely the directory under which the output file
         * will live; defaults to the current directory;
         */
        rebaseTo?: string;

        /**
         * If you prefer clean-css to return a Promise object then you need to explicitely ask for it; defaults to `false`
         */
        returnPromise?: boolean;

        /**
         *  Controls whether an output source map is built; defaults to `false`
         */
        sourceMap?: boolean;

        /**
         *  Controls embedding sources inside a source map's `sourcesContent` field; defaults to `false`
         */
        sourceMapInlineSources?: boolean;
    }

    /**
     * Output returned when calling minify functions
     */
    interface Output {
        /**
         * Optimized output CSS as a string
         */
        styles: string;

        /**
         * Output source map if requested with `sourceMap` option
         */
        sourceMap: string;

        /**
         * A list of errors raised
         */
        errors: Array<string>;

        /**
         * A list of warnings raised
         */
        warnings: Array<string>;

        /**
         * Contains statistics on the minify process
         */
        stats: {
            /**
             * Original content size after import inlining
             */
            originalSize: number;

            /**
             * Optimized content size
             */
            minifiedSize: number;

            /**
             * Time spent on optimizations in milliseconds
             */
            timeSpent: number;

            /**
             * `(originalSize - minifiedSize) / originalSize`, e.g. 0.25 if size is reduced from 100 bytes to 75 bytes
             */
            efficiency: number;
        };
    }

    /**
     * Fine grained configuration for compatibility option
     */
    interface CompatibilityOptions {
        /**
         * A hash of compatibility options related to color
         */
        colors?: {
            /**
             * Controls `rgba()` / `hsla()` color support; defaults to `true`
             */
            opacity?: boolean;
        },
        /**
         * A hash of properties that can be set with compatibility
         */
        properties?: {
            /**
             * Controls background-clip merging into shorthand; defaults to `true`
             */
            backgroundClipMerging?: boolean;

            /**
             * Controls background-origin merging into shorthand; defaults to `true`
             */
            backgroundOriginMerging?: boolean;

            /**
             * Controls background-size merging into shorthand; defaults to `true`
             */
            backgroundSizeMerging?: boolean;

            /**
             * controls color optimizations; defaults to `true`
             */
            colors?: boolean, // 

            /**
             * Controls keeping IE bang hack; defaults to `false`
             */
            ieBangHack?: boolean;

            /**
             * Controls keeping IE `filter` / `-ms-filter`; defaults to `false`
             */
            ieFilters?: boolean;

            /**
             * Controls keeping IE prefix hack; defaults to `false`
             */
            iePrefixHack?: boolean;

            /**
             * Controls keeping IE suffix hack; defaults to `false`
             */
            ieSuffixHack?: boolean;

            /**
             * Controls property merging based on understandability; defaults to `true`
             */
            merging?: boolean;

            /**
             * Controls shortening pixel units into `pc`, `pt`, or `in` units; defaults to `false`
             */
            shorterLengthUnits?: false;

            /**
             * Controls keeping space after closing brace - `url() no-repeat` into `url()no-repeat`; defaults to `true`
             */
            spaceAfterClosingBrace?: true;

            /**
             * Controls keeping quoting inside `url()`; defaults to `false`
             */
            urlQuotes?: boolean;

            /**
             * Controls removal of units `0` value; defaults to `true`
             */
            zeroUnits?: boolean;
        },
        /**
         * A hash of options related to compatibility of selectors
         */
        selectors?: {
            /**
             * Controls extra space before `nav` element; defaults to `false`
             */
            adjacentSpace?: boolean;

            /**
             * Controls removal of IE7 selector hacks, e.g. `*+html...`; defaults to `true`
             */
            ie7Hack?: boolean;

            /**
             * Controls a whitelist of mergeable pseudo classes; defaults to `[':active', ...]`
             */
            mergeablePseudoClasses?: string[];

            /**
             * Controls a whitelist of mergeable pseudo elements; defaults to `['::after', ...]`
             */
            mergeablePseudoElements: string[];

            /**
             * Controls maximum number of selectors in a single rule (since 4.1.0); defaults to `8191`
             */
            mergeLimit: number;

            /**
             * Controls merging of rules with multiple pseudo classes / elements (since 4.1.0); defaults to `true`
             */
            multiplePseudoMerging: boolean;
        },
        /**
         * A hash of options related to comparability of supported units
         */
        units?: {
            /**
             * Controls treating `ch` as a supported unit; defaults to `true`
             */
            ch?: boolean;

            /**
             * Controls treating `in` as a supported unit; defaults to `true`
             */
            in?: boolean;

            /**
             * Controls treating `pc` as a supported unit; defaults to `true`
             */
            pc?: boolean;

            /**
             * Controls treating `pt` as a supported unit; defaults to `true`
             */
            pt?: boolean;

            /**
             * Controls treating `rem` as a supported unit; defaults to `true`
             */
            rem?: boolean;

            /**
             * Controls treating `vh` as a supported unit; defaults to `true`
             */
            vh?: boolean;

            /**
             * Controls treating `vm` as a supported unit; defaults to `true`
             */
            vm?: boolean;

            /**
             * Controls treating `vmax` as a supported unit; defaults to `true`
             */
            vmax?: boolean;

            /**
             * Controls treating `vmin` as a supported unit; defaults to `true`
             */
            vmin?: boolean;
        }
    }

    /**
     * Fine grained options for configuring the CSS formatting
     */
    interface Format {
        /**
         *  Controls where to insert breaks
         */
        breaks?: {
            /**
             * Controls if a line break comes after an at-rule; e.g. `@charset`; defaults to `false`
             */
            afterAtRule?: boolean;
    
            /**
             * Controls if a line break comes after a block begins; e.g. `@media`; defaults to `false`
             */
            afterBlockBegins?: boolean;
    
            /**
             * Controls if a line break comes after a block ends, defaults to `false`
             */
            afterBlockEnds?: boolean;
    
            /**
             * Controls if a line break comes after a comment; defaults to `false`
             */
            afterComment?: boolean;
    
            /**
             * Controls if a line break comes after a property; defaults to `false`
             */
            afterProperty?: boolean;
    
            /**
             * Controls if a line break comes after a rule begins; defaults to `false`
             */
            afterRuleBegins?: boolean;
    
            /**
             * Controls if a line break comes after a rule ends; defaults to `false`
             */
            afterRuleEnds?: boolean;
    
            /**
             * Controls if a line break comes before a block ends; defaults to `false`
             */
            beforeBlockEnds?: boolean;
    
            /**
             * Controls if a line break comes between selectors; defaults to `false`
             */
            betweenSelectors?: boolean;
        },
        /**
         * Controls the new line character, can be `'\r\n'` or `'\n'`(aliased as `'windows'` and `'unix'`
         * or `'crlf'` and `'lf'`); defaults to system one, so former on Windows and latter on Unix
         */
        breakWith?: string;
    
        /**
         * Controls number of characters to indent with; defaults to `0`
         */
        indentBy?: number;
    
        /**
         * Controls a character to indent with, can be `'space'` or `'tab'`; defaults to `'space'`
         */
        indentWith?: "space" | "tab";
    
        /**
         * Controls where to insert spaces
         */
        spaces?: {
            /**
             * Controls if spaces come around selector relations; e.g. `div > a`; defaults to `false`
             */
            aroundSelectorRelation?: boolean;
    
            /**
             * Controls if a space comes before a block begins; e.g. `.block {`; defaults to `false`
             */
            beforeBlockBegins?: boolean;
    
            /**
             * Controls if a space comes before a value; e.g. `width: 1rem`; defaults to `false`
             */
            beforeValue?: boolean;
        },
        /**
         * Controls maximum line length; defaults to `false`
         */
        wrapAt?: false | number;
    }

    /**
     * Fine grained options for configuring optimizations
     */
    interface optimizationsOptions {
        1?: {
            /**
             * Sets all optimizations at this level unless otherwise specified
             */
            all?: boolean;

            /**
             * Controls `@charset` moving to the front of a stylesheet; defaults to `true`
             */
            cleanupCharsets?: boolean;

            /**
             * Controls URL normalization; defaults to `true`
             */
            normalizeUrls?: boolean;

            /**
             * Controls `background` property optimizations; defaults to `true`
             */
            optimizeBackground?: boolean;

            /**
             * Controls `border-radius` property optimizations; defaults to `true`
             */
            optimizeBorderRadius?: boolean;

            /**
             * Controls `filter` property optimizations; defaults to `true`
             */
            optimizeFilter?: boolean;

            /**
             * Controls `font` property optimizations; defaults to `true`
             */
            optimizeFont?: boolean;

            /**
             * Controls `font-weight` property optimizations; defaults to `true`
             */
            optimizeFontWeight?: boolean;

            /**
             * Controls `outline` property optimizations; defaults to `true`
             */
            optimizeOutline?: boolean;

            /**
             * Controls removing empty rules and nested blocks; defaults to `true`
             */
            removeEmpty?: boolean;

            /**
             * Controls removing negative paddings; defaults to `true`
             */
            removeNegativePaddings?: boolean;

            /**
             * Controls removing quotes when unnecessary; defaults to `true`
             */
            removeQuotes?: boolean;
            
            /**
             * Controls removing unused whitespace; defaults to `true`
             */
            removeWhitespace?: boolean;

            /**
             * Contols removing redundant zeros; defaults to `true`
             */
            replaceMultipleZeros?: boolean;

            /**
             * Controls replacing time units with shorter values; defaults to `true`
             */
            replaceTimeUnits?: boolean;

            /**
             * Controls replacing zero values with units; defaults to `true`
             */
            replaceZeroUnits?: boolean;

            /**
             * Rounds pixel values to `N` decimal places; `false` disables rounding; defaults to `false`
             */
            roundingPrecision?: boolean;

            /**
             * denotes selector sorting method; can be `'natural'` or `'standard'`, `'none'`, or false (the last two
             * since 4.1.0); defaults to `'standard'`
             */
            selectorsSortingMethod?: "standard" | "natural" | "none";

            /**
             * denotes a number of /*! ... * / comments preserved; defaults to `all`
             */
            specialComments?: string;

            /**
             * Controls at-rules (e.g. `@charset`, `@import`) optimizing; defaults to `true`
             */
            tidyAtRules?: boolean;

            /**
             * Controls block scopes (e.g. `@media`) optimizing; defaults to `true`
             */
            tidyBlockScopes?: boolean;

            /**
             * Controls selectors optimizing; defaults to `true`
             */
            tidySelectors?: boolean;

            /**
             * Controls removing trailing semicolons in rule; defaults to `false` - means remove
             */
            semicolonAfterLastProperty?: boolean;

            /**
             * Defines a callback for fine-grained property optimization; defaults to no-op
             */
            transform?: (propertyName: string, propertyValue: string, selector: string) => string;
        },
        2?: {
            /**
             * Sets all optimizations at this level unless otherwise specified
             */
            all?: boolean;

            /**
             * Controls adjacent rules merging; defaults to true
             */
            mergeAdjacentRules?: boolean;

            /**
             * Controls merging properties into shorthands; defaults to true
             */
            mergeIntoShorthands?: boolean;

            /**
             * Controls `@media` merging; defaults to true
             */
            mergeMedia?: boolean;

            /**
             * Controls non-adjacent rule merging; defaults to true
             */
            mergeNonAdjacentRules?: boolean;

            /**
             * Controls semantic merging; defaults to false
             */
            mergeSemantically?: boolean;

            /**
             * Controls property overriding based on understandability; defaults to true
             */
            overrideProperties?: boolean;

            /**
             * Controls removing empty rules and nested blocks; defaults to `true`
             */
            removeEmpty?: boolean;

            /**
             * Controls non-adjacent rule reducing; defaults to true
             */
            reduceNonAdjacentRules?: boolean;

            /**
             * Controls duplicate `@font-face` removing; defaults to true
             */
            removeDuplicateFontRules?: boolean;

            /**
             * Controls duplicate `@media` removing; defaults to true
             */
            removeDuplicateMediaBlocks?: boolean;

            /**
             * Controls duplicate rules removing; defaults to true
             */
            removeDuplicateRules?: boolean;

            /**
             * Controls unused at rule removing; defaults to false (available since 4.1.0)
             */
            removeUnusedAtRules?: boolean;

            /**
             * Controls rule restructuring; defaults to false
             */
            restructureRules?: boolean;

            /**
             * Controls which properties won't be optimized, defaults to `[]` which means all will be optimized (since 4.1.0)
             */
            skipProperties?: string[];
        }
    }

    /**
     * Callback type when fetch is used
     */
    type FetchCallback = (message: string | number, body: string) => void;

    /**
     * 
     */
    interface Function<T extends (Output | Promise<Output>)> {
        minify(sources: string | Array<string> | Object, callback?: (error: any, output: T) => void): T;
        minify(sources: string | Array<string> | Object, inputSourceMap?: string): T;
        minify(sources: string | Array<string> | Object, inputSourceMap?: string, callback?: (error: any, output: T) => void): T;
    }

    interface Constructor {
        new(options: CleanCSS.Options & { returnPromise?: false }): Function<Output>;
        new(options: CleanCSS.Options & { returnPromise: true }): Function<Promise<Output>>;
        new(): Function<Output>;
    }
}

/**
 * 
 */
declare const CleanCSS: CleanCSS.Constructor;

export = CleanCSS;
