// hooks/useBreakpoint.ts
import { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateBreakpoint = (): void => {
      const width = window.innerWidth;

      if (width >= 1536) setBreakpoint('2xl');
      else if (width >= 1280) setBreakpoint('xl');
      else if (width >= 1024) setBreakpoint('lg');
      else if (width >= 768) setBreakpoint('md');
      else if (width >= 640) setBreakpoint('sm');
      else setBreakpoint('xs');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  // Return 'xs' during SSR and before mounting to prevent hydration mismatch
  if (!mounted) {
    return 'xs';
  }

  return breakpoint;
}
