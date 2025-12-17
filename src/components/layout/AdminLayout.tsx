import { Link, Outlet, useLocation } from 'react-router-dom';
import { Users, ShieldAlert, LogOut, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLayout() {
    const { signOut } = useAuth();
    const location = useLocation();

    const navItems = [
        { icon: BarChart, label: 'Stats', href: '/admin' },
        { icon: Users, label: 'Users', href: '/admin/users' },
        { icon: ShieldAlert, label: 'Moderation', href: '/admin/moderation' },
    ];

    return (
        <div className="min-h-screen bg-muted/20 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-border bg-destructive/5">
                    <Link to="/" className="text-xl font-bold text-destructive">
                        Luxuria Admin
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                location.pathname === item.href
                                    ? "bg-destructive/10 text-destructive"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-border">
                    <button
                        onClick={() => signOut()}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 w-full transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
