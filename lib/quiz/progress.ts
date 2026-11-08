"use client";

import { useSyncExternalStore } from "react";

export type Result = { right: number; wrong: number; lastRight: boolean };

export type Progress = {
  /** Answered in the current pass through the bank. These won't come up again until reset. */
  seen: Record<string, true>;
  /** Lifetime results for each question. */
  results: Record<string, Result>;
};

const KEY = "chm2410-quiz-progress-v1";
const EMPTY: Progress = { seen: {}, results: {} };

let current: Progress = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function read(): Progress {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return { seen: parsed.seen ?? {}, results: parsed.results ?? {} };
  } catch {
    return EMPTY;
  }
}

function commit(next: Progress) {
  current = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private windows can refuse storage. Progress then lasts only for this visit.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== KEY) return;
    current = read();
    listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  if (!loaded) {
    loaded = true;
    current = read();
  }
  return current;
}

export const useProgress = () => useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

export function recordAnswer(id: string, right: boolean) {
  const state = getSnapshot();
  const before = state.results[id] ?? { right: 0, wrong: 0, lastRight: right };
  commit({
    seen: { ...state.seen, [id]: true },
    results: {
      ...state.results,
      [id]: {
        right: before.right + (right ? 1 : 0),
        wrong: before.wrong + (right ? 0 : 1),
        lastRight: right,
      },
    },
  });
}

/** Lets these questions come up again. Lifetime results are kept. */
export function clearSeen(ids: string[]) {
  const seen = { ...getSnapshot().seen };
  for (const id of ids) delete seen[id];
  commit({ ...getSnapshot(), seen });
}

export function resetProgress() {
  commit(EMPTY);
}
