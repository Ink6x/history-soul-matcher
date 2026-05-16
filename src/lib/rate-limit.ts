import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

let ratelimit: Ratelimit | null = null;
if (UPSTASH_URL && UPSTASH_TOKEN) {
  ratelimit = new Ratelimit({
    redis: new Redis({ url: UPSTASH_URL, token: UPSTASH_TOKEN }),
    limiter: Ratelimit.slidingWindow(10, '1 h'),
    analytics: false,
  });
}

export async function checkRateLimit(ip: string): Promise<{ success: boolean }> {
  if (!ratelimit) return { success: true };
  return ratelimit.limit(ip);
}
