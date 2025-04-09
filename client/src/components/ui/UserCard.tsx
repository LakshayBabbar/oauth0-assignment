import Image from 'next/image';
import React from 'react'

export interface UserCardProps {
    picture: string;
    name: string;
    email: string;
    user_id: string;
}

const UserCard = ({ data }: { data: UserCardProps }) => {
    const userImage = data?.picture?.includes("gravatar") ? "/user.webp" : data?.picture;
    return (
        <div className='w-96 bg-slate-50 shadow-md rounded-lg p-4 space-y-4'>
            <div className='flex gap-4 place-items-center'>
                <Image src={userImage} width={50} height={50} alt={data?.name + " Profile Pic"} className='min-w-14 max-h-14 rounded-full overflow-hidden' />
                <div>
                    <p className='font-semibold'>{data?.name}</p>
                    <p>{data?.email}</p>
                </div>
            </div>
            <hr />
            <p className='mt-2 text-sm'><span className='font-bold'>UID:</span> {data?.user_id}</p>
        </div>
    )
}

export default UserCard;