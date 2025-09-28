import { Contract } from '@midnight-ntwrk/compact-runtime';
import { witnesses, type PrivateState } from './witnesses';

import contractModule from './managed/verifiedid/contract/index.cjs';
export const contract = new Contract<PrivateState>(contractModule, witnesses);
export * from './witnesses';