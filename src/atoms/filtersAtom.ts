import { atom, createStore } from 'jotai';
import type { Filters } from '@/types/filters';
import { DEFAULT_FILTERS } from '@/constants';

export const filtersAtom = atom<Filters>(DEFAULT_FILTERS);

export const filtersStore = createStore();
