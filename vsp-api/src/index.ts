import { deployContract, findDeployedContract, type MidnightProviders, type DeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { contract as verifiedIdContract, type PrivateState } from 'vsp-contract';

export class VspApi {
  constructor(public deployedContract: DeployedContract<typeof verifiedIdContract>) {}

  static async deploy(providers: MidnightProviders): Promise<VspApi> {
  
    const initialPrivateState: PrivateState = {
      aadhaar: '', pan: '', hallTicket: '', age: 0,
      hasDefaulted: false, loansPaid: 0, stablecoinBalance: 0,
      boardingPassNum: '', vaccineId: ''
    };
    
    const deployedContract = await deployContract(providers, {
      contract: verifiedIdContract,
      initialPrivateState,
    });
    return new VspApi(deployedContract);
  }

  static async join(providers: MidnightProviders, contractAddress: string): Promise<VspApi> {
    const deployedContract = await findDeployedContract(providers, {
      contract: verifiedIdContract,
      address: contractAddress,
    });
    return new VspApi(deployedContract);
  }

  async submitIdentity(pii: Pick<PrivateState, 'aadhaar' | 'pan' | 'hallTicket' | 'age'>): Promise<string> {
    await this.deployedContract.updatePrivateState(pii);
    return this.deployedContract.callTx.submitIdentityApplication();
  }

  // User submits their financial information.
  async submitCredit(creditData: Pick<PrivateState, 'hasDefaulted' | 'loansPaid' | 'stablecoinBalance'>): Promise<string> {
    await this.deployedContract.updatePrivateState(creditData);
    return this.deployedContract.callTx.submitCreditApplication();
  }

  // User submits their travel documents.
  async submitTravel(travelData: Pick<PrivateState, 'boardingPassNum' | 'vaccineId'>): Promise<string> {
    await this.deployedContract.updatePrivateState(travelData);
    return this.deployedContract.callTx.submitTravelApplication();
  }

  // Admin approves a user's identity submission.
  async approveIdentity(userKeyHash: string): Promise<string> {
    return this.deployedContract.callTx.approveIdentity(userKeyHash);
  }

  // Admin approves a user's credit submission.
  async approveCredit(userKeyHash: string): Promise<string> {
    return this.deployedContract.callTx.approveCredit(userKeyHash);
  }

  // Admin approves a user's travel submission.
  async approveTravel(userKeyHash: string): Promise<string> {
    return this.deployedContract.callTx.approveTravel(userKeyHash);
  }
}