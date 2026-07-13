export async function getBooking(
  url,
  header = { "Content-Type": "application/json", Accept: "application/json" },
) {
  const request = await fetch(url, {
    method: "GET",
    headers: header,
  });

  return request;
}
