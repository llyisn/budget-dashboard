import { createContext, useContext, useMemo } from "react";

const GridMetricsContext = createContext(null)

export function GridMetricsProvider({cellSize, gapSize, children}) {
    const value = useMemo(() => ({
        cellSize,
        gapSize,
        getPixelSize: (w,h) => ({
            width: w * cellSize + ( w - 1) * gapSize,
            height: h * cellSize + ( h - 1) * gapSize
        })
    }), [cellSize, gapSize])

    return (
        <GridMetricsContext.Provider value={value}>
            {children}
        </GridMetricsContext.Provider>
    )
}

export function useGridMetrics() {
    const context = useContext(GridMetricsContext)
    if (!context) throw new Error("useGridMetrics must be used within GridMetricsProvider");
    
    return context
}