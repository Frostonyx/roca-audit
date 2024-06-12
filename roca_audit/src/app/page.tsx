'use client'
import CSVReader from "@/components/csvReader";
import NavBar from "@/components/navBar";
import { DataContextProvider } from "@/context/dataContext";
import { Box } from "@mui/material";

export default function Home() {
  
  return (
  <div>
    <NavBar />
  <main
          style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh',
        }}>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      borderRadius='12px'
      boxShadow='2'
      width='300px'
      height='150px'
      >
        
    <CSVReader/>
    </Box>
  </main>
  </div>
  )
}
