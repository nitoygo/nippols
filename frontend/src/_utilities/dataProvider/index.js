export default () => {
  return import('./restProviderFactory').then(provider => provider.default);
};
