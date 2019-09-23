export interface ITransactionLink {
	(hash: string, network: any): string;
}

export const transactionLink: ITransactionLink = (hash, network) => {
	const netId = Number(network);
	switch (netId) {
		case 1:
			return 'https://etherscan.io/tx/' + hash;
		case 42:
			return 'https://kovan.etherscan.io/tx/' + hash;
	}
	return hash;
}
