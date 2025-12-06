import React from 'react';
import Link from 'next/link';
import { Car, Trash2, AlertCircle } from 'lucide-react';
import { useCarSubService } from '@/hooks/useCarSubService';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useQuoteStore } from '@/store/useQuoteStore';

interface QuoteSidebarProps {
    showGetQuotes?: boolean;
}

const CartItem = ({ task, vehicle, onRemove }: { task: { _id: string, name: string }, vehicle: any, onRemove: (id: string) => void }) => {
    // We need to fetch the sub-service details to check compatibility if vehicle is selected
    // Note: In a real app, we might want to batch this or cache it more effectively
    const { data } = useCarSubService(task._id);
    const subService = data?.subService;

    const isCompatible = React.useMemo(() => {
        if (!vehicle || !subService) return true; // Default to compatible if data missing

        const rules = subService.compatibility || [];
        if (rules.length === 0) return true; // No rules = all compatible

        return rules.some((rule: any) => {
            const makeMatch = rule.make.toLowerCase() === vehicle.make?.toLowerCase();
            const modelMatch = !rule.model || rule.model.toLowerCase() === vehicle.model?.toLowerCase(); // Empty model means all models
            const variantMatch = !rule.variant || rule.variant.toLowerCase() === vehicle.variant?.toLowerCase(); // Empty variant means all variants

            return makeMatch && modelMatch && variantMatch;
        });
    }, [vehicle, subService]);

    return (
        <div className="flex flex-col border-b border-gray-100 last:border-0 pb-3 last:pb-0">
            <div className="flex justify-between items-start group">
                <span className="text-sm text-gray-700 flex-1 pr-2">{task.name}</span>
                <button
                    onClick={() => onRemove(task._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
            {!isCompatible && vehicle && (
                <div className="mt-1 flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-xs text-red-500 font-medium">
                        <AlertCircle className="w-3 h-3" />
                        <span>Not available for your {vehicle.make}</span>
                    </div>
                    <Link href="/book-service" className="text-[10px] text-blue-500 hover:underline pl-4">
                        View other services
                    </Link>
                </div>
            )}
        </div>
    );
};

const QuoteSidebar = ({ showGetQuotes = true }: QuoteSidebarProps) => {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const quoteId = params.quoteId as string;

    const { tasks, removeTask, vehicle } = useQuoteStore();

    const handleGetQuotes = () => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('step', 'customer-notes-for-mechanic');
        router.push(`/quote/${quoteId}?${newSearchParams.toString()}`);
    };

    const handleChangeCar = () => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('step', 'task-select');
        router.push(`/quote/${quoteId}?${newSearchParams.toString()}`);
    };

    return (
        <div className="w-full lg:w-[320px] shrink-0">
            {/* Car Details Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-3">
                        <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center">
                            <Car className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <div className="text-gray-500 text-xs">{vehicle?.id || '482'}</div>
                            <div className="font-bold text-gray-900">{vehicle?.name || 'Ford Fiesta'}</div>
                            <div className="text-xs text-gray-500 mt-1">Representation only.</div>
                        </div>
                    </div>
                    <button
                        onClick={handleChangeCar}
                        className="text-xs font-medium text-gray-500 border border-gray-300 rounded px-2 py-1 hover:bg-gray-50"
                    >
                        Change
                    </button>
                </div>
                <div className="text-xs text-gray-500 border-t border-gray-100 pt-2 mt-2">
                    {vehicle?.details || '2012 Petrol Automatic 1.6 Litres Ti-VCT'}
                </div>
            </div>

            {/* Cart Summary */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">Your items</h3>
                    {tasks.length > 0 && (
                        <button
                            onClick={handleChangeCar}
                            className="text-xs font-medium text-[#00D09C] hover:underline"
                        >
                            Edit
                        </button>
                    )}
                </div>

                {tasks.length === 0 ? (
                    <p className="text-gray-500 text-sm mb-6">
                        Your cart is empty. Please add an item to get a quote.
                    </p>
                ) : (
                    <div className="space-y-4 mb-6">
                        {tasks.map((task, index) => (
                            <CartItem
                                key={`${task._id}-${index}`}
                                task={task}
                                vehicle={vehicle}
                                onRemove={removeTask}
                            />
                        ))}
                    </div>
                )}

                {showGetQuotes && (
                    <button
                        onClick={handleGetQuotes}
                        disabled={tasks.length === 0}
                        className="w-full bg-[#00D09C] text-white font-bold py-3 px-4 rounded hover:bg-[#00b88a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Get quotes
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuoteSidebar;
