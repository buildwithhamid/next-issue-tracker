"use client"

import React from "react"
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./imports"
import { useView } from "@/app/ContextFiles/ViewContext"

export function DropdownToggle() {
    const {view, setView} = useView()
    
    const handleChange = (value: string) => {
        setView(value === "Admin View" ? "Admin":"User")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Select Views</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Site Views</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={view === "Admin"? "Admin View": "User View"} onValueChange={handleChange}>
                    <DropdownMenuRadioItem value="Admin View">Admin View</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="User View">User View</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
