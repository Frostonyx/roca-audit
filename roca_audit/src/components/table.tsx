"use client";

import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { CellValueChangedEvent, ColDef, GridApi, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import NavBar from "@/components/navBar";
import { useDataContext } from "@/context/dataContext";
import { Box, Typography } from "@mui/material";
import CardImage from "@/components/getImages";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default function Table(props: {setName: Function, setNumber: Function, data: any[], setData: Function, setCurrentRowIndex: Function, currentRowIndex: number}) {
  const gridApiRef = useRef<GridApi | null>(null);

  const onGridReady = (params: { api: GridApi<any> | null }) => {
    gridApiRef.current = params.api;
    selectRow(props.currentRowIndex); 

  };

  useEffect(() => {
    selectRow(props.currentRowIndex);
  }, [props.currentRowIndex]);

  const selectRow = (index: number) => {
    if (gridApiRef.current) {
      const rowNode = gridApiRef.current.getDisplayedRowAtIndex(index);
      if (rowNode) {
        rowNode.setSelected(true);
        gridApiRef.current.ensureIndexVisible(index, 'middle'); 
      }
    }
  };

  const colDefs = [
    { field: "Set Name" },
    { field: "Product Name" },
    { field: "Number" },
    { field: "Condition" },
    { field: "Total Quantity", headerName: "Quantity", editable: true, cellEditor: 'agTextCellEditor' }
  ];

  const onRowSelected = () => {
    if (gridApiRef.current) {
      const selectedNodes = gridApiRef.current.getSelectedNodes();

      if (selectedNodes.length > 0) {
        const selectedRow = selectedNodes[0].data;
        props.setNumber(selectedRow["Number"]);
        props.setName(selectedRow["Product Name"].replace(/\s*\(.*?\)\s*/g, '').trim())
        const rowIndex = selectedNodes[0].rowIndex ?? 0;
        props.setCurrentRowIndex(rowIndex);
        gridApiRef.current.ensureIndexVisible(rowIndex, 'middle'); 
      } else {
        console.log("No rows selected");
      }
    } else {
      console.log("gridApiRef.current is null");
    }
  };

  const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
    const columnId = event.column.getColId();
    const rowIndex = event.node?.rowIndex;
    const newValue = event.newValue;
    const rowData = event.data;

    console.log(`CellValueChanged: column=${columnId}, rowIndex=${rowIndex}, newValue=${newValue}`);
    console.log("Updated row data:", rowData);

    if (columnId === "Total Quantity" && rowIndex !== null && rowIndex !== undefined) {
      props.setData((prevData: any) => {
        const newData = [...prevData];
        newData[rowIndex] = {
          ...newData[rowIndex],
          "Total Quantity": newValue,
          "Add to Quantity": newValue
        };
        console.log("Updated formattedData:", newData);
        return newData;
      });

      if (gridApiRef.current) {
        gridApiRef.current.applyTransaction({ update: [rowData] });
      }
    } else {
      console.error("Invalid rowIndex or columnId");
    }
  }, []);
  


  return (
    <div>
      <Box sx={{ px: 2 }}>
        <div className="ag-theme-quartz" style={{ height: 675, width: '100%' }}>
          <AgGridReact
            rowData={props.data}
            columnDefs={colDefs}
            rowSelection="single"
            onSelectionChanged={onRowSelected}
            onGridReady={onGridReady}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </Box>
    </div>
  );
}
