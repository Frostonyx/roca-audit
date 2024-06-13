'use client'
import { createContext, useContext, useState, ReactNode } from "react";

interface DataContextProps {
    csvData: any[],
    setCsvData: (csvData: any[]) => void
    fileName: string,
    setFileName: (fileName: string) => void
}

const DataContext = createContext<DataContextProps>({
    csvData: [],
    setCsvData: () => [],
    fileName: '',
    setFileName: () => {}
});

export function DataContextProvider({ children }: { children: ReactNode }) {
    const [csvData, setCsvData] = useState<any[]>([]);
    const [fileName, setFileName] = useState<string>('');

    return (
        <DataContext.Provider value={{ csvData, setCsvData, fileName, setFileName }}>
            {children}
        </DataContext.Provider>
    );
}

export function useDataContext() {
    return useContext(DataContext);
}
