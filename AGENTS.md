# Project rules

- Keep the site identity graph in the existing TanStack root head and homepage metadata in the homepage head; this preserves initial-HTML rendering and avoids duplicate metadata mechanisms.
- Validate identity graph relationships with standard-library Python tests against local initial HTTP HTML; this checks crawler-visible output without introducing dependencies or accessing application data.