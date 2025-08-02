import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';

export default function FoodsBeverages() {

    const { totalToday } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: '',
        total_price: '',
        remarks: '',
        date: new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Kuala_Lumpur',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(new Date()),
    });

    const submit = (e) => {
        e.preventDefault();
         post(route('foodsbeverages.store'), {
            onSuccess: () => {
                window.location.href = route('dashboard');
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Foods & Beverages" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg">
                            Foods & Beverages
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-2">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden mb-10 bg-white shadow-md sm:rounded-lg">
                        <div className="p-5 text-gray-900 font-bold">
                            <div className="flex flex-wrap justify-center">
                                <form onSubmit={submit}>
                                    <div className="flex flex-wrap gap-5">
                                        <div className="mb-2">
                                            <InputLabel htmlFor="name" value="Name" />
                                            <TextInput
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                placeholder="Ayam Goreng"
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('name', e.target.value)}
                                            />
                                            <InputError message={errors.name} className="mt-2" />
                                        </div>

                                        <div className="mb-2">
                                            <InputLabel htmlFor="type" value="Types" />
                                            <select
                                                id="type"
                                                name="type"
                                                value={data.type}
                                                onChange={(e) => setData('type', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 focus:border-black focus:ring-black shadow-md"
                                            >
                                                <option value="">Select Types</option>
                                                <option value="Foods">Foods</option>
                                                <option value="Beverages">Beverages</option>
                                            </select>
                                            <InputError message={errors.type} className="mt-2" />
                                        </div>

                                        <div className="mb-2">
                                            <InputLabel htmlFor="total_price" value="Total Price (RM)" />
                                            <TextInput
                                                id="total_price"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                name="total_price"
                                                value={data.total_price}
                                                placeholder="10.00"
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('total_price', e.target.value)}
                                            />
                                            <InputError message={errors.total_price} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel htmlFor="remarks" value="Remarks" />
                                        <textarea
                                            id="remarks"
                                            name="remarks"
                                            rows="7"
                                            value={data.remarks}
                                            placeholder="MCD Seri Serdang ..."
                                            className="mt-1 block w-full shadow-md rounded-md border-gray-300 focus:border-black focus:ring-black resize-y"
                                            onChange={(e) => setData('remarks', e.target.value)}
                                        />
                                        <InputError message={errors.remarks} className="mt-2" />
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <PrimaryButton disabled={processing}>Submit</PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="py-2">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8 mb-9">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg flex justify-between items-center">
                            <span>Total Expenses (Today) on Foods & Beverages:</span>
                            <span>RM {Number(totalToday).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
