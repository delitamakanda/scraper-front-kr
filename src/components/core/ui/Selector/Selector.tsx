import { brands } from './helper'
import { useTheme } from '@mui/material/styles'
import { Select, MenuItem } from '@mui/material'
import React from "react";

type BrandSelectorProps = {
    selectedBrand: string
    onChange: (event: string) => void
}

export const BrandSelector = ({ selectedBrand, onChange }: BrandSelectorProps) => {
    const theme = useTheme()

    return (
        <Select
            labelId="brand-selector-label"
            id="brand-selector"
            value={selectedBrand}
            onChange={(event) => onChange(event.target.value)}
            MenuProps={{
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                },
                transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                },
            }}
        >
            {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                    {brand}
                </MenuItem>
            ))}
        </Select>
    )
}
