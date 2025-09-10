// instrumentation.ts
import * as Sentry from "@sentry/nextjs";

// 1) Hook requerido para erros em RSC aninhados
export const onRequestError = Sentry.captureRequestError;

const baseSentryOptions = {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
    // ajuste o que precisar:
    // profilesSampleRate: 1.0,
    // debug: process.env.NODE_ENV !== "production",
};

export async function register() {
    // Server runtime (Node.js)
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const Sentry = await import("@sentry/nextjs");
        Sentry.init({
            ...baseSentryOptions,
            // configs específicas de server aqui
            integrations: [],
        });
    }

    // Edge runtime
    if (process.env.NEXT_RUNTIME === "edge") {
        const Sentry = await import("@sentry/nextjs");
        Sentry.init({
            ...baseSentryOptions,
            // configs específicas de edge aqui
            integrations: [],
        });
    }
}
