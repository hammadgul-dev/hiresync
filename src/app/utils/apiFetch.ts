export default async function apiFetch(
  apiURL: string,
  httpMethod = "GET",
  data?: any,
) {
  try {
    let apiResp = await fetch(apiURL, {
      method: httpMethod,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body:
        httpMethod === "GET" || httpMethod === "DELETE"
          ? undefined
          : JSON.stringify(data),
    })
    let apiData = await apiResp.json()
    if (!apiResp.ok) throw new Error(apiData?.message || "Request Failed!")
    return apiData
  } catch (e) {
    throw new Error((e as Error)?.message || "Failed To Fetch!")
  }
}
