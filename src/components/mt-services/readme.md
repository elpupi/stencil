# mt-services



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute       | Description | Type                                                                                                                                                                         | Default              |
| ---------------------- | --------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `breakpoints`          | `breakpoints`   |             | `BreakPoint<string, string>[] \| string`                                                                                                                                     | `LAYOUT_BREAKPOINTS` |
| `disabled`             | `disabled`      |             | `"" \| "false" \| "true" \| boolean`                                                                                                                                         | `false`              |
| `responsive`           | `responsive`    |             | `"" \| "false" \| "true" \| boolean`                                                                                                                                         | `true`               |
| `terms`                | `terms`         |             | `"" \| "false" \| "true" \| boolean`                                                                                                                                         | `true`               |
| `termsServicesOptions` | `terms-options` |             | `string \| { common: TermsBaseOpts; police?: false \| Options<PolicyOptions>; policeShort?: false \| Options<PolicyShortOptions>; terms?: false \| Options<TermsOptions>; }` | `undefined`          |
| `tilda`                | `tilda`         |             | `"" \| "false" \| "true" \| boolean`                                                                                                                                         | `true`               |
| `tildaServicesOptions` | `tilda-options` |             | `TildaModuleServicesOpts \| string`                                                                                                                                          | `undefined`          |


## Methods

### `initServices(options: MtModulesServicesOpts) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `services() => Promise<{ responsive: import("/home/milottit/Libraries/Tilda/stencil-components/src/responsive/types").ResponsiveModuleServices; tilda: { popup: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").Popup; loadingAnimationPopup: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").LoadingAnimationPopup; language: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").LanguageService; }; terms: { police: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").Policy; policeShort: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").PolicyShort; terms: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").Terms; }; }>`



#### Returns

Type: `Promise<{ responsive: ResponsiveModuleServices; tilda: { popup: Popup; loadingAnimationPopup: LoadingAnimationPopup; language: LanguageService; }; terms: { police: Policy; policeShort: PolicyShort; terms: Terms; }; }>`



### `setServicesOptions(options: MtModulesServicesOpts) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
