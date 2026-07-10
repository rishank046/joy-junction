CREATE TABLE public.time_slots (
    slot_no integer PRIMARY KEY,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    CONSTRAINT check_times CHECK (start_time < end_time)
);

CREATE TABLE public.prices (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id uuid NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    tod character varying(50) NOT NULL,
    wep numeric(10, 2) NOT NULL CHECK (wep >= 0),
    wdp numeric(10, 2) NOT NULL CHECK (wdp >= 0),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.bookings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id uuid NOT NULL REFERENCES public.services(id) ON DELETE RESTRICT,
    slot_no integer NOT NULL REFERENCES public.time_slots(slot_no) ON DELETE RESTRICT,
    user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    no_of_tickets integer NOT NULL CHECK (no_of_tickets > 0),
    date date NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.ticket (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id uuid NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    date date NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_ticket_times CHECK (start_time < end_time)
);

CREATE INDEX idx_prices_service_id ON public.prices(service_id);
CREATE INDEX idx_bookings_service_id ON public.bookings(service_id);
CREATE INDEX idx_bookings_slot_no ON public.bookings(slot_no);
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_ticket_booking_id ON public.ticket(booking_id);