import React, { ReactNode } from 'react'
import SideNav from '../../components/admin/SideNav'

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className='flex w-full h-[100vh] overflow-y-hidden'>
            <SideNav />
            <div className="w-[80%] pl-8 py-8 pr-[5%] bg-gray-100">{children}</div>
        </div>
    )
}

export default AdminLayout
