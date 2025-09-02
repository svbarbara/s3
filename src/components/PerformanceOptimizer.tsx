import { useEffect, useRef, useState, ReactNode } from 'react';

interface PerformanceOptimizer {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: ReactNode;
  enablePerformanceLogging?: boolean;
}

export function PerformanceOptimizer({
  children,
  threshold = 0.1,
  rootMargin = '100px 0px',
  fallback = <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-32 w-full" />,
  enablePerformanceLogging = false,
}: PerformanceOptimizer) {
  const [isVisible, setIsVisible] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState<{
    loadTime: number;
    renderTime: number;
  } | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const startTime = useRef<number>(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    startTime.current = performance.now();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const loadTime = performance.now() - startTime.current;

          setIsVisible(true);

          if (enablePerformanceLogging) {
            // Measure render time
            requestAnimationFrame(() => {
              const renderTime = performance.now() - startTime.current;
              setPerformanceMetrics({ loadTime, renderTime });

              console.log('Performance Metrics:', {
                component: 'PerformanceOptimizer',
                loadTime: `${loadTime.toFixed(2)}ms`,
                renderTime: `${renderTime.toFixed(2)}ms`,
              });
            });
          }

          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, enablePerformanceLogging]);

  // Performance monitoring hook
  useEffect(() => {
    if (!enablePerformanceLogging) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'paint') {
          console.log(`${entry.name}: ${entry.startTime.toFixed(2)}ms`);
        }
      });
    });

    observer.observe({ entryTypes: ['paint', 'navigation'] });
    return () => observer.disconnect();
  }, [enablePerformanceLogging]);

  return (
    <div
      ref={elementRef}
      className="performance-optimized"
      data-performance-metrics={performanceMetrics ? JSON.stringify(performanceMetrics) : undefined}
    >
      {isVisible ? children : fallback}
    </div>
  );
}

// Hook for monitoring component performance
export function usePerformanceMonitor(componentName: string) {
  const renderCount = useRef(0);
  const startTime = useRef<number>(0);

  useEffect(() => {
    renderCount.current += 1;
    startTime.current = performance.now();
  });

  useEffect(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    console.log(`${componentName} - Render #${renderCount.current}: ${renderTime.toFixed(2)}ms`);
  });

  return {
    renderCount: renderCount.current,
    markRender: () => {
      const endTime = performance.now();
      return endTime - startTime.current;
    }
  };
}

// Component for detecting slow renders
export function SlowRenderDetector({
  children,
  threshold = 16,
  onSlowRender
}: {
  children: ReactNode;
  threshold?: number;
  onSlowRender?: (renderTime: number) => void;
}) {
  const startTime = useRef<number>(0);

  useEffect(() => {
    startTime.current = performance.now();
  });

  useEffect(() => {
    const renderTime = performance.now() - startTime.current;
    if (renderTime > threshold) {
      console.warn(`Slow render detected: ${renderTime.toFixed(2)}ms`);
      onSlowRender?.(renderTime);
    }
  });

  return <>{children}</>;
}
