import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import DangerButton from '@/Components/DangerButton';
import { router } from '@inertiajs/react';

export default function Modification() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategory2, setSelectedCategory2] = useState('');
    const [selectedCategory3, setSelectedCategory3] = useState('');
    const [filterDate, setFilterDate] = useState('');

    const page = usePage();
    const allData = page.props.allData || {};

    let firstColumnTitle = 'Name';
    let thirdColumnTitle = 'Type';

    if (selectedCategory2 === 'transportation') {
        firstColumnTitle = 'Transport';
        thirdColumnTitle = 'Place';
    } else if (selectedCategory2 === 'clothes') {
        firstColumnTitle = 'Type';
        thirdColumnTitle = 'Brand';
    } else if (selectedCategory2 === 'others') {
        firstColumnTitle = 'Name';
        thirdColumnTitle = 'Place';
    }

    let firstColumnTitle1 = 'Name';
    let thirdColumnTitle1 = 'Type';

    if (selectedCategory3 === 'transportation') {
        firstColumnTitle = 'Transport';
        thirdColumnTitle = 'Place';
    } else if (selectedCategory3 === 'clothes') {
        firstColumnTitle = 'Type';
        thirdColumnTitle = 'Brand';
    } else if (selectedCategory3 === 'others') {
        firstColumnTitle = 'Name';
        thirdColumnTitle = 'Place';
    }

    const { data, setData, post, processing, errors } = useForm({
        date: '',
        name: '',
        type: '',
        transport: '',
        place: '',
        brand: '',
        total_price: '',
        remarks: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCategory === 'transportation') {
            post(route('modification.store.transportation'));
        } else if (selectedCategory === 'foodsbeverages') {
            post(route('modification.store.foodsbeverages'));
        } else if (selectedCategory === 'clothes') {
            post(route('modification.store.clothes'));
        } else if (selectedCategory === 'others') {
            post(route('modification.store.others'));
        }
    };

    const renderTableRows = (records, category) => {
        const filteredRecords = filterDate
            ? records.filter((item) =>
                new Date(item.date).toISOString().split('T')[0] === filterDate
            )
            : records;

        return filteredRecords.length > 0 ? (
            filteredRecords.map((item, index) => (
                <tr key={index} className="hover:bg-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(item.date).toLocaleDateString('en-MY', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                        {category === 'transportation' ? item.transport : item.name || item.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                        {item.place || item.brand || item.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                        {Number(item.total_price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                        {item.remarks}
                    </td>
                    <td className="px-6 py-4 text-sm">
                        <DangerButton onClick={() => handleDelete(category, item.id)}>
                            Delete
                        </DangerButton>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="6" className="text-center text-sm text-gray-500 py-4">
                    No records found.
                </td>
            </tr>
        );
    };


    const renderTable = (category) => (
        <table className="min-w-full rounded-xl overflow-hidden shadow-lg mb-5">
            <thead className="bg-black text-white">
                <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">{firstColumnTitle}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">{thirdColumnTitle}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Total Price (RM)</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Remarks</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Delete Selection</th>
                </tr>
            </thead>
            <tbody className="bg-gray-100 divide-y divide-gray-300">
                {renderTableRows(allData[category] || [], category)}
            </tbody>
        </table>
    );

    const handleDelete = (category, id) => {
        if (confirm('Warning: Are you sure you want to delete this expenses ?')) {
            router.delete(route('modification.destroy', { category: category, id: id }));
        }
    };

    const renderTableRows1 = (records, category) => {
        const filteredRecords = filterDate
            ? records.filter((item) =>
                new Date(item.date).toISOString().split('T')[0] === filterDate
            )
            : records;

        return filteredRecords.length > 0 ? (
            filteredRecords.map((item, index) => (
                <tr key={index} className="hover:bg-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(item.date).toLocaleDateString('en-MY', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                        {category === 'transportation' ? item.transport : item.name || item.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                        {item.place || item.brand || item.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                        {Number(item.total_price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                        {item.remarks}
                    </td>
                    <td className="px-6 py-4 text-sm">
                        <PrimaryButton
                            onClick={() =>
                                router.get(route('modification.edit', { category, id: item.id }), {
                                    record: item,
                                })
                            }
                        >
                            Update
                    </PrimaryButton>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="6" className="text-center text-sm text-gray-500 py-4">
                    No records found.
                </td>
            </tr>
        );
    };

    const renderTable1 = (category) => (
        <table className="min-w-full rounded-xl overflow-hidden shadow-lg mb-5">
            <thead className="bg-black text-white">
                <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">{firstColumnTitle1}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">{thirdColumnTitle1}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Total Price (RM)</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Remarks</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Update Selection</th>
                </tr>
            </thead>
            <tbody className="bg-gray-100 divide-y divide-gray-300">
                {renderTableRows1(allData[category] || [], category)}
            </tbody>
        </table>
    );

    return (
        <AuthenticatedLayout>
            <Head title="Expenses Modification" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg">Expenses Modification</div>
                    </div>
                </div>
            </div>

            <div className="py-2">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8 mb-3">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg mb-2">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Store New Expenses</label>
                            <select
                                id="category"
                                name="category"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-black focus:ring-black"
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                value={selectedCategory}
                            >
                                <option value="">Select Category</option>
                                <option value="foodsbeverages">Foods & Beverages</option>
                                <option value="transportation">Transportation</option>
                                <option value="clothes">Clothes</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {selectedCategory && (
                <div className="py-6">
                    <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden mb-6 bg-white shadow-md sm:rounded-lg">
                            <div className="p-5 text-gray-900 font-bold">
                                 <div className="flex flex-wrap justify-center">
                                    <form onSubmit={handleSubmit}>
                                        {/* Date */}
                                        <div>
                                            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Select Date</label>
                                            <input
                                                type="date"
                                                id="start_date"
                                                value={data.date}
                                                onChange={(e) => setData('date', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black mb-6"
                                                required
                                            />
                                        </div>

                                        {/* Transportation */}
                                        {selectedCategory === 'transportation' && (
                                            <>
                                                <div className="flex flex-wrap gap-5">
                                                    <div className="mb-2 items-center">
                                                        <InputLabel htmlFor="transport" value="Transport" />
                                                        <TextInput id="transport" type="text" value={data.transport}
                                                            onChange={(e) => setData('transport', e.target.value)}
                                                            placeholder="Car"
                                                            className="mt-1 block w-full" />
                                                        <InputError message={errors.transport} className="text-red-500 text-sm mt-1" />
                                                    </div>
                                                    <div className="mb-2 items-center">
                                                        <InputLabel htmlFor="place" value="Place" />
                                                        <TextInput id="place" type="text" value={data.place}
                                                            onChange={(e) => setData('place', e.target.value)}
                                                            placeholder="KFC, Jade Hill"
                                                            className="mt-1 block w-full" />
                                                        <InputError message={errors.place} className="text-red-500 text-sm mt-1" />
                                                    </div>
                                                    <div className="mb-2 items-center">
                                                        <InputLabel htmlFor="total_price" value="Total Price (RM)" />
                                                        <TextInput id="total_price" type="number" step="0.01" min="0"
                                                            value={data.total_price}
                                                            onChange={(e) => setData('total_price', e.target.value)}
                                                            placeholder="10.00"
                                                            className="mt-1 block w-full" />
                                                        <InputError message={errors.total_price} className="text-red-500 text-sm mt-1" />
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <InputLabel htmlFor="remarks" value="Remarks" />
                                                    <textarea id="remarks" name="remarks" rows="7"
                                                        value={data.remarks}
                                                        onChange={(e) => setData('remarks', e.target.value)}
                                                        placeholder="Fill Oil ..."
                                                        className="mt-1 block w-full shadow-md rounded-md border-gray-300 focus:border-black focus:ring-black resize-y"
                                                    />
                                                    <InputError message={errors.remarks} className="text-red-500 text-sm mt-1" />
                                                </div>
                                            </>
                                        )}

                                        {/* Clothes */}
                                        {selectedCategory === 'clothes' && (
                                            <>
                                                <div className="flex flex-wrap gap-5">
                                                    <div className="mb-2">
                                                        <InputLabel htmlFor="type" value="Clothes Type" />
                                                        <TextInput id="type" type="text" value={data.type}
                                                            onChange={(e) => setData('type', e.target.value)}
                                                            placeholder="Cargo Pants"
                                                            className="mt-1 block w-full" />
                                                        <InputError message={errors.type} className="text-red-500 text-sm mt-1" />
                                                    </div>
                                                    <div className="mb-2">
                                                        <InputLabel htmlFor="brand" value="Brand" />
                                                        <TextInput id="brand" type="text" value={data.brand}
                                                            onChange={(e) => setData('brand', e.target.value)}
                                                            placeholder="Uniqlo"
                                                            className="mt-1 block w-full" />
                                                        <InputError message={errors.brand} className="text-red-500 text-sm mt-1" />
                                                    </div>
                                                    <div className="mb-2">
                                                        <InputLabel htmlFor="total_price" value="Total Price (RM)" />
                                                        <TextInput id="total_price" type="number" step="0.01" min="0"
                                                            value={data.total_price}
                                                            onChange={(e) => setData('total_price', e.target.value)}
                                                            placeholder="10.00"
                                                            className="mt-1 block w-full" />
                                                        <InputError message={errors.total_price} className="text-red-500 text-sm mt-1" />
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <InputLabel htmlFor="remarks" value="Remarks" />
                                                    <textarea id="remarks" name="remarks" rows="7"
                                                        value={data.remarks}
                                                        onChange={(e) => setData('remarks', e.target.value)}
                                                        placeholder="Bought at Pavilion with friends..."
                                                        className="mt-1 block w-full shadow-md rounded-md border-gray-300 focus:border-black focus:ring-black resize-y"
                                                    />
                                                    <InputError message={errors.remarks} className="text-red-500 text-sm mt-1" />
                                                </div>
                                            </>
                                        )}

                                        {/* Others */}
                                        {selectedCategory === 'others' && (
                                            <>
                                                <div className="flex flex-wrap gap-5">
                                                    <div className="mb-2">
                                                        <InputLabel htmlFor="name" value="Name" />
                                                        <TextInput id="name" type="text" value={data.name}
                                                            onChange={(e) => setData('name', e.target.value)}
                                                            placeholder="Racket, Labubu ..."
                                                            className="mt-1 block w-full" />
                                                        <InputError message={errors.name} className="text-red-500 text-sm mt-1" />
                                                    </div>
                                                    <div className="mb-2">
                                                        <InputLabel htmlFor="place" value="Place" />
                                                        <TextInput id="place" type="text" value={data.place}
                                                            onChange={(e) => setData('place', e.target.value)}
                                                            placeholder="Pop Mat, GSC ..."
                                                            className="mt-1 block w-full" />
                                                        <InputError message={errors.place} className="text-red-500 text-sm mt-1" />
                                                    </div>
                                                    <div className="mb-2">
                                                        <InputLabel htmlFor="total_price" value="Total Price (RM)" />
                                                        <TextInput id="total_price" type="number" step="0.01" min="0"
                                                            value={data.total_price}
                                                            onChange={(e) => setData('total_price', e.target.value)}
                                                            placeholder="10.00"
                                                            className="mt-1 block w-full" />
                                                        <InputError message={errors.total_price} className="text-red-500 text-sm mt-1" />
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <InputLabel htmlFor="remarks" value="Remarks" />
                                                    <textarea id="remarks" name="remarks" rows="7"
                                                        value={data.remarks}
                                                        onChange={(e) => setData('remarks', e.target.value)}
                                                        placeholder="3 Labubu, 1 Movie Ticket ..."
                                                        className="mt-1 block w-full shadow-md rounded-md border-gray-300 focus:border-black focus:ring-black resize-y"
                                                    />
                                                    <InputError message={errors.remarks} className="text-red-500 text-sm mt-1" />
                                                </div>
                                            </>
                                        )}

                                        {/* Foods & Beverages */}
                                        {selectedCategory === 'foodsbeverages' && (
                                            <>
                                                <div className="flex flex-wrap gap-5">
                                                    <div className="mb-2">
                                                        <InputLabel htmlFor="name" value="Name" />
                                                        <TextInput id="name" type="text" value={data.name}
                                                            onChange={(e) => setData('name', e.target.value)}
                                                            placeholder="Ayam Goreng"
                                                            className="mt-1 block w-full" />
                                                        <InputError message={errors.name} className="text-red-500 text-sm mt-1" />
                                                    </div>
                                                    <div className="mb-2">
                                                        <InputLabel htmlFor="type" value="Types" />
                                                        <select id="type" value={data.type}
                                                            onChange={(e) => setData('type', e.target.value)}
                                                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-black focus:ring-black shadow-md"
                                                        >
                                                            <option value="">Select Types</option>
                                                            <option value="Foods">Foods</option>
                                                            <option value="Beverages">Beverages</option>
                                                        </select>
                                                        <InputError message={errors.type} className="text-red-500 text-sm mt-1" />
                                                    </div>
                                                    <div className="mb-2">
                                                        <InputLabel htmlFor="total_price" value="Total Price (RM)" />
                                                        <TextInput id="total_price" type="number" step="0.01" min="0"
                                                            value={data.total_price}
                                                            onChange={(e) => setData('total_price', e.target.value)}
                                                            placeholder="10.00"
                                                            className="mt-1 block w-full" />
                                                        <InputError message={errors.total_price} className="text-red-500 text-sm mt-1" />
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <InputLabel htmlFor="remarks" value="Remarks" />
                                                    <textarea id="remarks" name="remarks" rows="7"
                                                        value={data.remarks}
                                                        onChange={(e) => setData('remarks', e.target.value)}
                                                        placeholder="MCD Seri Serdang ..."
                                                        className="mt-1 block w-full shadow-md rounded-md border-gray-300 focus:border-black focus:ring-black resize-y"
                                                    />
                                                    <InputError message={errors.remarks} className="text-red-500 text-sm mt-1" />
                                                </div>
                                            </>
                                        )}

                                        <div className="mt-6 flex justify-end">
                                            <PrimaryButton disabled={processing}>Submit</PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            )}

            <div className="py-2">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8 mb-3">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg mb-3">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Update Expenses</label>
                            <select
                                id="category"
                                name="category"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-black focus:ring-black"
                                onChange={(e) => setSelectedCategory3(e.target.value)}
                                value={selectedCategory3}
                            >
                                <option value="">Select Category</option>
                                <option value="foodsbeverages">Foods & Beverages</option>
                                <option value="transportation">Transportation</option>
                                <option value="clothes">Clothes</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {selectedCategory3 && (
                <div className="py-6">
                    <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden mb-6 bg-white shadow-md sm:rounded-lg">
                            <div className="p-5 text-gray-900 font-bold">
                                <div className="justify-center">

                                    <div className="flex flex-wrap">
                                        <label htmlFor="start_date" className="text-sm font-medium text-gray-700">Select Date</label>
                                        <input
                                            type="date"
                                            id="filter_date"
                                            value={filterDate}
                                            onChange={(e) => setFilterDate(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black mb-7"
                                        />
                                    </div>

                                    {renderTable1(selectedCategory3)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="py-2">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8 mb-3">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg mb-2">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Delete Expenses</label>
                            <select
                                id="category"
                                name="category"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-black focus:ring-black"
                                onChange={(e) => setSelectedCategory2(e.target.value)}
                                value={selectedCategory2}
                            >
                                <option value="">Select Category</option>
                                <option value="foodsbeverages">Foods & Beverages</option>
                                <option value="transportation">Transportation</option>
                                <option value="clothes">Clothes</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {selectedCategory2 && (
                <div className="py-6">
                    <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden mb-8 bg-white shadow-md sm:rounded-lg">
                            <div className="p-5 text-gray-900 font-bold">
                                <div className="justify-center">

                                    <div className="flex flex-wrap">
                                        <label htmlFor="start_date" className="text-sm font-medium text-gray-700">Select Date</label>
                                        <input
                                            type="date"
                                            id="filter_date"
                                            value={filterDate}
                                            onChange={(e) => setFilterDate(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black mb-7"
                                        />
                                    </div>

                                    {renderTable(selectedCategory2)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
        </AuthenticatedLayout>
    );
}
