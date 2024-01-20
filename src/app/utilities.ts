/**
 * Fetches data from the specified URL using the provided HTTP options.
 *
 * @param {string} url - The URL to fetch the data from.
 * @param {RequestInit} httpOptions - The options to use for the HTTP fetch request.
 * @returns {Promise<T>} - A Promise that resolves to the fetched data of type T.
 * @throws {Error} - Throws an error if the response is not ok or if no data is available.
 */
async function fetchData<T>(url: string, httpOptions: RequestInit): Promise<T> {
  const res: Response = await fetch(url, httpOptions);

  // If the response is not ok, throw an error.
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  // Parse the response.
  const apiResponse = await res.json();

  // If no data is available, throw an error.
  if (!apiResponse.data) {
    throw new Error("Received no data from the API.");
  }

  return apiResponse?.data as T;
}

export { fetchData };
