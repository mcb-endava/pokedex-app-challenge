import { AppBar, Toolbar, Typography } from "@mui/material";
import type { ReactNode } from "react";

export function Header(): ReactNode {
  return (
    <AppBar position="sticky" sx={{ marginBottom: '20px' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Pokédex
        </Typography>
      </Toolbar>
    </AppBar>
  );
}