export async function waitForRedirect(expectedUrl, timeout = 5000) {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes(expectedUrl),
    {
      timeout,
      timeoutMsg: `Did not redirect to ${expectedUrl}`,
    },
  );
}

// export async function waitForPageToLoad(elementLocator) {
//   await browser.waitUntil(
//     async () => {
//       return elementLocator.isDisplayed();
//     },
//     {
//       timeout: 5000,
//       timeoutMsg: "Page element did not load in 5 seconds",
//     },
//   );
// }
