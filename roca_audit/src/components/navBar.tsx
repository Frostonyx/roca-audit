'use client'
import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDataContext } from "@/context/dataContext";
const pages = ['home','audit'];

export default function NavBar(){
    const router = useRouter()
    const { csvData, setCsvData } = useDataContext();
    const links = [
        {name: "Home", url: "/"},
    ];
    
    const handleReset = () => {
        setCsvData([])
    }

    
    return (
        <header>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
    
                        <Link href={"/"} passHref>
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleReset}
                            >
                                Home
                            </Button>
                        </Link>

                    </Box>

                    </Toolbar>
                </Container>
            </AppBar>
        </header>
    )
}