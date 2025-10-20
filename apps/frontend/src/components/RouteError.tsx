import { Box, Typography } from "@mui/material";
import PokemonError from "../assets/PokemonError.png";

export default function RouteError() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <img src={PokemonError} alt="404 Not Found" style={{ width: '300px', marginBottom: '20px' }} />
            <Typography variant="h2">404 Not Found</Typography>
        </Box>
    );
}