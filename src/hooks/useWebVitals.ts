import { useEffect } from 'react'
import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals'

interface PerformanceMetrics {
  CLS?: number
  FCP?: number
  LCP?: number
  TTFB?: number
  INP?: number
}

interface UseWebVitalsOptions {
  onReport?: (metrics: PerformanceMetrics) => void
  reportOnVisible?: boolean
}

function formatMetric(metric: Metric): string {
  return `${metric.name}: ${metric.value.toFixed(2)}${metric.delta > 0 ? ` (+${(metric.delta - metric.value).toFixed(2)})` : ''}`
}

function sendToAnalytics(metric: Metric): void {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    delta: metric.delta,
    id: metric.id,
    rating: metric.rating,
    entries: metric.entries
  })

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/vitals', body)
  } else {
    fetch('/api/vitals', {
      body,
      method: 'POST',
      keepalive: true
    }).catch(() => {
      console.debug('[Web Vitals]', formatMetric(metric))
    })
  }
}

export function useWebVitals(options: UseWebVitalsOptions = {}): void {
  const { onReport } = options

  useEffect(() => {
    const metrics: PerformanceMetrics = {}

    const handleMetric = (metric: Metric) => {
      switch (metric.name) {
        case 'CLS':
          metrics.CLS = metric.value
          break
        case 'FCP':
          metrics.FCP = metric.value
          break
        case 'LCP':
          metrics.LCP = metric.value
          break
        case 'TTFB':
          metrics.TTFB = metric.value
          break
        case 'INP':
          metrics.INP = metric.value
          break
      }

      console.debug('[Web Vitals]', formatMetric(metric))

      if (typeof import.meta !== 'undefined' && (import.meta as { env?: { PROD?: boolean } }).env?.PROD) {
        sendToAnalytics(metric)
      }

      onReport?.(metrics)
    }

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint') {
          console.debug('[Performance]', entry.name, entry.startTime.toFixed(2))
        }
      }
    })

    try {
      observer.observe({ entryTypes: ['paint', 'layout-shift'] })
    } catch {
      console.debug('[Web Vitals] PerformanceObserver not supported')
    }

    onCLS(handleMetric)
    onFCP(handleMetric)
    onLCP(handleMetric)
    onTTFB(handleMetric)
    onINP(handleMetric)

    return () => {
      observer.disconnect()
    }
  }, [onReport])
}

export function getWebVitalsSummary(metrics: PerformanceMetrics): string {
  const entries = []

  if (metrics.CLS !== undefined) {
    entries.push(`CLS: ${metrics.CLS.toFixed(3)}`)
  }
  if (metrics.FCP !== undefined) {
    entries.push(`FCP: ${metrics.FCP.toFixed(0)}ms`)
  }
  if (metrics.LCP !== undefined) {
    entries.push(`LCP: ${metrics.LCP.toFixed(0)}ms`)
  }
  if (metrics.TTFB !== undefined) {
    entries.push(`TTFB: ${metrics.TTFB.toFixed(0)}ms`)
  }

  return entries.join(' | ')
}

export const vitalsRating = {
  good: (metric: Metric) => metric.rating === 'good',
  needsImprovement: (metric: Metric) => metric.rating === 'needs-improvement',
  poor: (metric: Metric) => metric.rating === 'poor'
}
