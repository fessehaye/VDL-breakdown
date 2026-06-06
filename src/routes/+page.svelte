<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { Separator } from "$lib/components/ui/separator";
  import BillDetails from "$lib/components/blocks/BillDetails.svelte";
  import PlayerSplit from "$lib/components/blocks/PlayerSplit.svelte";
  import Breakdown from "$lib/components/blocks/Breakdown.svelte";
  import { Button } from "$lib/components/ui/button";
  import IconPlus from "@tabler/icons-svelte/icons/plus";
  import { breakdown } from "$lib/components/states/PaymentBreakdown.svelte";
</script>

<main
  class="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6"
>
  <header class="space-y-2">
    <Badge variant="secondary">Team calculator</Badge>
    <h1
      class="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-primary"
    >
      VDL Season Breakdown
    </h1>
    <p
      class="text-muted-foreground max-w-xl text-sm leading-relaxed sm:text-base"
    >
      Once your captain registered your team for the season, you need to split
      the cost of the season across your team. Fill in the details below to
      preview the per-person amount.
    </p>
  </header>

  <div class="grid lg:grid-cols-2 gap-6 w-full">
    <div class="flex flex-col gap-6">
      <BillDetails />
      <PlayerSplit />
    </div>

    <Breakdown />
  </div>

  <Separator />

  <p class="text-muted-foreground text-center text-xs">
    Amounts include 5% GST on the listed rate.
  </p>
  <Button
    type="button"
    variant="default"
    size="icon-lg"
    onclick={breakdown.addPlayer}
    class="bottom-5 right-5 fixed z-10 rounded-full lg:hidden"
  >
    <IconPlus class="size-6" />
  </Button>
</main>
