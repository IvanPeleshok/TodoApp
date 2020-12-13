import React from "react"

export function withSuspense<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    return (
      <React.Suspense fallback={<div className="app-content" />}>
        <WrappedComponent {...props} />
      </React.Suspense>
    )
  }
}
