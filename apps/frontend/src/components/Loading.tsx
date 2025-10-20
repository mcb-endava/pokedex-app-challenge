import { Box, CircularProgress, Typography } from "@mui/material";
import type { ReactNode } from "react";

export function Loading({ text }: { text: string }): ReactNode {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', gap: 2 }}>
            <Typography>{text}</Typography>
            <CircularProgress />
        </Box>
    );
}