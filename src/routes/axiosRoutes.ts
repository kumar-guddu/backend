import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

async function AxiosGet<T>(
  apiUrl: string,
  headers: AxiosRequestConfig["headers"],
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.get(apiUrl, { headers });
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default AxiosGet;

