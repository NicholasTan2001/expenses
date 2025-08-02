import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';

export default function Investment() {

    const { errors } = usePage().props;
    const { hasIncome, totalInvestment, investments } = usePage().props;
    const [showIncome, setShowIncome] = useState(false);
    const [showInputForm, setShowInputForm] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        amount: '',
        rates: '',
        date: '',
        duration:'',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/investment/store', {
            onSuccess: () => {
                reset();
                setShowInputForm(false);
                router.reload();
            },
        });
    };

    const handleNavigateToIncome = () => {
        router.visit('/income');
    };

    const handleToggleForm = () => {
        if (hasIncome) {
            setShowInputForm(!showInputForm);
        }
    };

    const handleDelete = (id) => {
        if (confirm('Warning: Are you sure you want to delete this investment?')) {
            router.delete(route('investment.destroy', { id }));
        }
    };


    const handleReceive = (investment) => {
        const amountToReceive = prompt(`Enter amount to receive (max RM ${investment.amount}):`);
        if (amountToReceive === null) return; // Cancelled prompt

        const parsedAmount = parseFloat(amountToReceive);

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            alert('Please enter a valid positive number.');
            return;
        }

        if (parsedAmount > investment.amount) {
            alert('Error: The amount exceeds your available investment.');
            return;
        }

        // Send to backend (you need to create the route & controller)
        router.post(route('investment.receive', { id: investment.id }), { amount: parsedAmount });
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Investment" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg">My Investment</div>
                    </div>
                </div>
            </div>

            <div className="py-2">
                <div className="mx-auto max-w-2xl sm:px-5 lg:px-2">
                    <div
                        className={`overflow-hidden mb-5 bg-white shadow-md sm:rounded-lg transition-transform duration-500 ease-in-out ${hasIncome ? 'hover:scale-105 hover:bg-gray-300' : ''}`}
                        style={{ cursor: hasIncome ? 'pointer' : 'default' }}
                        onClick={handleToggleForm}
                    >
                        <div className="p-3 text-gray-900 font-bold text-center">
                            {hasIncome ? (
                                <p className="text-lg">+</p>
                            ) : (
                                <>
                                    <p className="mb-8">You need to submit your income first ...</p>
                                    <PrimaryButton onClick={handleNavigateToIncome}>
                                        Go to My Income
                                    </PrimaryButton>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showInputForm && (
                <form onSubmit={handleSubmit}>
                    <div className="py-1">
                        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8 mb-5">
                            <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                                <div className="p-6 text-gray-900 font-bold">
                                    <div className="mb-2 grid md:grid-cols-4 gap-5">
                                        <div>
                                            <InputLabel htmlFor="name" value="Name" />
                                            <TextInput
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Touch N Go"
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.name} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="amount" value="Total Amount (RM)" />
                                            <TextInput
                                                id="amount"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                name="amount"
                                                value={data.amount}
                                                onChange={(e) => setData('amount', e.target.value)}
                                                placeholder="5000.00"
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.amount} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="rates" value="Total Rates (%)" />
                                            <TextInput
                                                id="rates"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                name="rates"
                                                value={data.rates}
                                                onChange={(e) => setData('rates', e.target.value)}
                                                placeholder="6.90"
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.rates} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="duration" value="Duration (days)" />
                                            <TextInput
                                                id="duration"
                                                type="number"
                                                step="1"
                                                min="1"
                                                name="duration"
                                                value={data.duration}
                                                onChange={(e) => setData('duration', e.target.value)}
                                                placeholder="365"
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.duration} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <InputLabel htmlFor="date" value="Date" />
                                        <TextInput
                                            id="date"
                                            type="date"
                                            name="date"
                                            value={data.date}
                                            onChange={(e) => setData('date', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={errors.date} className="mt-2" />
                                    </div>

                                    <div className="mt-6 flex justify-center">
                                        <PrimaryButton disabled={processing}>Submit</PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}

                {investments.length > 0 && investments.map((investment) => (
                    <div key={investment.id} className="py-8">
                        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                            <div className="overflow-hidden bg-white shadow-md sm:rounded-lg p-5 flex flex-col">
                                <div className="font-bold mb-3 text-red-500">
                                    * The update only for once per day only. 
                                </div>
                                <table className="min-w-full shadow-md sm:rounded-lg overflow-hidden">
                                    <thead className="bg-black text-white">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold">Amount (RM)</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold">Rates (%)</th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold">Duration (days)</th>

                                        </tr>
                                    </thead>
                                    <tbody className="bg-gray-100 divide-y divide-gray-300">
                                        <tr className="hover:bg-gray-200">
                                            <td className="px-6 py-4 text-sm text-black font-semibold">{investment.date}</td>
                                            <td className="px-6 py-4 text-sm text-black font-semibold">{investment.name}</td>
                                            <td className="px-6 py-4 text-sm text-black font-semibold">{investment.amount}</td>
                                            <td className="px-6 py-4 text-sm text-black font-semibold">{investment.rates}</td>
                                            <td className="px-6 py-4 text-sm text-black font-semibold">{investment.duration}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="mt-4 flex justify-between">

                                    <PrimaryButton onClick={() => handleReceive(investment)}>
                                        Receive
                                    </PrimaryButton>

                                    <DangerButton onClick={() => handleDelete(investment.id)}>
                                        Delete
                                    </DangerButton>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-2">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900 font-bold text-lg flex justify-between items-center">
                            <span>Total Investment:</span>
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
                                    {showIncome ? `RM ${Number(totalInvestment).toFixed(2)}` : 'RM 0.00'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
