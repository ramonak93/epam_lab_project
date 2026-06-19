export async function clearBrowserState() {
  await browser.deleteAllCookies();
}
