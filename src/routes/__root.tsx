import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NeotixHQ — Cognitive systems for better decisions" },
      {
        name: "description",
        content:
          "NeotixHQ designs AI-native products that transform conversations, workflows, and fragmented signals into structured context and sharper decisions.",
      },
      { name: "author", content: "NeotixHQ" },
      { property: "og:title", content: "NeotixHQ — Cognitive systems for better decisions" },
      {
        property: "og:description",
        content:
          "AI-native products that transform fragmented work into structured intelligence.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "NeotixHQ" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NeotixHQ — Cognitive systems for better decisions" },
      {
        name: "twitter:description",
        content:
          "AI-native products that transform fragmented work into structured intelligence.",
      },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/25aa1acb-e90f-4722-9784-a4075a0df138/id-preview-66396729--1e2ab344-6cef-4fed-aeb5-8c3bf921be34.lovable.app-1780126119359.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/25aa1acb-e90f-4722-9784-a4075a0df138/id-preview-66396729--1e2ab344-6cef-4fed-aeb5-8c3bf921be34.lovable.app-1780126119359.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://nucielo.io/#organization",
              name: "NuCielo ICT B.V.",
              legalName: "NuCielo ICT B.V.",
              url: "https://nucielo.io/",
              description:
                "NuCielo ICT B.V. operates the NeotixHQ brand, an AI-native studio for the cognitive layer of work.",
              brand: { "@id": "https://neotixhq.com/#brand" },
            },
            {
              "@type": "Brand",
              "@id": "https://neotixhq.com/#brand",
              name: "NeotixHQ",
              url: "https://neotixhq.com/",
              description: "NeotixHQ is a brand operated by NuCielo ICT B.V.",
            },
            {
              "@type": "WebSite",
              "@id": "https://neotixhq.com/#website",
              name: "NeotixHQ",
              url: "https://neotixhq.com/",
              publisher: { "@id": "https://nucielo.io/#organization" },
              about: { "@id": "https://neotixhq.com/#brand" },
              mentions: { "@id": "https://meridian.neotixhq.com/#software" },
            },
            {
              "@type": "SoftwareApplication",
              "@id": "https://meridian.neotixhq.com/#software",
              name: "Meridian — AI History Explorer",
              url: "https://meridian.neotixhq.com/",
              publisher: { "@id": "https://nucielo.io/#organization" },
              description:
                "Meridian is a local-first AI History Explorer by NeotixHQ for importing, analyzing, searching, reading, and exporting ChatGPT, Claude, and Gemini conversation history.",
            },
          ],
        }),
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}


function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
