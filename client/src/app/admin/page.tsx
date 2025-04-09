import React from 'react'
import { checkIsAdmin, createAccessToken } from '../actions'
import { redirect } from "next/navigation";
import UserCard, { UserCardProps } from '@/components/ui/UserCard';

const getAllUsers = async () => {
    try {
        const token = await createAccessToken();
        const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        return { error: error.message }
    }
};

const AdminPage = async () => {
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) {
        return redirect("/unauthorized");
    }
    const users = await getAllUsers();
    if (users.error) {
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-3xl font-light'>Something went Wrong!</h1>
            </div>
        )
    }
    return (
        <main className='place-items-center space-y-10'>
            <div>
                <h1 className='text-center text-5xl font-bold mt-20 bg-clip-text text-transparent bg-gradient-to-r py-2 from-slate-950 to-slate-600 drop-shadow-2xl'>User Management</h1>
                <p className='text-center text-lg font-light'>Manage your users from here</p>
            </div>
            <hr className='w-4/5' />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-4/5'>
                {users?.map((user: UserCardProps) => {
                    return (<UserCard key={user.user_id} data={user} />)
                })}
            </div>
        </main>
    )
}

export default AdminPage;