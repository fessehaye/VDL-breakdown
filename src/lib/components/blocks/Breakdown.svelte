<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import * as Table from "$lib/components/ui/table";
  import { formatCurrency } from "$lib/utils";
  import { breakdown } from "$lib/components/states/PaymentBreakdown.svelte";
</script>

<Card.Root>
  <Card.Header>
    <Card.Title class="text-primary">Breakdown</Card.Title>
    <Card.Description>Summary of what each person owes</Card.Description>
  </Card.Header>
  <Card.Content class="px-0 sm:px-6">
    {#if breakdown.selectedPlan}
      <dl
        class="text-muted-foreground my-3 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-sm"
      >
        <dt>Plan</dt>
        <dd class="text-foreground text-right tabular-nums">
          {breakdown.selectedPlanOption?.label} ( {formatCurrency(
            breakdown.parsedTotal,
          )})
        </dd>
        <dt>Length of season</dt>
        <dd class="text-foreground text-right tabular-nums">
          {breakdown.weeks} weeks
        </dd>
        <dt>Cost per week for each player</dt>
        <dd class="text-foreground text-right tabular-nums">
          {formatCurrency(breakdown.costPerGame)}
        </dd>
      </dl>
    {/if}
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Player</Table.Head>
          <Table.Head class="text-right">Weeks</Table.Head>
          <Table.Head class="text-right">Share</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each breakdown.activePlayers as player (player.id)}
          <Table.Row>
            <Table.Cell class="font-medium">
              {player.name.trim() || "—"}
            </Table.Cell>
            <Table.Cell
              class="text-muted-foreground text-right text-sm tabular-nums"
            >
              {player.weeksPlayed}
            </Table.Cell>
            <Table.Cell class="text-right tabular-nums">
              {formatCurrency(breakdown.costPerGame * player.weeksPlayed)}
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
      <Table.Footer>
        <Table.Row class="bg-primary/10 hover:bg-primary/10">
          <Table.Cell>Total</Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell class="text-right font-medium tabular-nums">
            {formatCurrency(breakdown.parsedTotal)}
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  </Card.Content>
</Card.Root>
