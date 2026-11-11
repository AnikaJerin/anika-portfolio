# ARC White-Box Estimation Challenge 2026

**Ranked #57 out of 1,241 global participants · Phase 2 · $150,000+ prize pool**  
*Alignment Research Center (ARC) × AIcrowd*

---

## Achievement

**Top 4.6% globally** in a mathematically rigorous AI safety competition organized by the [Alignment Research Center](https://www.alignment.org/) and [AIcrowd](https://www.aicrowd.com/challenges/arc-white-box-estimation-challenge-2026).

| Metric | Start | Final | Change |
|---|---:|---:|---:|
| Public adjusted score | ~4.65 × 10⁻⁹ | **3.084 × 10⁻⁹** | **↓ 34% (better)** |
| Final-layer MSE | ~2.22 × 10⁻⁸ | **2.066 × 10⁻⁸** | **↓ 7% (better)** |
| Public networks passed | — | **50 / 50** | Zero failures |
| Local paired MSE (V265 vs V189) | 2.256 × 10⁻⁸ | **2.181 × 10⁻⁸** | **↓ 3.31%** |
| Local paired adjusted error | 3.341 × 10⁻⁹ | **3.259 × 10⁻⁹** | **↓ 2.45%** |

V265 improved raw MSE on **all 8/8** paired local networks and adjusted error on **7/8**. Both submissions were selected for private re-evaluation.

---

## The Task

Given only the **weight matrices** of a randomly initialized ReLU MLP — 1,024 neurons per layer, 16 layers — analytically estimate:

$$\mathbb{E}_{x \sim \mathcal{N}(0,I)}[h_{\ell,i}(x)]$$

for every layer $\ell$ and neuron $i$, **without executing a single forward pass through the network**.

The scoring function was adversarial by design:

$$\text{adjusted error} = \text{final-layer MSE} \times \max\!\left(0.1,\ \frac{\text{FLOPs}}{2^{41}}\right)$$

This meant raw accuracy improvements were worthless if they inflated compute cost too much. Every gain had to be won **within hard CPU time and memory limits**, making this a constrained numerical optimization problem at the boundary of what higher-order cumulant propagation can represent.

---

## What I Did

### 1. Diagnosed and fixed a root-cause inconsistency in the fourth-order closure

The inherited engine propagated distributional information using a factored third-order cumulant history with an approximate fourth-order harmonic closure. I found that multiple closure terms — K22, K13, and the fourth-to-third-order source feed — were each using a shared scalar input metric, when the correct quantity for each was the **per-row norm of the weight matrix**.

Using a shared scalar forced different terms to assume the same geometry for every neuron, which is incorrect when weight rows have meaningfully different norms.

**What I did:** Replaced the scalar with the **diagonal of the weight Gram matrix** (`W @ W.T` diagonal), reusing an existing elementwise weight-square computation already in the engine. I applied this consistently across all four affected terms so they shared the same metric assumption.

**Why it matters:** This eliminated internal inconsistency in the closure without adding any new large matrix multiplication — the fix was computationally free.

### 2. Increased compressed source-history capacity at minimal FLOP cost

Distributional information from earlier layers propagates forward as "sources" — but carrying all of them exactly is expensive. The engine used exact recent sources and two compressed older-source tiers. I investigated whether expanding basis capacity in the oldest tier would recover useful signal.

**What I did:** Increased the oldest compressed basis from **192 → 224 directions** while keeping the first older basis at 384. I did not extend the more expensive exact-history window (experiments showed that cost outweighed the accuracy gain).

**Result:** More historical distributional information retained across 16 layers at a measured FLOP increase of only **0.89%** relative to the preceding submission.

### 3. Validated every change before submission — and rejected several promising directions

Higher-order cumulant propagation is sensitive: a change that improves one network architecture can degrade another. I ran every candidate change on **paired local networks**, tracking MSE and charged FLOPs **independently**, and required a complete resource-valid panel before replacing the submission file.

This caught and eliminated:
- Extended exact-history windows that improved MSE but cost too much in FLOPs
- Batched operations whose reshape overhead erased their expected savings
- A basis-update experiment where inspection showed the active fixed-basis mode bypassed it entirely

Dense-tensor reference checks independently verified every repeated-index formula before full-network evaluation.

---

## Technical Depth Demonstrated

| Area | Specifics |
|---|---|
| **Probabilistic ML** | Gaussian moment propagation, third- and fourth-order cumulants, ReLU distributional approximations, closure consistency |
| **Numerical linear algebra** | Factored tensor representations, weight Gram matrix, compressed source bases, repeated-index contractions |
| **Performance engineering** | Analytical FLOP accounting via flopscope, scratch-buffer reuse, array-view ownership, runtime constraint satisfaction |
| **Experimental design** | Paired network comparisons, component isolation, public vs. local metric separation, resource-aware release decisions |
| **Software verification** | Dense reference implementations, aliasing and cache-invalidation checks, source hash validation |

---

## Results Summary

| Submission | Version | Public adjusted score | Final-layer MSE |
|---|---|---:|---:|
| [337582](https://www.aicrowd.com/challenges/arc-white-box-estimation-challenge-2026/submissions/337582) | V265 | **3.084 × 10⁻⁹** | **2.066 × 10⁻⁸** |
| [337497](https://www.aicrowd.com/challenges/arc-white-box-estimation-challenge-2026/submissions/337497) | V189 | 3.13 × 10⁻⁹ | 2.12 × 10⁻⁸ |

Starting point (submission 336699): ~4.65 × 10⁻⁹ / 2.22 × 10⁻⁸.

---

## Scope & Provenance

Built on the MIT-licensed cumulant-propagation engines by **504aldo** and **LordProcciuto**. Factored cumulant propagation and recursive Winograd multiplication are inherited foundations. This project's contributions are the closure adaptation (Gram-diagonal metric), history-capacity tuning, and their experimental validation. See [THIRD_PARTY.md](THIRD_PARTY.md) and [LICENSE](LICENSE).

---

## Run a Release

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
whest validate --estimator submissions/v265/estimator.py
```

Requires Python 3.12. Each estimator is self-contained. Replace `v265` with `v189` for the earlier release.

