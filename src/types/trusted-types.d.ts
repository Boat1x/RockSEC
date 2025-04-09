// This file provides TypeScript support for the Trusted Types API
// See: https://w3c.github.io/webappsec-trusted-types/dist/spec/

declare namespace TrustedTypes {
  interface TrustedTypePolicyFactory {
    createPolicy(
      policyName: string,
      policyOptions?: {
        createHTML?: (input: string) => string;
        createScript?: (input: string) => string;
        createScriptURL?: (input: string) => string;
        createURL?: (input: string) => string;
      }
    ): TrustedTypePolicy;
    isHTML(value: any): value is TrustedHTML;
    isScript(value: any): value is TrustedScript;
    isScriptURL(value: any): value is TrustedScriptURL;
    isURL(value: any): value is TrustedURL;
    getAttributeType(tagName: string, attribute: string, elementNS?: string): string | null;
    getPropertyType(tagName: string, property: string, elementNS?: string): string | null;
    emptyHTML: TrustedHTML;
    emptyScript: TrustedScript;
    defaultPolicy: TrustedTypePolicy | null;
  }

  interface TrustedTypePolicy {
    readonly name: string;
    createHTML?(input: string): TrustedHTML;
    createScript?(input: string): TrustedScript;
    createScriptURL?(input: string): TrustedScriptURL;
    createURL?(input: string): TrustedURL;
  }

  interface TrustedHTML {
    toString(): string;
  }

  interface TrustedScript {
    toString(): string;
  }

  interface TrustedScriptURL {
    toString(): string;
  }

  interface TrustedURL {
    toString(): string;
  }
}

declare interface Window {
  trustedTypes: TrustedTypes.TrustedTypePolicyFactory;
}

declare const trustedTypes: TrustedTypes.TrustedTypePolicyFactory; 