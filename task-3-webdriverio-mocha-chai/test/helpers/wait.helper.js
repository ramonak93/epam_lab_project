export async function waitForRedirect(expectedUrl, timeout = 5000) {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes(expectedUrl),
    {
      timeout,
      timeoutMsg: `Did not redirect to ${expectedUrl}`,
    },
  );
}
