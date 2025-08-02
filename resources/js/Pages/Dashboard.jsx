import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {

    const { totalToday } = usePage().props;

    const today = new Date().toLocaleDateString('en-MY', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Kuala_Lumpur'
    });

    return (
        <AuthenticatedLayout>
            <Head title="My Expenses" />

            <div className="py-12 ">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg">
                            My Expenses - {today}
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg">
                            <div className="flex flex-wrap justify-center gap-3">
                                <Link
                                    href="/foodsbeverages"
                                    className="card text-black rounded-lg m-5"
                                    style={{
                                        maxWidth: '15rem',
                                        cursor: 'pointer',
                                        transition: 'transform 0.5s ease, background-color 0.5s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#eae8e8e3';
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#ffffffff';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    <img
                                        src="/images/food.png"
                                        className="p-5"
                                        style={{
                                            borderRadius: '30px',
                                        }}
                                        alt="Food & Beverages"
                                    />

                                    <div className="text-center pb-4">
                                        Foods & Beverages
                                    </div>
                                </Link>

                                <Link
                                    href="/transportation"
                                    className="card text-black rounded-lg m-5"
                                    style={{
                                        maxWidth: '15rem',
                                        cursor: 'pointer',
                                        transition: 'transform 0.5s ease, background-color 0.5s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#eae8e8e3';
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#ffffffff';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    <img
                                        src="/images/transport.png"
                                        className="p-5"
                                        style={{
                                            borderRadius: '30px',
                                        }}
                                        alt="Transportation"
                                    />

                                    <div className="text-center pb-4">
                                        Transportation
                                    </div>
                                </Link> 

                                <Link
                                    href="/clothes"
                                    className="card text-black rounded-lg m-5"
                                    style={{
                                        maxWidth: '15rem',
                                        cursor: 'pointer',
                                        transition: 'transform 0.5s ease, background-color 0.5s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#eae8e8e3';
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#ffffffff';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    <img
                                        src="/images/cloth.png"
                                        className="p-5"
                                        style={{
                                            borderRadius: '30px',
                                        }}
                                        alt="Clothes"
                                    />

                                    <div className="text-center pb-4">
                                        Clothes
                                    </div>
                                </Link>

                                <Link
                                    href="/others"
                                    className="card text-black rounded-lg m-5"
                                    style={{
                                        maxWidth: '15rem',
                                        cursor: 'pointer',
                                        transition: 'transform 0.5s ease, background-color 0.5s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#eae8e8e3';
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#ffffffff';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    <img
                                        src="/images/other.png"
                                        className="p-5"
                                        style={{
                                            borderRadius: '30px',
                                        }}
                                        alt="Others"
                                    />

                                    <div className="text-center pb-4">
                                        Others
                                    </div>
                                </Link> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold text-lg flex justify-between items-center">
                            <span>Total Expenses (Today):</span>
                            <span>RM {Number(totalToday).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
