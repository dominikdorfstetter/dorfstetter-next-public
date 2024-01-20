import { fetchData } from "./utilities";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("fetchData function", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should fetch data correctly", async () => {
    const mockData = { foo: "bar" };
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockData }));

    const data = await fetchData("http://mock.api.io", { method: "GET" });
    expect(data).toEqual(mockData);
  });

  it("should throw an error when the response is not ok", async () => {
    fetchMock.mockRejectOnce(new Error("fake error message"));

    await expect(
      fetchData("http://mock.api.io", { method: "GET" }),
    ).rejects.toThrow("fake error message");
  });

  it("should throw an error when no data is available", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));

    await expect(
      fetchData("http://mock.api.io", { method: "GET" }),
    ).rejects.toThrow("Received no data from the API.");
  });
});
