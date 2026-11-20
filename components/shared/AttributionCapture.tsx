'use client';

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/attribution';

/** Records how the visitor arrived, once per tab. See lib/attribution.ts. */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
