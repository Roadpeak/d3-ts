import React, { ReactNode } from 'react'
import SideNav from '../../components/admin/SideNav'

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className='flex w-full'>
            <SideNav />
            <div className="w-[82%] bg-[#131415]">{children}</div>
        </div>
    )
}

export default AdminLayout
