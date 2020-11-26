export const setLocalStore = (name = 'store', data) => {      // Wrap in debounce
  try {
    window.localStorage.setItem(name, JSON.stringify(data));
  }
  catch (e) {
    log.debug('Error setting local store', e);
  }
};


export const getLocalStore = (name = 'store') => {
  try {
    return JSON.parse(window.localStorage.getItem(name)) || {};
  }
  catch (e) {
    log.debug('Error getting local store', e);
  }
};
