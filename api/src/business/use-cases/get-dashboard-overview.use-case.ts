import { redis } from "../../models/redis.js";
import { getDashboardOverviewInteractor } from "../interactors/get-dashboard-overview.interactor.js";

const CACHE_TTL_SECONDS = 60;

export const getDashboardOverviewUseCase = async () => {
  const cacheKey = "dashboard:overview";

  try {
    await redis.connect();
    const cachedValue = await redis.get(cacheKey);

    if (cachedValue) {
      return JSON.parse(cachedValue) as Awaited<ReturnType<typeof getDashboardOverviewInteractor>>;
    }
  } catch {
    // Ignore cache connectivity issues and continue with the database source of truth.
  }

  const overview = await getDashboardOverviewInteractor();

  try {
    await redis.set(cacheKey, JSON.stringify(overview), "EX", CACHE_TTL_SECONDS);
  } catch {
    // Ignore cache write errors.
  }

  return overview;
};
