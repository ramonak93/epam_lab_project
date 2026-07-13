export async function createBooking(
  url,
  body,
  header = { "Content-Type": "application/json", Accept: "application/json" },
) {
  const request = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: header,
  });

  return request;
}
