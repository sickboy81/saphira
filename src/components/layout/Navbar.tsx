import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show if at top or scrolling up
            if (currentScrollY < 10) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }

            setIsScrolled(currentScrollY > 0);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 border-b border-transparent",
                isScrolled ? "bg-background/80 backdrop-blur-md border-border" : "bg-transparent",
                isVisible ? "translate-y-0" : "-translate-y-full"
            )}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                    Luxuria
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 hover:shadow-primary/40">
                        Publicar Anúncio
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <Link to="/favorites" className="p-2 hover:bg-accent rounded-full transition-colors relative group">
                        <Heart className="w-5 h-5 group-hover:fill-current transition-colors" />
                    </Link>
                    <Link to="/login" className="p-2 hover:bg-accent rounded-full transition-colors">
                        <User className="w-5 h-5" />
                    </Link>
                    <button className="md:hidden p-2 hover:bg-accent rounded-full transition-colors">
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
