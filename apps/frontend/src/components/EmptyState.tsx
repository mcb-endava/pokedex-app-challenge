import { Box, Typography } from "@mui/material";
import PokemonError from "../assets/PokemonError.png";
import type { ReactNode } from "react";

export default function EmptyListState({ text }: { text: string }): ReactNode {
    return (
        <Box data-testid="empty" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <img src={PokemonError} alt="Sad pikachu" style={{ width: '100px', marginBottom: '20px' }} />
            <Typography variant="h5">{text}</Typography>
        </Box>
    );
}