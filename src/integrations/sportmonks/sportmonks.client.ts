import logger from "@/logger";
import axios, { AxiosInstance } from "axios";
import { SportMonksError } from "./sportmonks.errors";

type SportMonksClientOptions = {
  baseURL?: string;
  timeoutMs?: number;
  maxRetries?: number;
};

export class SportMonksClient {
  private client: AxiosInstance;
  private maxRetries: number;

  constructor(options?: SportMonksClientOptions) {
    const token = process.env.SPORTMONKS_API_TOKEN;
    if (!token) {
      throw new Error("SPORTMONKS_API_TOKEN is missing");
    }

    this.maxRetries = options?.maxRetries ?? 3;

    this.client = axios.create({
      baseURL: options?.baseURL ?? "https://api.sportmonks.com/v3",
      timeout: options?.timeoutMs ?? 8000,
      params: { api_token: token },
    });
  }

  private sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  private isRetryableStatus = (status?: number) =>
    status === 429 || (status !== undefined && status >= 500);

  private request = async <T>(
    endpoint: string,
    params?: Record<string, unknown>,
    attempt = 1
  ): Promise<T> => {
    const start = Date.now();

    try {
      const res = await this.client.get(endpoint, { params });
      logger.info("sportmonks.request.success", {
        endpoint,
        attempt,
        duration: Date.now() - start,
      });

      return res.data;
    } catch (err: any) {
      console.log("err", err);
      const status = err.response?.status;
      logger.warn("sportmonks.request.failure", {
        endpoint,
        attempt,
        status,
        duration: Date.now() - start,
      });

      if (!this.isRetryableStatus(status) || attempt >= this.maxRetries) {
        throw new SportMonksError(
          err.message || "SportMonks request failed",
          endpoint,
          status
        );
      }

      await this.sleep(300 * attempt);
      return this.request(endpoint, params, attempt + 1);
    }
  };

  get = async <T>(endpoint: string, params?: Record<string, unknown>) =>
    this.request<T>(endpoint, params);
}
