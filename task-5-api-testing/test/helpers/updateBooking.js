export async function updateBooking(
  url,
  body,
  header = { "Content-Type": "application/json", Accept: "application/json" },
) {
  const request = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: header,
  });

  return request;
}
