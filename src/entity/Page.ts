import type { SvelteComponent } from "svelte";

export type Page = {
    name: string;
    svelteFile: typeof SvelteComponent<any, any, any>;
}