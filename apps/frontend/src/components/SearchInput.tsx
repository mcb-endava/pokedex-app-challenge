import { Grid, TextField } from "@mui/material";
import type { ChangeEvent } from "react";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <Grid container justifyContent="center" sx={{ m: 3 }}>
            <TextField
                label="Search Pokémon"
                variant="outlined"
                value={value}
                onChange={handleChange}
                fullWidth
            />
        </Grid>

    );
}