"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useCarMakes, useCarModels } from "@/hooks/useCarData";
import { SearchableSelect } from "@/components/ui/SearchableSelect";

interface CompatibilityRule {
    make: string;
    model: string;
    variant: string;
}

interface CompatibilityManagerProps {
    compatibility: CompatibilityRule[];
    onChange: (compatibility: CompatibilityRule[]) => void;
}

export function CompatibilityManager({ compatibility, onChange }: CompatibilityManagerProps) {
    const [newRule, setNewRule] = useState<CompatibilityRule>({ make: "", model: "", variant: "" });
    const { data: makesData } = useCarMakes();
    const { data: modelsData } = useCarModels(newRule.make);

    const addRule = () => {
        if (!newRule.make) return;
        onChange([...compatibility, newRule]);
        setNewRule({ make: "", model: "", variant: "" });
    };

    const removeRule = (index: number) => {
        onChange(compatibility.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Compatibility Manager</h2>

                {/* Add New Rule Section */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Add New Rule</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Brand</label>
                            <SearchableSelect
                                value={newRule.make}
                                onChange={(value) => setNewRule({ ...newRule, make: value, model: "" })}
                                options={makesData?.makes || []}
                                placeholder="Select Brand"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Model</label>
                            <SearchableSelect
                                value={newRule.model}
                                onChange={(value) => setNewRule({ ...newRule, model: value })}
                                options={modelsData?.models || []}
                                placeholder="Select Model"
                                disabled={!newRule.make}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Variant (Optional)</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="e.g. Sport, LX"
                            value={newRule.variant}
                            onChange={(e) => setNewRule({ ...newRule, variant: e.target.value })}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={addRule}
                        disabled={!newRule.make}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Compatibility Rule
                    </button>
                </div>

                {/* List Existing Rules */}
                <div className="space-y-2 max-h-60 overflow-y-auto pt-4 border-t border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Rules ({compatibility.length})</label>
                    {compatibility.length === 0 && (
                        <p className="text-sm text-gray-500 italic text-center py-4 bg-gray-50 rounded">
                            No compatibility rules added yet.
                        </p>
                    )}
                    {compatibility.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded border border-gray-200 hover:border-blue-200 transition-colors">
                            <div className="text-sm">
                                <span className="font-semibold text-gray-900">{item.make}</span>
                                {item.model && <span className="text-gray-600"> • {item.model}</span>}
                                {item.variant && <span className="text-gray-500 italic"> ({item.variant})</span>}
                            </div>
                            <button
                                type="button"
                                onClick={() => removeRule(index)}
                                className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-full transition-all"
                                title="Remove rule"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
