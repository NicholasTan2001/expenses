import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';

export default function ModificationUpdate() {
    const { category, record, id } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        ...record,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('modification.update', { category, id }), {
            onSuccess: () => {
                window.location.href = route('dashboard');
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Update Expenses" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg">
                            Update Expenses
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-2">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg mb-10">
                        <div className="p-5 text-gray-900 font-bold">
                            <div className="flex flex-wrap justify-center">
                                <form onSubmit={submit}>                                  
                                    <div className="mb-2">
                                        <InputLabel htmlFor="date" value="Date" />
                                        <TextInput
                                          id="date"
                                            type="date"
                                            name="date"
                                            value={data.date}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('date', e.target.value)}
                                        />
                                        <InputError message={errors.date} className="mt-2" />
                                    </div>

                                    <div className="flex flex-wrap gap-5">

                                        {category === 'foodsbeverages' && (
                                            <>
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
                                            </>
                                        )}

                                        {category === 'transportation' && (
                                            <>
                                                <div className="mb-2">
                                                    <InputLabel htmlFor="transport" value="Transport" />
                                                    <TextInput
                                                        id="transport"
                                                        type="text"
                                                        name="transport"
                                                        value={data.transport}
                                                        placeholder="GrabCar"
                                                        className="mt-1 block w-full"
                                                        onChange={(e) => setData('transport', e.target.value)}
                                                    />
                                                    <InputError message={errors.transport} className="mt-2" />
                                                </div>
                                                <div className="mb-2">
                                                    <InputLabel htmlFor="place" value="Place" />
                                                    <TextInput
                                                        id="place"
                                                        type="text"
                                                        name="place"
                                                        value={data.place}
                                                        placeholder="Serdang"
                                                        className="mt-1 block w-full"
                                                        onChange={(e) => setData('place', e.target.value)}
                                                    />
                                                    <InputError message={errors.place} className="mt-2" />
                                                </div>
                                            </>
                                        )}

                                        {category === 'clothes' && (
                                            <>
                                                <div className="mb-2">
                                                    <InputLabel htmlFor="type" value="Clothes Type" />
                                                    <TextInput
                                                        id="type"
                                                        type="text"
                                                        name="type"
                                                        value={data.type}
                                                        placeholder="T-Shirt"
                                                        className="mt-1 block w-full"
                                                        onChange={(e) => setData('type', e.target.value)}
                                                    />
                                                    <InputError message={errors.type} className="mt-2" />
                                                </div>
                                                <div className="mb-2">
                                                    <InputLabel htmlFor="brand" value="Brand" />
                                                    <TextInput
                                                        id="brand"
                                                        type="text"
                                                        name="brand"
                                                        value={data.brand}
                                                        placeholder="Uniqlo"
                                                        className="mt-1 block w-full"
                                                        onChange={(e) => setData('brand', e.target.value)}
                                                    />
                                                    <InputError message={errors.brand} className="mt-2" />
                                                </div>
                                            </>
                                        )}

                                        {category === 'others' && (
                                            <>
                                                <div className="mb-2">
                                                    <InputLabel htmlFor="name" value="Name" />
                                                    <TextInput
                                                        id="name"
                                                        type="text"
                                                        name="name"
                                                        value={data.name}
                                                        placeholder="Gift Box"
                                                        className="mt-1 block w-full"
                                                        onChange={(e) => setData('name', e.target.value)}
                                                    />
                                                    <InputError message={errors.name} className="mt-2" />
                                                </div>
                                                <div className="mb-2">
                                                    <InputLabel htmlFor="place" value="Place" />
                                                    <TextInput
                                                        id="place"
                                                        type="text"
                                                        name="place"
                                                        value={data.place}
                                                        placeholder="Watsons"
                                                        className="mt-1 block w-full"
                                                        onChange={(e) => setData('place', e.target.value)}
                                                    />
                                                    <InputError message={errors.place} className="mt-2" />
                                                </div>
                                            </>
                                        )}

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
                                            placeholder="..."
                                            className="mt-1 block w-full shadow-md rounded-md border-gray-300 focus:border-black focus:ring-black resize-y"
                                            onChange={(e) => setData('remarks', e.target.value)}
                                        />
                                        <InputError message={errors.remarks} className="mt-2" />
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <PrimaryButton disabled={processing}>Update</PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
