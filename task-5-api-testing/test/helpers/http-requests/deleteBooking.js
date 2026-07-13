export async function deleteBooking(
  url,
  header = { "Content-Type": "application/json", Accept: "application/json" },
) {
  const request = await fetch(url, {
    method: "DELETE",
    headers: header,
  });

  return request;
}
