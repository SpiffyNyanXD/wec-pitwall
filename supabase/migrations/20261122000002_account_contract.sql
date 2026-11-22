-- Account contract prepared for a clean local/staging replay only.
-- Account deletion stays disabled in the UI. This does not install a deletion endpoint.
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS marketing_emails boolean NOT NULL DEFAULT false;
CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_unique ON public.profiles(lower(username)) WHERE username IS NOT NULL;
CREATE OR REPLACE FUNCTION public.is_username_available(uname text) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public
AS $$ SELECT uname ~ '^[a-z0-9_]{3,20}$' AND NOT EXISTS(SELECT 1 FROM public.profiles WHERE lower(username)=lower(uname)); $$;
REVOKE ALL ON FUNCTION public.is_username_available(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_username_available(text) TO anon,authenticated;
-- Underlying policies continue to limit profile/favorites/notification rows to auth.uid().
