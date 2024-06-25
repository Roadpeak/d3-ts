import React, { useEffect, useState } from 'react';
import AdminLayout from '../../utils/layouts/AdminLayout';
import { fetchUsers } from '../../services/apiService';

const Users: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    const fetchUsersData = async () => {
      setLoading(true);
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);

    return (
        <AdminLayout>
            <div className="w-full gap-2 flex flex-col py-4">
                <div className="flex w-full justify-between items-center">
                <p className="font-medium text-[13px] text-dark tracking-wide">Users</p>
                <input type="text" placeholder='Search here' className='bg-light w-[220px] focus:border-secondary outline-none text-[11px] rounded-full py-2 px-3.5 ' />
                </div>
                <div className="w-full rounded-md mt-2 bg-white overflow-auto">
                <div className="w-full h-[80vh] overflow-y-auto rounded-lg">
                    <table className="table-auto w-full rounded-md">
                    <thead>
                        <tr className="bg-gray-100 border-b-2 border-gray-200 text-[13px] text-[#002A4D] font-medium">
                            <th className="px-4 py-3 text-start">User ID</th>
                            <th className="px-4 py-3 text-start">Name</th>
                            <th className="px-4 py-3 text-start">Email</th>
                            <th className="px-4 py-3 text-start">Phone</th>
                            <th className="px-4 py-3 text-start">User Type</th>
                            <th className="px-4 py-3 text-start">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-[12.04px] text-[#646882]">
                        {loading ? (
                        <tr>
                            <td colSpan={9} className="text-center py-4">Loading...</td>
                        </tr>
                        ) : users.length === 0 ? (
                        <tr>
                            <td colSpan={9} className="text-center py-4">No payments found.</td>
                        </tr>
                        ) : (
                        users.map((user, index) => (
                            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-100">
                                <td className="px-4 py-3">{user.id}</td>
                                <td className="px-4 py-3 uppercase">{user.first_name} {user.last_name}</td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">{user.phone}</td>
                                <td className={`px-4 py-3`}>
                                    {user.user_type}
                                </td>
                                <td className="px-4 py-3">Suspend</td>
                            </tr>
                        ))
                        )}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Users;
