import type { WitnessContext } from '@midnight-ntwrk/compact-runtime';
import type { Ledger } from './managed/verifiedid/contract';

export type PrivateState = {
  // Identity Data
  aadhaar: string;
  pan: string;
  hallTicket: string;
  age: number;

  // Creditworthiness Data
  hasDefaulted: boolean;
  loansPaid: number;
  stablecoinBalance: number;

  boardingPassNum: string;
  vaccineId: string;
};

export const witnesses = {
  
  getUserPii: (
    { privateState }: WitnessContext<Ledger, PrivateState>
  ): [PrivateState, [string, string, string, number]] => {
  
    return [privateState, [privateState.aadhaar, privateState.pan, privateState.hallTicket, privateState.age]];
  },
getUserCreditData: (
    { privateState }: WitnessContext<Ledger, PrivateState>
  ): [PrivateState, [boolean, number, number]] => {
    return [privateState, [privateState.hasDefaulted, privateState.loansPaid, privateState.stablecoinBalance]];
  },

  getUserTravelData: (
    { privateState }: WitnessContext<Ledger, PrivateState>
  ): [PrivateState, [string, string]] => {
    return [privateState, [privateState.boardingPassNum, privateState.vaccineId]];
  },
};