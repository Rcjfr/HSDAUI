// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  aircraftServiceEndPointUrl: 'http://10.62.99.190/AircraftService/api/aircraft/',
  hsdaApiBaseUrl: 'http://hsda.local.techops.aa.com/api/',
  logoutUrl: 'https://smlogin.qtcorpaa.aa.com/login/SMLogout.jsp?originalTarget=https://newjetnet.aa.com'
};
