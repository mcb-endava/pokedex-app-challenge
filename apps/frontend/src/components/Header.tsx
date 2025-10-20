import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material";
import type { ReactNode } from "react";

export function Header(): ReactNode {
  return (
    <AppBar position="sticky" sx={{ mb: '20px' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Pokédex
        </Typography>
        <Button component={Link} href="/" color="secondary" variant="outlined" sx={{ mr: 2}}>
          Home
        </Button>
        <Button component={Link} href="/favorites" color="secondary" variant="outlined">
          Favorites
        </Button>
      </Toolbar>
    </AppBar>
  );
}