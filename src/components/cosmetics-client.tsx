"use client";

import { useState, useTransition, useCallback } from "react";

import type { OwnedCosmetic, EquippedItem } from "@/lib/auth";
import { equipCosmetic, unequipCosmetic } from "@/app/actions/cosmetics";

const TYPE_LABELS: Record<string, string> = {
  cape: "Cape",
  badge: "Badge",
  emote: "Emote",
  profile_icon: "Profile Icon",
};

function cosmeticTypeLabel(type: string): string {
  return TYPE_LABELS[type] ?? type;
}

export function CosmeticsClient({
  owned,
  equipped,
}: Readonly<{
  owned: OwnedCosmetic[];
  equipped: EquippedItem[];
}>) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [equippedState, setEquippedState] = useState<EquippedItem[]>(equipped);
  const [mutationError, setMutationError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const selected = owned.find((c) => c.id === selectedId) ?? null;
  const selectedEquipped = selected
    ? equippedState.find((e) => e.cosmeticType === selected.type)
    : null;
  const isSelectedEquipped = selectedEquipped?.cosmeticId === selectedId;

  const handleEquip = useCallback(
    (cosmeticId: string) => {
      setMutationError(null);
      startTransition(async () => {
        const result = await equipCosmetic(cosmeticId);
        if (result.success) {
          const item = owned.find((c) => c.id === cosmeticId);
          if (item) {
            setEquippedState((prev) => {
              const filtered = prev.filter((e) => e.cosmeticType !== item.type);
              return [
                ...filtered,
                {
                  cosmeticId: item.id,
                  cosmeticType: item.type,
                  name: item.name,
                  assetUrl: item.assetUrl,
                  previewUrl: item.previewUrl,
                  equippedAt: new Date().toISOString(),
                },
              ];
            });
          }
        } else {
          setMutationError(
            result.error === "not_owned"
              ? "You do not own this cosmetic."
              : result.error === "not_found"
                ? "This cosmetic is no longer available."
                : "Failed to equip cosmetic. Please try again.",
          );
        }
      });
    },
    [owned],
  );

  const handleUnequip = useCallback(
    (cosmeticType: string) => {
      setMutationError(null);
      startTransition(async () => {
        const result = await unequipCosmetic(cosmeticType);
        if (result.success) {
          setEquippedState((prev) =>
            prev.filter((e) => e.cosmeticType !== cosmeticType),
          );
        } else {
          setMutationError("Failed to unequip cosmetic. Please try again.");
        }
      });
    },
    [],
  );

  return (
    <div className="cosmetics-layout">
      <div className="cosmetics-main">
        {mutationError && (
          <div className="cosmetics-error" role="alert">
            {mutationError}
          </div>
        )}

        <section className="cosmetics-section" aria-label="Equipped cosmetics">
          <h3>Equipped</h3>
          {equippedState.length === 0 ? (
            <p className="cosmetics-empty">No cosmetics equipped.</p>
          ) : (
            <div className="cosmetics-equipped-grid">
              {equippedState.map((item) => (
                <div className="cosmetics-equipped-card" key={item.cosmeticId}>
                  <div className="cosmetics-equipped-card__preview">
                    {item.assetUrl ? (
                      <img
                        src={item.assetUrl}
                        alt={item.name}
                        className="cosmetics-equipped-card__img"
                      />
                    ) : (
                      <div className="cosmetics-equipped-card__placeholder">
                        {cosmeticTypeLabel(item.cosmeticType).charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="cosmetics-equipped-card__info">
                    <span className="cosmetics-equipped-card__name">
                      {item.name}
                    </span>
                    <span className="cosmetics-equipped-card__type">
                      {cosmeticTypeLabel(item.cosmeticType)}
                    </span>
                  </div>
                  <button
                    className="button button--quiet cosmetics-unequip-btn"
                    onClick={() => handleUnequip(item.cosmeticType)}
                    disabled={isPending}
                    aria-label={`Unequip ${item.name}`}
                  >
                    Unequip
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="cosmetics-section" aria-label="Owned cosmetics">
          <h3>Owned</h3>
          {owned.length === 0 ? (
            <p className="cosmetics-empty">
              You do not own any cosmetics yet.
            </p>
          ) : (
            <div className="cosmetics-owned-grid">
              {owned.map((item) => {
                const isEquipped = equippedState.some(
                  (e) => e.cosmeticId === item.id,
                );
                return (
                  <button
                    className={
                      "cosmetics-card" +
                      (selectedId === item.id
                        ? " cosmetics-card--selected"
                        : "") +
                      (isEquipped ? " cosmetics-card--equipped" : "")
                    }
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    aria-pressed={selectedId === item.id}
                    aria-label={`${item.name} — ${cosmeticTypeLabel(item.type)}${isEquipped ? " (equipped)" : ""}`}
                  >
                    <div className="cosmetics-card__preview">
                      {item.assetUrl ? (
                        <img
                          src={item.assetUrl}
                          alt=""
                          className="cosmetics-card__img"
                        />
                      ) : (
                        <div className="cosmetics-card__placeholder">
                          {cosmeticTypeLabel(item.type).charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="cosmetics-card__name">{item.name}</span>
                    <span className="cosmetics-card__type">
                      {cosmeticTypeLabel(item.type)}
                    </span>
                    {isEquipped && (
                      <span className="cosmetics-card__equipped-badge">
                        Equipped
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <aside className="cosmetics-preview" aria-label="Cosmetic preview">
        {selected ? (
          <>
            <h3>{selected.name}</h3>
            <div className="cosmetics-preview__visual">
              {selected.previewUrl || selected.assetUrl ? (
                <img
                  src={selected.previewUrl ?? selected.assetUrl ?? ""}
                  alt={`Preview of ${selected.name}`}
                  className="cosmetics-preview__img"
                />
              ) : (
                <div className="cosmetics-preview__placeholder">
                  {cosmeticTypeLabel(selected.type).charAt(0)}
                </div>
              )}
            </div>
            {selected.description && (
              <p className="cosmetics-preview__description">
                {selected.description}
              </p>
            )}
            <dl className="cosmetics-preview__details">
              <dt>Type</dt>
              <dd>{cosmeticTypeLabel(selected.type)}</dd>
              <dt>Rarity</dt>
              <dd className={`cosmetics-rarity cosmetics-rarity--${selected.rarity}`}>
                {selected.rarity}
              </dd>
            </dl>
            <div className="cosmetics-preview__actions">
              {isSelectedEquipped ? (
                <button
                  className="button button--quiet"
                  onClick={() => handleUnequip(selected.type)}
                  disabled={isPending}
                >
                  Unequip
                </button>
              ) : (
                <button
                  className="button button--primary"
                  onClick={() => handleEquip(selected.id)}
                  disabled={isPending}
                >
                  {equippedState.some((e) => e.cosmeticType === selected.type)
                    ? "Replace & Equip"
                    : "Equip"}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="cosmetics-preview__empty">
            <p>Select a cosmetic to preview</p>
          </div>
        )}
      </aside>
    </div>
  );
}
