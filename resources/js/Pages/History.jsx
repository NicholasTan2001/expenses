import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function History() {
    const {
        totalToday = 0,
        totalFoodsBeverages = 0,
        totalTransportation = 0,
        totalClothes = 0,
        totalOthers = 0
    } = usePage().props;

    const today = new Date().toLocaleDateString('en-MY', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Kuala_Lumpur'
    });

    return (
        <AuthenticatedLayout>
            <Head title="Expenses History" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg">
                            Expenses History - {today}
                        </div>
                    </div>
                </div>
            </div>

             <div className="py-2">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg">
                            
                        <div className="mb-2">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Select Category</label>
                            <select
                                id="category"
                                name="category"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-black focus:ring-black"
                                onChange={(e) => {
                                    const category = e.target.value;
                                    if (category) {
                                        router.get(`/history/filter/${category}`);
                                    }
                                }}
                            >
                                <option value="">Categories</option>
                                <option value="foodsbeverages">Foods & Beverages</option>
                                <option value="transportation">Transportation</option>
                                <option value="clothes">Clothes</option>
                                <option value="others">Others</option>
                            </select>
                        </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="py-2">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-md">
                        <div className="p-5 text-gray-900 font-bold text-lg">
                            <div className="flex-wrap justify-center gap-3">
                                <div className="py-4 lg:px-5">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full rounded-xl overflow-hidden shadow-lg">
                                            <thead className="bg-black text-white">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold">Expenses Types</th>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold">Expenses (RM)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-gray-100 divide-y divide-gray-300">
                                                <tr className="hover:bg-gray-200">
                                                    <td className="px-6 py-4 text-sm text-gray-800">Foods & Beverages</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {Number(totalFoodsBeverages || 0).toFixed(2)}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-gray-200">
                                                    <td className="px-6 py-4 text-sm text-gray-800">Transportation</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {Number(totalTransportation || 0).toFixed(2)}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-gray-200">
                                                    <td className="px-6 py-4 text-sm text-gray-800">Clothes</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {Number(totalClothes || 0).toFixed(2)}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-gray-200">
                                                    <td className="px-6 py-4 text-sm text-gray-800">Others</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {Number(totalOthers || 0).toFixed(2)}
                                                    </td>
                                                </tr>
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
                            <span>RM {Number(totalToday || 0).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
