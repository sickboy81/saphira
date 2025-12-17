import React from 'react';
import { BarChart, Eye, MessageSquare, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Overview() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Views', value: '2,453', icon: Eye, change: '+12%' },
                    { label: 'Messages', value: '18', icon: MessageSquare, change: '+4%' },
                    { label: 'Profile Clicks', value: '453', icon: TrendingUp, change: '+8%' },
                    { label: 'Rating', value: '4.9', icon: BarChart, change: '0%' },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card border border-border p-6 rounded-xl shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b last:border-0 border-border">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                                <div>
                                    <p className="font-medium">New Message Received</p>
                                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                                </div>
                            </div>
                            <button className="text-sm text-primary hover:underline">View</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
