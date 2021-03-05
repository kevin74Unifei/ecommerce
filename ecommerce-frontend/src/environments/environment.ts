// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ecommerceUrl: "//localhost:8080",
  meal: "meal",
  customer: "customer",
  order: "order",
  localStorageCustomer: 'customerData',
  addressUrl: 'https://app.zipcodebase.com/api/v1',
  addressApiKey: '30a566c0-737f-11eb-9c54-4f3216f45f33',
  countryForZipCode: 'de',
  googleTagManagerId: 'GTM-NDVHPSV'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
