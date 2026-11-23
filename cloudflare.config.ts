import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "hotairballoon-morocco",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-23",
    /* Mirrors the dashboard Observability settings exactly so Git deploys
     * keep them and the deploy config diff stays empty: top-level switch off,
     * logs on (100% sampling, invocation logs, persisted), traces off,
     * issue detection off. */
    observability: {
      enabled: false,
      headSamplingRate: 1,
      issues: { enabled: false },
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
