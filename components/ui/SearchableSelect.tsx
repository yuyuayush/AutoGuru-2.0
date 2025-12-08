"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchableSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder?: string;
    disabled?: boolean;
    className?: string;       // For the trigger button
    dropdownClassName?: string; // For the dropdown container
}

export function SearchableSelect({
    value,
    onChange,
    options,
    placeholder = "Select...",
    disabled = false,
    className,
    dropdownClassName
}: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Filter options based on searchTerm
    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
        setSearchTerm("");
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            <div
                className={cn(
                    "flex items-center justify-between w-full px-4 py-3 border rounded-sm cursor-pointer transition-colors text-sm",
                    // Default styles
                    "bg-white border-gray-300 text-white",
                    // Interactive states
                    !disabled && "hover:border-blue-400",
                    isOpen && "border-blue-500 ring-1 ring-blue-500",
                    disabled && "opacity-50 cursor-not-allowed bg-gray-100",
                    className
                )}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className={cn("block truncate", !value && "text-gray-400")}>
                    {value || placeholder}
                </span>
                <ChevronDown className="w-4 h-4 opacity-50 ml-2" />
            </div>

            {isOpen && (
                <div className={cn(
                    "absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden flex flex-col",
                    // Default height - increased as requested (max-h-96 is ~384px)
                    "max-h-96",
                    dropdownClassName
                )}>
                    <div className="p-2 border-b border-gray-100 relative bg-opacity-50">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 " />
                        <input
                            type="text"
                            className={cn(
                                "w-full pl-8 pr-2 py-2 text-sm rounded-sm focus:outline-none bg-transparent",
                                "border border-transparent focus:border-blue-500 placeholder-gray-400",
                                // If parent passes dark text color logic in dropdownClassName, better ensure input is readable.
                                // Defaulting to gray-900 for input text in standard dropdown.
                                ""
                            )}
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="overflow-y-auto flex-1 p-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option}
                                    className={cn(
                                        "px-3 py-2 text-left text-sm cursor-pointer rounded-sm transition-colors",
                                        "hover:bg-gray-100 text-white",
                                        value === option && "bg-blue-50 text-white font-medium"
                                    )}
                                    onClick={() => handleSelect(option)}
                                >
                                    {option}
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-4 text-sm text-gray-500 text-center">
                                No results found.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
