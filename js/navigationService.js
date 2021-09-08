const host = `${window.location.protocol}//${window.location.host}`;

const navigateTo = (route) => {
  window.location.replace(`${host}/${route}`);
};

const getQueryParam = (param) => {
  const [, queryParam] = window.location.search
    .substring(`${param}=`)
    .split("=");
  return queryParam;
};

export { navigateTo, getQueryParam };
