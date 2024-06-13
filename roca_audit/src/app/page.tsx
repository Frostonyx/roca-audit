"use client";
import CSVReader from "@/components/csvReader";
import NavBar from "@/components/navBar";
import { useDataContext } from "@/context/dataContext";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  const { csvData } = useDataContext();
  return (
    <div>
      <NavBar />
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRadius="12px"
          boxShadow="2"
          width="300px"
          height="150px"
        >
          <CSVReader />
        </Box>
        <Box sx={{ py: 2 }}>
          <Link href={"/audit"} passHref>
            <Button
              variant="contained"
              disabled={csvData.length === 0}
              fullWidth
              sx={{ py: 2 }}
            >
              Proceed to Audit
            </Button>
          </Link>
        </Box>
      </main>
    </div>
  );
}
