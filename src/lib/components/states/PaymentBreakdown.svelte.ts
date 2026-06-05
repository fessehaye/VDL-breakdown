import { GST_RATE, type Player, type SeasonPlan } from "$lib/utils";

class PaymentBreakdown {
  plans = [
    {
      value: "monday-early-bird",
      label: "Monday Early Bird",
      amount: 300,
      weeks: 6,
    },
    { value: "monday-default", label: "Monday Default", amount: 400, weeks: 6 },
    {
      value: "regular-super-early-bird",
      label: "Regular SUPER Early Bird",
      amount: 700,
      weeks: 10,
    },
    {
      value: "regular-early-bird",
      label: "Regular Early Bird",
      amount: 800,
      weeks: 10,
    },
    {
      value: "regular-default",
      label: "Regular Default",
      amount: 900,
      weeks: 10,
    },
    {
      value: "toc",
      label: "Tournament of Champions",
      amount: 360,
      weeks: 10,
    },
  ] satisfies SeasonPlan[];

  players = $state<Player[]>([
    { id: crypto.randomUUID(), name: "Captain", weeksPlayed: 10 },
    { id: crypto.randomUUID(), name: "Teammate", weeksPlayed: 10 },
  ]);

  selectedPlan = $state<string>("regular-super-early-bird");
  selectedPlanOption = $derived(
    this.plans.find((p) => p.value === this.selectedPlan),
  );
  subtotal = $derived(this.selectedPlanOption?.amount ?? 0);
  gst = $derived(this.subtotal * GST_RATE);
  parsedTotal = $derived(this.subtotal + this.gst);
  weeks = $derived(this.selectedPlanOption?.weeks ?? 0);

  activePlayers = $derived(
    this.players.filter((p) => p.name.trim().length > 0),
  );
  playerCount = $derived(this.activePlayers.length);
  costPerGame = $derived.by(() => {
    const totalWeeks = this.activePlayers.reduce(
      (acc, player) => acc + player.weeksPlayed,
      0,
    );

    return totalWeeks > 0 ? this.parsedTotal / totalWeeks : 0;
  });

  addPlayer = () => {
    this.players.push({
      id: crypto.randomUUID(),
      name: "",
      weeksPlayed: this.weeks,
    });
  };

  updatePlan = (value: string) => {
    const plan = this.plans.find((p) => p.value === value);
    if (!plan) return;
    this.selectedPlan = plan.value;
    const maxWeeks = plan.weeks;
    this.players = this.players.map((player) => ({
      ...player,
      weeksPlayed: Math.max(1, Math.min(player.weeksPlayed, maxWeeks)),
    }));
  };

  removePlayer = (id: string) => {
    if (this.players.length <= 1) return;
    this.players = this.players.filter((p) => p.id !== id);
  };
}

export const breakdown = new PaymentBreakdown();
