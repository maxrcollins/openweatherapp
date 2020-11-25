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
    return JSON.parse(window.localStorage.getItem(name)) || {};
  }
  catch {
    return {};
  }
};
