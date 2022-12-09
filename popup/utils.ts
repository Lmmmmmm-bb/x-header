import type { TabInfo } from './types';

const resourceTypes = Object.values(chrome.declarativeNetRequest.ResourceType);

export const updateDynamicRules = (activeTab: TabInfo, allTabs: TabInfo[]) => {
  const activeHeaders = activeTab.headers.filter((h) => !h.disabled);
  const allRulesIds = allTabs.map((tab) => tab.no);

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: allRulesIds,
    addRules: [
      {
        id: activeTab.no,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType[
            activeHeaders.length ? 'MODIFY_HEADERS' : 'ALLOW'
          ],
          requestHeaders: activeHeaders.map((header) => ({
            operation: chrome.declarativeNetRequest.HeaderOperation.SET,
            header: header.name,
            value: header.value
          }))
        },
        condition: { resourceTypes }
      }
    ]
  });
};

export const clearDynamicRules = (allTabs: TabInfo[]) => {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: allTabs.map((tab) => tab.no)
  });
};
