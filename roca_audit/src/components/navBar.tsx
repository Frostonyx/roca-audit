'use client'
import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const pages = ['home','audit'];

export default function NavBar(){
    const router = useRouter()

    const links = [
        {name: "Home", url: "/"},
        {name: "Audit", url: "/audit"},
    ];
    
    return (
        <header>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                        {links.map((link, i) => (
                        <Link key={i} href={link.url} passHref>
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {link.name}
                            </Button>
                        </Link>
                        ))}
                    </Box>

                    </Toolbar>
                </Container>
            </AppBar>
        </header>
    )
}