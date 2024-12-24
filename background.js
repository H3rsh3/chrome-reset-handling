//console.log("running")
chrome.webRequest.onErrorOccurred.addListener(
  function(details) {
    // console.log(details.statuCode, details.error, details.type)
    if (details.type === "main_frame" && (details.error === 'net::ERR_CONNECTION_RESET' || 
      details.error === 'net::ERR_CERT_AUTHORITIY_INVALID')) {
        
        // Check if connecting via Zscaler
        fetch('https://ip.zscaler.com')
          .then(response => response.text())
          .then(text => {
            if (text.includes("You are accessing the Internet via Zscaler Cloud")) {
              // Get the custom URL from storage
              chrome.storage.sync.get(['customUrl'], function(data) {
                let redirectUrl = data.customUrl || chrome.runtime.getURL("oops.html"); // Fallback to oops.html
                chrome.tabs.update(details.tabId, {url: redirectUrl});
              });
            }
          })
          .catch(error => console.error('not connected via ZS:', error));
      } 
  },
  {urls: ["<all_urls>"]},
);