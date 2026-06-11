const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const form = document.getElementById("coverageForm");
const coverageResult = document.getElementById("coverageResult");
const premiumResult = document.getElementById("premiumResult");
const resultNote = document.getElementById("resultNote");

function estimateCoverage({ age, income, dependents, goal }) {
  const multipliers = {
    family: 10,
    mortgage: 8,
    legacy: 12,
    final: 1
  };

  const baseMultiplier = multipliers[goal] || 10;
  const dependentBoost = dependents * 50000;
  const ageAdjustment = age >= 55 ? 0.8 : age >= 45 ? 0.92 : 1;
  const baseCoverage = Math.max(income * baseMultiplier * ageAdjustment + dependentBoost, 25000);

  if (goal === "final") {
    const finalExpense = Math.max(25000, 15000 + dependents * 5000);
    return {
      minCoverage: finalExpense,
      maxCoverage: finalExpense + 15000,
      monthlyMin: 45,
      monthlyMax: 110,
      note: "Final expense coverage may be the clearest option to compare first."
    };
  }

  const minCoverage = Math.round(baseCoverage / 50000) * 50000;
  const maxCoverage = minCoverage + 200000;
  const monthlyBase = (minCoverage / 10000) * (age < 35 ? 1.1 : age < 45 ? 1.45 : age < 55 ? 2.05 : 3.2);

  return {
    minCoverage,
    maxCoverage,
    monthlyMin: Math.max(18, Math.round(monthlyBase)),
    monthlyMax: Math.max(36, Math.round(monthlyBase * 1.9)),
    note:
      goal === "legacy"
        ? "A permanent policy could be worth comparing alongside term coverage."
        : "Term life may be a strong first option to compare based on this profile."
  };
}

function renderEstimate(event) {
  event.preventDefault();

  const age = Number(document.getElementById("age").value || 0);
  const income = Number(document.getElementById("income").value || 0);
  const dependents = Number(document.getElementById("dependents").value || 0);
  const goal = document.getElementById("goal").value;

  const estimate = estimateCoverage({ age, income, dependents, goal });

  coverageResult.textContent = `${currency.format(estimate.minCoverage)} - ${currency.format(estimate.maxCoverage)}`;
  premiumResult.textContent = `Example monthly budget: about ${currency.format(estimate.monthlyMin)} to ${currency.format(estimate.monthlyMax)}`;
  resultNote.textContent = estimate.note;
}

form.addEventListener("submit", renderEstimate);
