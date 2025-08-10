export function is_debug_mode(): boolean
{
    return import.meta.env.VITE_DEBUG === "true";
}

export function access_token(): string
{
    return import.meta.env.VITE_ACCESS_TOKEN;
}

export async function api_sleep()
{
    await sleep(import.meta.env.VITE_API_SLEEP_TIME);
}

export function sleep(ms: number)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

function set_local_storage(key: string, value: number): void
{
    if (localStorage.getItem(key) === null)
    {
        localStorage.setItem(key, JSON.stringify([]));
    }
    const values = new Set(JSON.parse(localStorage.getItem(key)!));
    values.add(value);
    localStorage.setItem(key, JSON.stringify(Array.from(values)));
}

function remove_local_storage(key: string, value: number): void
{
    if (localStorage.getItem(key) === null)
    {
        return;
    }
    const values = new Set(JSON.parse(localStorage.getItem(key)!));
    values.delete(value);
    localStorage.setItem(key, JSON.stringify(Array.from(values)));
}

function has_local_storage(key: string, value: number): boolean
{
    if (localStorage.getItem(key) === null)
    {
        return false;
    }
    const values = new Set(JSON.parse(localStorage.getItem(key)!));
    return values.has(value);
}

export function add_to_watch_later(id: number): void
{
    set_local_storage('watchLater', id);
}

export function remove_from_watch_later(id: number): void
{
    remove_local_storage('watchLater', id);
}

export function in_watch_later(id: number): boolean
{
    return has_local_storage('watchLater', id);
}

export function add_to_favourites(id: number): void
{
    set_local_storage('favourites', id);
}

export function remove_from_favourites(id: number): void
{
    remove_local_storage('favourites', id);
}

export function in_favourites(id: number): boolean
{
    return has_local_storage('favourites', id);
}