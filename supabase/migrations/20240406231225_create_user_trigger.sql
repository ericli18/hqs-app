-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.employees (id, first_name, last_name, hqs_id, "location", email)
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data->> 'last_name',
          new.raw_user_meta_data ->> 'hqs_id', (new.raw_user_meta_data->>'location')::smallint, new.email);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
