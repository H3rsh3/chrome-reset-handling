// options.js
// Save options to chrome.storage
let saveButton = document.getElementById('save');
saveButton.addEventListener('click', function() {
  let customUrl = document.getElementById('customUrl').value;
  chrome.storage.sync.set({'customUrl': customUrl}, function() {
    console.log('Custom URL saved:', customUrl);
  });
});

// Load saved options
document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['customUrl'], function(data) {
    document.getElementById('customUrl').value = data.customUrl || '';
  });
});