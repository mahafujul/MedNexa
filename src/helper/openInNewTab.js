/**
 * Opens a URL in a new browser tab with security measures.
 *
 * This function opens the specified URL in a new tab while ensuring
 * that the new tab has no access to the originating window's context.
 *
 * @param {string} url - The URL to open in a new tab.
 */
export const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};
