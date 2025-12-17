import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Filter, Sparkles, User, Wallet, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
    className?: string;
    onFilterChange: (filters: FilterState) => void;
    activeFilters: FilterState;
}

export interface FilterState {
    city: string;
    state: string;
    neighborhood: string; // Added
    gender: string[]; // Added
    priceMax: number | '';
    ageRange: [number, number];
    hairColor: string[];
    bodyType: string[];
    ethnicity: string[];
    services: string[];
    paymentMethods: string[];
    hasPlace: boolean | null;
    videoCall: boolean | null;
    verifiedOnly: boolean;
    // Categories for header alignment
    category: string | null;
    keyword: string; // Added
}

const INITIAL_FILTERS: FilterState = {
    city: '',
    state: '',
    neighborhood: '',
    gender: [],
    priceMax: '',
    ageRange: [18, 60],
    hairColor: [],
    bodyType: [],
    ethnicity: [], // Added
    services: [],
    paymentMethods: [],
    hasPlace: null,
    videoCall: null,
    verifiedOnly: false,
    category: null,
    keyword: '',
};

// Data Options
const LOCATIONS = {
    'SP': ['São Paulo', 'Campinas', 'Santos'],
    'RJ': ['Rio de Janeiro', 'Niterói', 'Búzios'],
    'MG': ['Belo Horizonte', 'Uberlândia'],
    'PR': ['Curitiba', 'Londrina'],
    'RS': ['Porto Alegre', 'Caxias do Sul'],
    'BA': ['Salvador'],
    'DF': ['Brasília']
};

const HAIR_COLORS = ['Loira', 'Morena', 'Ruiva', 'Preto', 'Colorido'];
const BODY_TYPES = ['Magro', 'Mignon', 'Fitness', 'Curvilínea', 'Plus Size'];
const ETHNICITIES = ['Branca', 'Negra', 'Mulata', 'Oriental', 'Latina'];
const PAYMENTS = ['Dinheiro', 'PIX', 'Cartão de Crédito', 'Cartão de Débito', 'Crypto'];
const SERVICES = [
    'Massagem', 'Namoradinha', 'Jantar', 'Viagens', 'Fetiches',
    'Beijo na boca', 'Oral até o final', 'Oral com camisinha',
    'Dominatrix', 'Casais', 'Iniciantes'
];

export function FilterSidebar({ className, onFilterChange, activeFilters }: FilterSidebarProps) {
    const [localFilters, setLocalFilters] = useState<FilterState>(activeFilters);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        location: true,
        price: true,
        appearance: false,
        services: false,
        content: false
    });

    // Sync active filters from parent
    useEffect(() => {
        setLocalFilters(activeFilters);
    }, [activeFilters]);

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleFilterUpdate = (newFilters: Partial<FilterState>) => {
        const updated = { ...localFilters, ...newFilters };
        setLocalFilters(updated);
        onFilterChange(updated);
    };

    const toggleArrayItem = (field: keyof FilterState, value: string) => {
        const current = localFilters[field] as string[];
        const updated = current.includes(value)
            ? current.filter(item => item !== value)
            : [...current, value];
        handleFilterUpdate({ [field]: updated });
    };

    return (
        <aside className={cn("w-full bg-card border border-border rounded-xl shadow-sm overflow-hidden", className)}>
            <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2 text-foreground">
                    <Filter className="w-4 h-4 text-primary" />
                    Filtros Avançados
                </h3>
                <button
                    onClick={() => handleFilterUpdate(INITIAL_FILTERS)}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                    Limpar tudo
                </button>
            </div>

            <div className="divide-y divide-border">
                {/* 1. Location & Basic Qualities */}
                <div className="p-4 space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Localização</label>
                        <select
                            value={localFilters.state}
                            onChange={(e) => handleFilterUpdate({ state: e.target.value, city: '' })}
                            className="bg-background border border-input rounded-md p-2 text-sm"
                        >
                            <option value="">Todos os Estados</option>
                            {Object.keys(LOCATIONS).map(uf => <option key={uf} value={uf}>{uf}</option>)}
                        </select>

                        {localFilters.state && (
                            <select
                                value={localFilters.city}
                                onChange={(e) => handleFilterUpdate({ city: e.target.value })}
                                className="bg-background border border-input rounded-md p-2 text-sm animate-in fade-in slide-in-from-top-2"
                            >
                                <option value="">Todas as Cidades</option>
                                {/* @ts-ignore */}
                                {LOCATIONS[localFilters.state]?.map(city => <option key={city} value={city}>{city}</option>)}
                            </select>
                        )}
                    </div>

                    {/* Quick Toggles */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => handleFilterUpdate({ verifiedOnly: !localFilters.verifiedOnly })}
                            className={cn(
                                "text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5",
                                localFilters.verifiedOnly
                                    ? "bg-blue-500/10 border-blue-500 text-blue-500"
                                    : "bg-background border-input text-muted-foreground hover:border-primary/50"
                            )}
                        >
                            {localFilters.verifiedOnly && <Check className="w-3 h-3" />} Verificadas
                        </button>
                        <button
                            onClick={() => handleFilterUpdate({ hasPlace: localFilters.hasPlace === true ? null : true })}
                            className={cn(
                                "text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5",
                                localFilters.hasPlace === true
                                    ? "bg-primary/10 border-primary text-primary"
                                    : "bg-background border-input text-muted-foreground hover:border-primary/50"
                            )}
                        >
                            Com Local
                        </button>
                        <button
                            onClick={() => handleFilterUpdate({ videoCall: localFilters.videoCall === true ? null : true })}
                            className={cn(
                                "text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5",
                                localFilters.videoCall === true
                                    ? "bg-primary/10 border-primary text-primary"
                                    : "bg-background border-input text-muted-foreground hover:border-primary/50"
                            )}
                        >
                            Videochamada
                        </button>
                    </div>
                </div>

                {/* 1.5 Gender */}
                <div className="p-4 border-b border-border">
                    <label className="text-xs font-semibold uppercase text-muted-foreground mb-3 block">Gênero</label>
                    <div className="flex flex-wrap gap-2">
                        {['Mulher', 'Homem', 'Trans'].map(g => (
                            <button
                                key={g}
                                onClick={() => toggleArrayItem('gender', g.toLowerCase())}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                                    localFilters.gender?.includes(g.toLowerCase())
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-card text-foreground border-border hover:bg-muted"
                                )}
                            >
                                {g}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Price Range */}
                <div className="p-4">
                    <button
                        onClick={() => toggleSection('price')}
                        className="flex justify-between items-center w-full text-sm font-semibold mb-2"
                    >
                        <span className="flex items-center gap-2"><Wallet className="w-4 h-4 text-muted-foreground" /> Valor / Pagamento</span>
                        {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {expandedSections.price && (
                        <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2">
                            <div>
                                <label className="text-xs text-muted-foreground block mb-2">
                                    Preço Máximo: <span className="text-foreground font-bold">{localFilters.priceMax ? `R$ ${localFilters.priceMax}` : 'Qualquer'}</span>
                                </label>
                                <input
                                    type="range"
                                    min="100"
                                    max="1000"
                                    step="50"
                                    value={localFilters.priceMax || 1000}
                                    onChange={(e) => handleFilterUpdate({ priceMax: Number(e.target.value) })}
                                    className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                                    <span>R$ 100</span>
                                    <span>R$ 1000+</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-muted-foreground">Métodos de Pagamento</label>
                                <div className="flex flex-wrap gap-1.5">
                                    {PAYMENTS.map(method => (
                                        <button
                                            key={method}
                                            onClick={() => toggleArrayItem('paymentMethods', method)}
                                            className={cn(
                                                "text-[10px] px-2.5 py-1 rounded-md border transition-all",
                                                localFilters.paymentMethods.includes(method)
                                                    ? "bg-foreground text-background border-foreground font-medium"
                                                    : "bg-background border-input text-muted-foreground hover:bg-muted"
                                            )}
                                        >
                                            {method}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 3. Appearance */}
                <div className="p-4">
                    <button
                        onClick={() => toggleSection('appearance')}
                        className="flex justify-between items-center w-full text-sm font-semibold mb-2"
                    >
                        <span className="flex items-center gap-2"><User className="w-4 h-4 text-muted-foreground" /> Aparência</span>
                        {expandedSections.appearance ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {expandedSections.appearance && (
                        <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2">
                            {/* Hair */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-muted-foreground">Cor do Cabelo</label>
                                <div className="flex flex-wrap gap-1.5">
                                    {HAIR_COLORS.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => toggleArrayItem('hairColor', color)}
                                            className={cn(
                                                "text-[10px] px-2.5 py-1 rounded-md border transition-all",
                                                localFilters.hairColor.includes(color)
                                                    ? "bg-foreground text-background border-foreground font-medium"
                                                    : "bg-background border-input text-muted-foreground hover:bg-muted"
                                            )}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Body */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-muted-foreground">Tipo Físico</label>
                                <div className="flex flex-wrap gap-1.5">
                                    {BODY_TYPES.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => toggleArrayItem('bodyType', type)}
                                            className={cn(
                                                "text-[10px] px-2.5 py-1 rounded-md border transition-all",
                                                localFilters.bodyType.includes(type)
                                                    ? "bg-foreground text-background border-foreground font-medium"
                                                    : "bg-background border-input text-muted-foreground hover:bg-muted"
                                            )}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Ethnicity */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-muted-foreground">Etnia</label>
                                <div className="flex flex-wrap gap-1.5">
                                    {ETHNICITIES.map(eth => (
                                        <button
                                            key={eth}
                                            onClick={() => toggleArrayItem('ethnicity', eth)}
                                            className={cn(
                                                "text-[10px] px-2.5 py-1 rounded-md border transition-all",
                                                localFilters.ethnicity.includes(eth)
                                                    ? "bg-foreground text-background border-foreground font-medium"
                                                    : "bg-background border-input text-muted-foreground hover:bg-muted"
                                            )}
                                        >
                                            {eth}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 4. Services */}
                <div className="p-4">
                    <button
                        onClick={() => toggleSection('services')}
                        className="flex justify-between items-center w-full text-sm font-semibold mb-2"
                    >
                        <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-muted-foreground" /> Serviços</span>
                        {expandedSections.services ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {expandedSections.services && (
                        <div className="pt-2 animate-in fade-in slide-in-from-top-2">
                            <div className="flex flex-wrap gap-1.5">
                                {SERVICES.map(service => (
                                    <button
                                        key={service}
                                        onClick={() => toggleArrayItem('services', service)}
                                        className={cn(
                                            "text-[10px] px-2.5 py-1 rounded-full border transition-all",
                                            localFilters.services.includes(service)
                                                ? "bg-primary/10 border-primary text-primary font-medium"
                                                : "bg-background border-input text-muted-foreground hover:bg-muted"
                                        )}
                                    >
                                        {service}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
