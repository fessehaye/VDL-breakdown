<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import * as Table from "$lib/components/ui/table";
  import { formatCurrency } from "$lib/utils";
  import { breakdown } from "$lib/components/states/PaymentBreakdown.svelte";
</script>

<Card.Root>
  <Card.Header>
    <Card.Title class="text-primary">3. Breakdown</Card.Title>
    <Card.Description>Final summary of what each person owes</Card.Description>
  </Card.Header>
  <Card.Content>
    {#if breakdown.selectedPlan}
      <dl
        class="text-muted-foreground my-3 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-sm"
      >
        <dt>Plan</dt>
        <dd class="text-foreground text-right tabular-nums">
          {breakdown.selectedPlanOption?.label}
        </dd>
        {#if breakdown.selectedPlan !== "toc"}
          <dt>Length of season</dt>
          <dd class="text-foreground text-right tabular-nums">
            {breakdown.weeks} weeks
          </dd>

          <dt>Game cost per week</dt>
          <dd class="text-foreground text-right tabular-nums">
            {formatCurrency(breakdown.costPerGame)}
          </dd>
        {/if}
      </dl>
    {/if}
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Player</Table.Head>
          {#if breakdown.selectedPlan !== "toc"}
            <Table.Head class="text-right">Weeks</Table.Head>
          {/if}
          <Table.Head class="text-right">Share</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each breakdown.activePlayers as player (player.id)}
          <Table.Row>
            <Table.Cell class="font-medium">
              {player.name.trim() || "—"}
            </Table.Cell>
            {#if breakdown.selectedPlan !== "toc"}
              <Table.Cell
                class="text-muted-foreground text-right text-sm tabular-nums"
              >
                {player.weeksPlayed}
              </Table.Cell>
            {/if}
            <Table.Cell class="text-right tabular-nums">
              {formatCurrency(breakdown.costPerGame * player.weeksPlayed)}
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
      <Table.Footer>
        <Table.Row class="bg-primary/10 hover:bg-primary/10">
          <Table.Cell>Total</Table.Cell>
          {#if breakdown.selectedPlan !== "toc"}
            <Table.Cell></Table.Cell>
          {/if}
          <Table.Cell class="text-right font-medium tabular-nums">
            {formatCurrency(breakdown.parsedTotal)}
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  </Card.Content>
</Card.Root>
