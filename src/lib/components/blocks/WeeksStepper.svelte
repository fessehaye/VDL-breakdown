<script lang="ts">
  import IconMinus from "@tabler/icons-svelte/icons/minus";
  import IconPlus from "@tabler/icons-svelte/icons/plus";
  import { cn } from "$lib/utils";

  type Props = {
    id: string;
    weeksPlayed: number;
    maxWeeks: number;
    ariaLabel: string;
    decreaseAriaLabel: string;
    increaseAriaLabel: string;
    class?: string;
  };

  let {
    id,
    weeksPlayed = $bindable(),
    maxWeeks,
    ariaLabel,
    decreaseAriaLabel,
    increaseAriaLabel,
    class: className,
  }: Props = $props();

  const controlRingClass = "ring-3 ring-transparent";

  const stepperControlClass =
    "h-full w-8 shrink-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50";

  function clampWeeks(weeks: number) {
    return Math.min(maxWeeks, Math.max(1, weeks));
  }

  function setWeeks(value: number) {
    weeksPlayed = clampWeeks(value);
  }

  function onWeeksInput(raw: string) {
    const parsed = Number.parseInt(raw, 10);
    if (Number.isNaN(parsed)) return;
    setWeeks(parsed);
  }
</script>

<div
  class={cn(
    "border-input dark:bg-input/30 focus-within:border-ring focus-within:ring-ring/50 flex h-9 items-stretch overflow-hidden rounded-md border bg-transparent shadow-xs transition-[color,box-shadow]",
    controlRingClass,
    className,
  )}
  role="group"
  aria-label={ariaLabel}
>
  <button
    type="button"
    class="{stepperControlClass} border-input hidden lg:inline-flex items-center justify-center border-r"
    disabled={weeksPlayed <= 1}
    aria-label={decreaseAriaLabel}
    onclick={() => setWeeks(weeksPlayed - 1)}
  >
    <IconMinus class="size-3.5" />
  </button>
  <input
    {id}
    type="number"
    min={1}
    max={maxWeeks}
    inputmode="numeric"
    class="placeholder:text-muted-foreground w-10 min-w-0 border-0 bg-transparent px-0 text-center text-sm tabular-nums outline-none focus-visible:ring-0 md:text-sm"
    bind:value={weeksPlayed}
    oninput={(e) => onWeeksInput(e.currentTarget.value)}
    onchange={(e) => onWeeksInput(e.currentTarget.value)}
  />
  <button
    type="button"
    class="{stepperControlClass} border-input hidden lg:inline-flex items-center justify-center border-l"
    disabled={weeksPlayed >= maxWeeks}
    aria-label={increaseAriaLabel}
    onclick={() => setWeeks(weeksPlayed + 1)}
  >
    <IconPlus class="size-3.5" />
  </button>
</div>
