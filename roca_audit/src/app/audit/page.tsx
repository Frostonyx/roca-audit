"use client";

import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import React, { useState, useEffect, useRef } from "react";
import { ColDef, GridApi, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import NavBar from "@/components/navBar";
import { useDataContext } from "@/context/dataContext";
import { Box, Button, Typography, styled } from "@mui/material";
import CardImage from "@/components/getImages";
import Table from "@/components/table";
import { jsonToCSV } from "react-papaparse";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default function Audit() {
  const [name, setName] = useState<string>("")
  const [number, setNumber] = useState<string>("")
  const { csvData, fileName } = useDataContext();
  const headers: string[] = csvData[0];
  const [formattedData, setFormattedData] = useState<any[]>([]);
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);

  useEffect(() => {
    const initialData = csvData.slice(1).map((row) => {
      let obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    setFormattedData(initialData);
  }, [csvData]);

  const Wrapper = styled(Box)({
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gridGap: 1,
    marginTop: 16
  });

  const handlePrev = () => {
    setCurrentRowIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentRowIndex((prevIndex) => Math.min(prevIndex + 1, formattedData.length - 1));
  };

  const updateQuantity = (amount: number) => {
    setFormattedData((prevData) => {
      const newData = [...prevData];
      const currentQuantity = parseInt(newData[currentRowIndex]["Total Quantity"], 0)
      newData[currentRowIndex] = {
        ...newData[currentRowIndex],
        "Total Quantity": Math.max(currentQuantity + amount, 0).toString(),
        "Add to Quantity": Math.max(currentQuantity + amount, 0).toString()
      };
      return newData;
    });
  };

  const setQuantityToZero = () => {
    setFormattedData((prevData) => {
      const newData = [...prevData];
      newData[currentRowIndex] = {
        ...newData[currentRowIndex],
        "Total Quantity": 0,
        "Add to Quantity": 0
      };
      return newData;
    });
  };

  const downloadCSV = () => {
    const csvString = jsonToCSV(formattedData, { header: true });
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    const baseFileName = fileName.replace(/\.csv$/i, '');
    const adjustedFileName = `${baseFileName}_adjusted.csv`;

    link.setAttribute("download", adjustedFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return(
    <Box>
    <NavBar/>
    <Wrapper>
        <Box>    <CardImage name={name} number={number} />
        <Box display="flex" justifyContent="space-around" mt={2}>
        <Button variant="contained" onClick={handlePrev} disabled={currentRowIndex <= 0} fullWidth>
          Prev
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={currentRowIndex >= formattedData.length - 1} fullWidth>
          Next
        </Button>
        </Box>
        <Box display="flex" justifyContent="space-around" mt={2}>
        <Button variant="contained" color="secondary" onClick={() => updateQuantity(-1)} fullWidth>
          -1
        </Button>
        <Button variant="contained" color="error" onClick={setQuantityToZero} fullWidth>
          0
        </Button>
        <Button variant="contained" color="primary" onClick={() => updateQuantity(1)} fullWidth>
          +1
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="success" onClick={downloadCSV} fullWidth>
              Download CSV
            </Button>
          </Box>
</Box>
        <Box>  <Table setName={setName} setNumber={setNumber} data={formattedData} setData={setFormattedData} setCurrentRowIndex={setCurrentRowIndex} currentRowIndex={currentRowIndex}/></Box>
      </Wrapper>

  
  
    </Box>
  )
}
