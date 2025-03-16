-- Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, role)
);

-- Create RLS policies
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Allow read access to authenticated users
CREATE POLICY "Allow read access to authenticated users"
    ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (true);

-- Allow admin users to manage roles
CREATE POLICY "Allow admin users to manage roles"
    ON public.user_roles
    FOR ALL
    TO authenticated
    USING (
        auth.uid() IN (
            SELECT user_id FROM public.user_roles WHERE role = 'admin'
        )
    )
    WITH CHECK (
        auth.uid() IN (
            SELECT user_id FROM public.user_roles WHERE role = 'admin'
        )
    );

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = $1
        AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 