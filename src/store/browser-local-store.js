export const setLocalStore = (name = 'store', data) => {      // Wrap in debounce
  try {
    window.localStorage.setItem(name, JSON.stringify(data));
  }
  catch {
    // ignore
  }
};


export const getLocalStore = (name = 'store') => {

  try {
    //if (get(window, 'config.disableLocalStorage')) return {};
    return JSON.parse(window.localStorage.getItem(name)) || {};
  }
  catch {
    return {};
  }
};
