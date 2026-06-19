export async function clearBrowserState() {
  const currentUrl = await browser.getUrl();
  if (!currentUrl.startsWith("http")) {
    await browser.url("/");
  }

  await browser.deleteAllCookies();
  await browser.execute(() => {
    try {
      window.localStorage.clear();
      window.sessionStorage.clear();
    } catch (e) {
      // Ignore potential errors if storage is not accessible
      console.warn("Could not clear storage:", e);
    }
  });
}
