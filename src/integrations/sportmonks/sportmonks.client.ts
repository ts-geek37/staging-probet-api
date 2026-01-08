import logger from "@/logger";
import axios, { AxiosError, AxiosInstance } from "axios";
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

  private extractRateLimitInfo = (headers?: Record<string, any>) => {
    if (!headers) return null;
    return {
      limit: headers["x-ratelimit-limit"] ?? null,
      remaining: headers["x-ratelimit-remaining"] ?? null,
    };
  };

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
        duration_ms: Date.now() - start,
        rate_limit: this.extractRateLimitInfo(res.headers),
      });

      return res.data;
    } catch (error) {
      const err = error as AxiosError<any>;
      const status = err.response?.status;
      const headers = err.response?.headers;
      const rateLimit = this.extractRateLimitInfo(headers);
      const duration = Date.now() - start;

      const willRetry =
        this.isRetryableStatus(status) && attempt < this.maxRetries;

      const logPayload = {
        endpoint,
        attempt,
        max_retries: this.maxRetries,
        status,
        axios_code: err.code,
        message: err.response?.data?.message ?? err.message,
        duration_ms: duration,
        rate_limit: rateLimit,
        will_retry: willRetry,
      };

      if (willRetry) {
        logger.warn("sportmonks.request.retry", logPayload);
        await this.sleep(300 * attempt);
        return this.request(endpoint, params, attempt + 1);
      }

      logger.error("sportmonks.request.failed", logPayload);

      throw new SportMonksError(
        err.response?.data?.message || "SportMonks request failed",
        endpoint,
        status
      );
    }
  };

  get = async <T>(endpoint: string, params?: Record<string, unknown>) =>
    this.request<T>(endpoint, params);
}
