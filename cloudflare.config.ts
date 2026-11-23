import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "hotairballoon-morocco",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-23",
    /* Mirrors the dashboard Observability settings so Git deploys keep them:
     * logs on (100% sampling, invocation logs, persisted), traces off. */
    observability: {
      enabled: true,
      headSamplingRate: 1,
      logs: { enabled: true, headSamplingRate: 1, invocationLogs: true, persist: true },
      traces: { enabled: false },
    },
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
    },
  }),
});
