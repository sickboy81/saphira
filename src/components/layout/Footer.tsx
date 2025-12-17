import React from 'react';

export function Footer() {
    return (
        <footer className="bg-muted/30 py-12 border-t border-border mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                            Luxuria
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Wait less, live more. The premium platform for exclusive encounters.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Discover</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Featured</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Verified</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Safety</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <p className="text-xs text-muted-foreground mb-4">
                            All advertisers on this site are over the age of 18.
                            Luxuria is a platform for adults only.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            &copy; {new Date().getFullYear()} Luxuria. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
