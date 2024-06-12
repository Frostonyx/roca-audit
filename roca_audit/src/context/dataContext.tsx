'use client'
import { createContext, useContext, useState, ReactNode } from "react";

interface DataContextProps {
    csvData: any[],
    setCsvData: (csvData: any[]) => void
}

const DataContext = createContext<DataContextProps>({
    csvData: [],
    setCsvData: () => []
});

export function DataContextProvider({ children }: { children: ReactNode }) {
    const [csvData, setCsvData] = useState<any[]>([]);

    return (
        <DataContext.Provider value={{ csvData, setCsvData }}>
            {children}
        </DataContext.Provider>
    );
}

export function useDataContext() {
    return useContext(DataContext);
}
