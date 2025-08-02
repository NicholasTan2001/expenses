import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function HistoryFilter() {
    const { categoryLabel, data = [], totalExpenses = 0, overallExpenses = 0 } = usePage().props;
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const urlParams = new URLSearchParams(window.location.search);
    const isFiltered = urlParams.has('start_date') && urlParams.has('end_date');

    let firstColumnTitle = 'Name';
    let thirdColumnTitle = 'Type';

    if (categoryLabel === 'Transportation') {
        firstColumnTitle = 'Transport';
        thirdColumnTitle = 'Place';
    } else if (categoryLabel === 'Clothes') {
        firstColumnTitle = 'Type';
        thirdColumnTitle = 'Brand';
    } else if (categoryLabel === 'Others') {
        firstColumnTitle = 'Name';
        thirdColumnTitle = 'Place';
    }

    const handleFilter = (e) => {
        e.preventDefault();
        if (startDate && endDate) {
            router.get(window.location.pathname, {
                start_date: startDate,
                end_date: endDate
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Filtered Expenses" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg">
                            Expenses History - {categoryLabel}
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-2">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg">
                            <form onSubmit={handleFilter}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">From Date</label>
                                        <input type="date" id="start_date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black" required />
                                    </div>
                                    <div>
                                        <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">To Date</label>
                                        <input type="date" id="end_date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black" required />
                                    </div>
                                </div>
                                <div className="mt-5 flex justify-center">
                                    <PrimaryButton type="submit">
                                        Filter
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-md">
                        <div className="p-6 text-gray-900 font-bold text-lg">
                            <div className="flex-wrap justify-center gap-3">
                                <div className="py-4 lg:px-5">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full rounded-xl overflow-hidden shadow-lg">
                                            <thead className="bg-black text-white">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold">{firstColumnTitle}</th>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold">{thirdColumnTitle}</th>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold">Total Price (RM)</th>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold">Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-gray-100 divide-y divide-gray-300">
                                                {data.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                                            No records found.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    data.map((item, index) => (
                                                        <tr key={index} className="hover:bg-gray-200">
                                                            <td className="px-6 py-4 text-sm text-black">
                                                                {new Date(item.date).toLocaleDateString('en-MY', {
                                                                    year: 'numeric', month: 'short', day: 'numeric'
                                                                })}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-black">{item.name}</td>
                                                            <td className="px-6 py-4 text-sm text-black">{item.type}</td>
                                                            <td className="px-6 py-4 text-sm text-black">{Number(item.total_price).toFixed(2)}</td>
                                                            <td className="px-6 py-4 text-sm text-black">{item.remarks}</td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg flex justify-between items-center">
                            <span>Total Expenses:</span>
                            <span>
                                RM {Number(totalExpenses || 0).toFixed(2)}
                                {isFiltered && (
                                    <span className="text-red-600"> / RM {Number(overallExpenses).toFixed(2)}</span>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
