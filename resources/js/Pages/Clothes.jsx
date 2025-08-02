import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';

export default function Transportation() {
    
    const { totalToday } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        type: '',
        brand: '',
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

        post(route('clothes.store'), {
            onSuccess: () => {
                window.location.href = route('dashboard');
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Clothes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg">
                            Clothes
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
                                            <InputLabel htmlFor="types" value="Types" />
                                            <TextInput
                                                id="type"
                                                type="text"
                                                name="type"
                                                value={data.type}
                                                placeholder="Cargo Pants"
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('type', e.target.value)}
                                            />
                                            <InputError message={errors.name} className="mt-2" />
                                        </div>

                                        <div className="mb-2">
                                            <InputLabel htmlFor="brands" value="Brands" />
                                            <TextInput
                                                id="brand"
                                                type="text"
                                                name="brand"
                                                value={data.brand}
                                                placeholder="Uniqlo"
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('brand', e.target.value)}
                                            />
                                            <InputError message={errors.name} className="mt-2" />
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
                                            placeholder="Pavilion Bukit Jalil - with family ..."
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
                            <span>Total Expenses (Today) on Clothes:</span>
                            <span>RM {Number(totalToday).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}