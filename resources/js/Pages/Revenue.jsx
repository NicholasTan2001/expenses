import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Revenue() {
    const { hasRevenue, year, month, day } = usePage().props;

    useEffect(() => {
        if (!hasRevenue) {
            router.visit('/income');
        }
    }, [hasRevenue]);

    const { data, setData, put, processing, errors } = useForm({
        year: year || '',
        month: month || '',
        day: day || '',
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route('revenue.update'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Income" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg">
                            Revenue Details
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-2">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden mb-10 bg-white shadow-md sm:rounded-lg">
                        <div className="p-7 text-gray-900 font-bold">
                            <form onSubmit={handleUpdate}>
                                <div className="flex-wrap">
                                    <div className="mb-2">
                                        <InputLabel htmlFor="year" value="Yearly Revenue" />
                                        <TextInput
                                            id="year"
                                            type="number"
                                            name="year"
                                            value={data.year}
                                            onChange={(e) => setData('year', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={errors.year} className="mt-2" />
                                    </div>

                                    <div className="mb-2 mt-5">
                                        <InputLabel htmlFor="month" value="Monthly Revenue" />
                                        <TextInput
                                            id="month"
                                            type="number"
                                            name="month"
                                            value={data.month}
                                            onChange={(e) => setData('month', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={errors.month} className="mt-2" />
                                    </div>

                                    <div className="mb-2 mt-5">
                                        <InputLabel htmlFor="day" value="Daily Revenue" />
                                        <TextInput
                                            id="day"
                                            type="number"
                                            name="day"
                                            value={data.day}
                                            onChange={(e) => setData('day', e.target.value)}
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={errors.day} className="mt-2" />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <PrimaryButton disabled={processing}>Update</PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
