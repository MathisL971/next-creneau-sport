import posthog from 'posthog-js';

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || '/ingest',
  ui_host: 'https://us.posthog.com',
  defaults: '2025-05-24',
  capture_pageview: false, // Disable automatic pageview capture, we'll handle this manually due to internationalization
  capture_pageleave: true,
  capture_exceptions: true, // This enables capturing exceptions using Error Tracking
  debug: process.env.NODE_ENV === 'development',
});
