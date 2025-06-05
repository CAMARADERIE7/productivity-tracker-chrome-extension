let activeTabId = null;
let activeUrl = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await handleTabChange(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === 'complete') {
    await handleTabChange(tabId);
  }
});

async function handleTabChange(tabId) {
  const tab = await chrome.tabs.get(tabId);

  // Log previous tab's time
  if (activeUrl && startTime) {
    const timeSpent = Date.now() - startTime;
    await sendTimeData(activeUrl, timeSpent);
  }

  activeTabId = tabId;
  activeUrl = tab.url;
  startTime = Date.now();
}

async function sendTimeData(url, timeSpent) {
  try {
    await fetch("http://localhost:5000/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, timeSpent }),
    });
    console.log("Sent time data:", url, timeSpent);
  } catch (err) {
    console.error("Error sending data", err);
  }
}

