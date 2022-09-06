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

### `initServices(options: MtModulesServicesOpts) => Promise<MtModulesServices>`



#### Returns

Type: `Promise<{ responsive: { isMobile: boolean; breakpoints: BreakPoint<string, string>[]; mediaQuery: MediaQuery<BreakpointAlias, keyof BREAKPOINTS_ALIAS_NAMES_CAMELIZE>; breakpointObserver: BreakpointObserver; addResponsiveClasses: AddResponsiveClasses; responsiveProp: ResponsiveProp; }; tilda: { popup: Popup; loadingAnimationPopup: LoadingAnimationPopup; language: LanguageService; zeroBlock: typeof import("/home/milottit/Libraries/Tilda/stencil-components/src/services/tilda/tilda-zero-block.service"); }; terms: { police: Policy; policeShort: PolicyShort; terms: Terms; }; }>`



### `services() => Promise<{ responsive: { isMobile: boolean; breakpoints: BreakPoint<string, string>[]; mediaQuery: import("/home/milottit/Libraries/Tilda/stencil-components/src/responsive/media-query.service").MediaQuery<import("/home/milottit/Libraries/Tilda/stencil-components/src/responsive/breakpoints").BreakpointAlias, keyof { xs: any; sm: any; premd: any; md: any; lg: any; big: any; xl: any; prehuge: any; huge: any; ltXs: any; ltSm: any; ltPremd: any; ltMd: any; ltLg: any; ltBig: any; ltXl: any; ltPrehuge: any; ltHuge: any; lteXs: any; lteSm: any; ltePremd: any; lteMd: any; lteLg: any; lteBig: any; lteXl: any; ltePrehuge: any; lteHuge: any; gtXs: any; gtSm: any; gtPremd: any; gtMd: any; gtLg: any; gtBig: any; gtXl: any; gtPrehuge: any; gtHuge: any; gteXs: any; gteSm: any; gtePremd: any; gteMd: any; gteLg: any; gteBig: any; gteXl: any; gtePrehuge: any; gteHuge: any; handset: any; handsetLandscape: any; handsetPortrait: any; tablet: any; tabletLandscape: any; tabletPortrait: any; web: any; webLandscape: any; webPortrait: any; }>; breakpointObserver: import("/home/milottit/Libraries/Tilda/stencil-components/src/responsive/breakpoint-observer.service").BreakpointObserver; addResponsiveClasses: import("/home/milottit/Libraries/Tilda/stencil-components/src/responsive/add-responsive-classes.service").AddResponsiveClasses; responsiveProp: import("/home/milottit/Libraries/Tilda/stencil-components/src/responsive/responsive-prop.service").ResponsiveProp; }; tilda: { popup: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").Popup; loadingAnimationPopup: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").LoadingAnimationPopup; language: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").LanguageService; zeroBlock: typeof import("/home/milottit/Libraries/Tilda/stencil-components/src/services/tilda/tilda-zero-block.service"); }; terms: { police: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").Policy; policeShort: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").PolicyShort; terms: import("/home/milottit/Libraries/Tilda/stencil-components/src/services/index").Terms; }; }>`



#### Returns

Type: `Promise<{ responsive: { isMobile: boolean; breakpoints: BreakPoint<string, string>[]; mediaQuery: MediaQuery<BreakpointAlias, keyof BREAKPOINTS_ALIAS_NAMES_CAMELIZE>; breakpointObserver: BreakpointObserver; addResponsiveClasses: AddResponsiveClasses; responsiveProp: ResponsiveProp; }; tilda: { popup: Popup; loadingAnimationPopup: LoadingAnimationPopup; language: LanguageService; zeroBlock: typeof import("/home/milottit/Libraries/Tilda/stencil-components/src/services/tilda/tilda-zero-block.service"); }; terms: { police: Policy; policeShort: PolicyShort; terms: Terms; }; }>`



### `setServicesOptions(options: MtModulesServicesOpts) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
