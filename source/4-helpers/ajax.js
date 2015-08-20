module.exports = function (a, xhr) {
  'use strict';
  xhr = new XMLHttpRequest();
  // Open url
  xhr.open('GET', a);
  // Reuse a to store callbacks
  a = [];

  // onSuccess handler
  // onError   handler
  // cb, data  placeholder to avoid using var, should not be used
  xhr.onreadystatechange = xhr.then = function(onSuccess, onError, cb, data) {
    // Test if onSuccess is a function
    if (onSuccess && onSuccess.call){
      a = [null,onSuccess, onError];
    }
    // Test if request is complete
    if (xhr.readyState === 4) {
      // index will be:
      // 0 if undefined
      // 1 if status is between 200 and 399
      // 2 if status is over
      var i = xhr.status / 200;
      cb = a[i];

      // Safari doesn't support xhr.responseType = 'json'
      // so the response is parsed
      if (cb) {
        try {
          data = JSON.parse(xhr.responseText);
        } catch (e) {
          data = null;
        }
        cb(data, xhr);
      }
    }
  };
  // Send
  xhr.send();
  // Return request
  return xhr;
};