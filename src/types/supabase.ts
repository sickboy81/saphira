export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    role: 'visitor' | 'advertiser' | 'super_admin'
                    is_banned: boolean
                    display_name: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    role?: 'visitor' | 'advertiser' | 'super_admin'
                    is_banned?: boolean
                    display_name?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    role?: 'visitor' | 'advertiser' | 'super_admin'
                    is_banned?: boolean
                    display_name?: string | null
                    created_at?: string
                }
            }
            media: {
                Row: {
                    id: string
                    profile_id: string
                    url: string
                    type: 'image' | 'video'
                    created_at: string
                }
                Insert: {
                    id?: string
                    profile_id: string
                    url: string
                    type: 'image' | 'video'
                    created_at?: string
                }
                Update: {
                    id?: string
                    profile_id?: string
                    url?: string
                    type?: 'image' | 'video'
                    created_at?: string
                }
            }
        }
    }
}
