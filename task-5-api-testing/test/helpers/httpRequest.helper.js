export async function httpRequest(
  url,
  method = "GET",
  headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body = {},
) {
  const request = await fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  });

  const response = request.ok ? await request.json() : await request.text();
  return { request, response };
}
