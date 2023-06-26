function resolveDid(input) {
  return (
    'https://' +
    input.substring(8).replaceAll(':', '/').replaceAll('%3A', ':') +
    '/did.json'
  );
}

chrome.omnibox.onInputEntered.addListener(async (text) => {
  const currentTab = await getCurrentTab();
  chrome.tabs.update(currentTab.id, { url: resolveDid(text) });
});

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
