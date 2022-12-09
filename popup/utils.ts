import type { TabInfo } from './types';

const All_Resource_Types = Object.values(
  chrome.declarativeNetRequest.ResourceType
);

const getAllRulesIds = (count: number) =>
  Array(count)
    .fill(0)
    .map((_, index) => index + 1);

export const updateDynamicRules = (activeTab: TabInfo, count: number) => {
  const activeHeaders = activeTab.headers.filter((h) => !h.disabled);
  const allRulesIds = getAllRulesIds(count);

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
        condition: { resourceTypes: All_Resource_Types }
      }
    ]
  });
};

export const clearDynamicRules = (count: number) => {
  const allRulesIds = getAllRulesIds(count);
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: allRulesIds
  });
};
