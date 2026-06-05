<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import IconPlus from "@tabler/icons-svelte/icons/plus";
  import IconTrash from "@tabler/icons-svelte/icons/trash";
  import WeeksStepper from "$lib/components/blocks/WeeksStepper.svelte";
  import { breakdown } from "$lib/components/states/PaymentBreakdown.svelte";
</script>

<Card.Root>
  <Card.Header
    class="flex flex-row items-start justify-between gap-4 space-y-0"
  >
    <div class="space-y-1.5">
      <Card.Title class="text-primary w-full">
        <span class="mr-2">Players</span>
        <Button
          type="button"
          variant="default"
          size="sm"
          onclick={breakdown.addPlayer}
        >
          <IconPlus class="size-4" />
          Add player
        </Button>
      </Card.Title>
      <Card.Description>
        Add everyone who should share this cost. Empty rows are ignored in the
        preview. If you have players that can't play every week, you can set the
        number of weeks they played.
      </Card.Description>
    </div>
  </Card.Header>
  <Card.Content class="space-y-3">
    {#each breakdown.players as player, index (player.id)}
      <div
        class="grid grid-cols-[minmax(0,1fr)_auto_2.25rem] grid-rows-[auto_auto] gap-x-2 gap-y-2"
      >
        <Label for="player-{player.id}" class="col-start-1 row-start-1">
          Player {index + 1}
        </Label>
        <Label for="weeks-{player.id}" class="col-start-2 row-start-1">
          Weeks
        </Label>
        <Input
          id="player-{player.id}"
          type="text"
          placeholder="Name"
          class="col-start-1 row-start-2"
          bind:value={player.name}
        />
        <WeeksStepper
          id="weeks-{player.id}"
          bind:weeksPlayed={player.weeksPlayed}
          maxWeeks={breakdown.weeks}
          ariaLabel="Weeks for player {index + 1}"
          decreaseAriaLabel="Decrease weeks for player {index + 1}"
          increaseAriaLabel="Increase weeks for player {index + 1}"
          class="col-start-2 row-start-2"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          class="col-start-3 row-start-2 self-center"
          disabled={breakdown.players.length <= 1}
          onclick={() => breakdown.removePlayer(player.id)}
          aria-label="Remove player {index + 1}"
        >
          <IconTrash class="size-4" />
        </Button>
      </div>
    {/each}
  </Card.Content>
  <Card.Footer class="text-muted-foreground text-xs">
    {breakdown.activePlayers.length || breakdown.players.length}
    {(breakdown.activePlayers.length || breakdown.players.length) === 1
      ? "player"
      : "players"} in split
  </Card.Footer>
</Card.Root>
