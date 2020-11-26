import Vue from 'vue';

export function formatDateObj(UNIXdate, timeZone, includeTime = false, includeDate = false, includeTimeZone = false) {
  const myOffsetInMinutes = new Date().getTimezoneOffset() * 60;
  const localizedDate = new Date((UNIXdate + (myOffsetInMinutes + timeZone.offset)) * 1000);

  if (
    includeTime === false &&
    includeDate === false &&
    includeTimeZone === false
  ) return localizedDate.toLocaleString();

  const date = `${localizedDate.getMonth() + 1}/${localizedDate.getDate()}`;
  const time = `
    ${(localizedDate.getHours() < 10 ? '0' : '') +
    localizedDate.getHours()}:${(localizedDate.getMinutes() < 10 ? '0' : '') +
    localizedDate.getMinutes()}
  `;

  return `${includeTime ? time : ''}${includeDate ? ` ${date}` : ''}${includeTimeZone ? ` ${timeZone.label}` : ''}`;
}


const utils = Vue.observable({ formatDateObj });

Vue.prototype.$utils = utils;
