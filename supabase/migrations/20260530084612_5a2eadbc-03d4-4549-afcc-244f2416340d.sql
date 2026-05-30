CREATE TYPE public.contact_message_status AS ENUM ('new', 'read', 'replied');

ALTER TABLE public.contact_messages
  ADD COLUMN status public.contact_message_status NOT NULL DEFAULT 'new';

CREATE INDEX idx_contact_messages_created_at ON public.contact_messages (created_at DESC);
CREATE INDEX idx_contact_messages_status ON public.contact_messages (status);

CREATE POLICY "Admins can update contact messages"
ON public.contact_messages FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));