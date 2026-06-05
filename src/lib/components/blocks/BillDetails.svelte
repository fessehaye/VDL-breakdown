<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import * as Select from "$lib/components/ui/select";
  import { Label } from "$lib/components/ui/label";
  import { formatCurrency, GST_RATE } from "$lib/utils";
  import { breakdown } from "$lib/components/states/PaymentBreakdown.svelte";

  function totalWithGst(base: number) {
    return base * (1 + GST_RATE);
  }

  const planTriggerLabel = $derived(
    breakdown.selectedPlanOption
      ? `${breakdown.selectedPlanOption.label} — ${formatCurrency(breakdown.parsedTotal)}`
      : "Select a rate",
  );
</script>

<Card.Root>
  <Card.Header>
    <Card.Title class="text-primary">1. Bill details</Card.Title>
    <Card.Description>Choose the registration rate to split.</Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="grid gap-2">
      <Label for="plan-select">Rate</Label>
      <Select.Root
        type="single"
        value={breakdown.selectedPlan}
        onValueChange={(value) => {
          breakdown.updatePlan(value as string);
        }}
      >
        <Select.Trigger id="plan-select" class="w-full">
          {planTriggerLabel}
        </Select.Trigger>
        <Select.Content>
          {#each breakdown.plans as plan (plan.value)}
            <Select.Item value={plan.value} label={plan.label}>
              {plan.label} — {formatCurrency(totalWithGst(plan.amount))}
            </Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
      {#if breakdown.selectedPlanOption}
        <dl
          class="text-muted-foreground mt-3 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-sm"
        >
          {#if breakdown.selectedPlan !== "toc"}
            <dt>Length of season</dt>
            <dd class="text-foreground text-right tabular-nums">
              {breakdown.weeks} weeks
            </dd>
          {/if}
          <dt>Subtotal</dt>
          <dd class="text-foreground text-right tabular-nums">
            {formatCurrency(breakdown.subtotal)}
          </dd>
          <dt>GST ({(GST_RATE * 100).toFixed(0)}%)</dt>
          <dd class="text-foreground text-right tabular-nums">
            {formatCurrency(breakdown.gst)}
          </dd>
          <dt class="text-foreground font-medium">Total</dt>
          <dd class="text-foreground text-right font-medium tabular-nums">
            {formatCurrency(breakdown.parsedTotal)}
          </dd>
        </dl>
      {/if}
    </div>
  </Card.Content>
</Card.Root>
