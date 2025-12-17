import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';
import { Search, Trash2, Ban } from 'lucide-react';

type Profile = Database['public']['Tables']['profiles']['Row'];

export default function UserManagement() {
    const [users, setUsers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setUsers(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleBan = async (userId: string) => {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm('Are you sure you want to ban this user?')) return;
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error } = await supabase
                .from('profiles')
                .update({ is_banned: true } as any)
                .eq('id', userId);

            if (error) throw error;
            fetchUsers();
        } catch (err) {
            console.error(err);
            alert('Error banning user');
        }
    };

    const filteredUsers = users.filter(user =>
        user.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">User Management</h1>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        className="w-full bg-background border border-input rounded-md pl-10 pr-3 py-2 text-sm"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                        <tr>
                            <th className="px-6 py-3">User ID</th>
                            <th className="px-6 py-3">Display Name</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center">Loading...</td></tr>
                        ) : filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-3 font-mono text-xs">{user.id.slice(0, 8)}...</td>
                                <td className="px-6 py-3 font-medium">{user.display_name || 'N/A'}</td>
                                <td className="px-6 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'advertiser' ? 'bg-purple-100 text-purple-700' :
                                            user.role === 'super_admin' ? 'bg-red-100 text-red-700' :
                                                'bg-gray-100 text-gray-700'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-3">
                                    {user.is_banned ? (
                                        <span className="text-destructive font-medium">Banned</span>
                                    ) : (
                                        <span className="text-green-600">Active</span>
                                    )}
                                </td>
                                <td className="px-6 py-3 text-right space-x-2">
                                    <button
                                        onClick={() => handleBan(user.id)}
                                        className="p-2 hover:bg-destructive/10 rounded-md text-destructive transition-colors"
                                        title="Ban User"
                                    >
                                        <Ban className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 hover:bg-muted rounded-md transition-colors" title="Delete">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
