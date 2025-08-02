import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; 

export default function Income() {
    const { hasIncome, incomeAmount, latestRecords } = usePage().props;

    const today = new Date().toLocaleDateString('en-MY', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Kuala_Lumpur'
    });

    const { data, setData, post, processing, errors } = useForm({
        income: '',
    });

    const [showIncome, setShowIncome] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('income.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Income" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg flex justify-between items-center">
                            <span>My Income - {today}</span>
                            {hasIncome && (
                                <PrimaryButton type="button" onClick={() => router.visit('/revenue')}>
                                    Revenue Details
                                </PrimaryButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {!hasIncome ? (
                <div className="py-2">
                    <div className="mx-auto max-w-2xl sm:px-6 lg:px-2">
                        <div className="overflow-hidden mb-5 bg-white shadow-md sm:rounded-lg">
                            <div className="p-3 text-gray-900 font-bold">
                                <div className="flex flex-wrap justify-center">
                                    <form onSubmit={handleSubmit}>
                                        <div className="p-6 text-gray-900 font-bold text-lg mb-3">
                                            Do you want to submit your income?
                                        </div>
                                        <InputLabel htmlFor="income" value="My Income (RM)" />
                                        <TextInput
                                            id="income"
                                            type="number"
                                            step="0.01"
                                            name="income"
                                            value={data.income}
                                            onChange={(e) => setData('income', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={errors.income} className="mt-2" />
                                        <div className="mt-6 flex justify-center mb-5">
                                            <PrimaryButton disabled={processing}>Submit</PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-2">
                    <div className="mx-auto max-w-4xl sm:px-6 lg:px-2">
                        <div className="overflow-hidden mb-5 bg-white shadow-md sm:rounded-lg">
                            <div className="p-6 text-gray-900 font-bold text-lg">
                                Recent Expenses Update
                            </div>
                            <div className="px-7 pb-9">
                                <table className="min-w-full rounded-xl overflow-hidden shadow-lg">
                                    <thead className="bg-black text-white">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold">Amount (RM)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gray-100 divide-y divide-gray-300">
                                        {latestRecords && latestRecords.length > 0 ? (
                                            latestRecords.map((record, index) => (
                                                <tr key={index} className="hover:bg-gray-200">
                                                    <td className="px-6 py-4 text-sm text-black font-semibold">{record.date}</td>
                                                    <td className="px-6 py-4 text-sm text-black font-semibold">{record.name}</td>
                                                    <td className="px-6 py-4 text-sm text-black font-semibold">{record.total_price}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                                                    No recent expenses found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mb-5">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg flex justify-between items-center">
                            <span>Total Income:</span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowIncome(!showIncome)}
                                    className="focus:outline-none"
                                >
                                    {showIncome ? (
                                        <Eye className="h-5 w-5 text-gray-600" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-gray-600" />
                                    )}
                                </button>
                                <span>
                                    {showIncome
                                        ? `RM ${Number(incomeAmount).toFixed(2)}`
                                        : 'RM 0.00'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
