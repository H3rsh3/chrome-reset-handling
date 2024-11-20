console.log("running")
chrome.webRequest.onErrorOccurred.addListener(
  function(details) {
    console.log(details.statuCode, details.error, details.type)
    if (details.type === "main_frame" && (details.error === 'net::ERR_CONNECTION_RESET' || details.error === 'net::ERR_CERT_AUTHORITIY_INVALID')) {
        // Get the custom URL from storage
        chrome.storage.sync.get(['customUrl'], function(data) {
          let redirectUrl = data.customUrl || chrome.runtime.getURL("oops.html"); // Fallback to oops.html
          chrome.tabs.update(details.tabId, {url: redirectUrl});
        });
      } 
  },
  {urls: ["<all_urls>"]},
);
