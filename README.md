# Spark Protocol Indexer with [Envio](https://envio.dev)

This indexer tracks key on-chain events from the Spark Protocol lending platform, including supplies, withdrawals, borrows, repayments, liquidations, and flash loans.

## Features

-  Tracks all major Spark Protocol events:
  - `Supply` - When users supply assets to the protocol
  - `Withdraw` - When users withdraw assets from the protocol
  - `Borrow` - When users borrow assets
  - `Repay` - When users repay borrowed assets
  - `LiquidationCall` - When positions are liquidated
  - `FlashLoan` - When flash loans are executed
-  Multi-chain support (Ethereum, Gnosis, and more)
-  Price fetching with caching (DeFiLlama API)
-  USD value calculations for all transactions
-  Clean, query-friendly GraphQL schema

## Project Structure

```
spark-indexer/
├── src/
│   ├── SparkEventHandlers.ts    # Event handlers for all Spark events
│   └── utils/
│       ├── getPrice.ts          # Price fetching utility
│       └── getNameFromChainId.ts # Chain ID to name mapping
├── config.yaml                  # Envio configuration
├── schema.graphql              # GraphQL data schema
├── chainIdToName.json          # Chain ID to name mappings
└── package.json
```

## Setup

1. **Install dependencies:**
   ```bash
   cd spark-indexer
   pnpm install
   ```

2. **Generate Envio code:**
   ```bash
   pnpm codegen
   ```

3. **Run the indexer:**
   ```bash
   pnpm dev
   ```

## Configuration

### Networks

The indexer is currently configured for:
- **Ethereum** (chainId: 1) - POOL: `0xC13e21B648A5Ee794902342038FF3aDAB66BE987`
- **Gnosis** (chainId: 100) - POOL: `0x2Dae5307c5E3FD1CF5A72Cb6F698f915860607e0`

To add more networks, update `config.yaml` with the appropriate chain ID, start block, and POOL contract address.

### Start Blocks

- Ethereum: `16776401` (deployment block)
- Gnosis: Update with actual deployment block

## Development & Testing

Run tests:
```bash
pnpm test
```

## Data Schema

The indexer creates the following entities:

- **Supply** - All supply transactions
- **Withdraw** - All withdrawal transactions
- **Borrow** - All borrow transactions
- **Repay** - All repay transactions
- **Liquidation** - All liquidation events
- **FlashLoan** - All flash loan events

Each entity includes:
- Transaction details (hash, block number, timestamp)
- Token amounts (raw and precision-adjusted)
- USD values (calculated using DeFiLlama prices)
- User addresses
- Chain information

## Notes

- Price data is cached for 60 seconds to reduce API calls
- The indexer uses `unordered_multichain_mode: true` to handle events arriving out of order
- All events include transaction hash and value for complete transaction tracking

## Adding More Networks

To add a new network:

1. Get the POOL contract address from the Spark address registry
2. Find the deployment block number
3. Add to `config.yaml`:

```yaml
networks:
    - id: <CHAIN_ID>
      start_block: <DEPLOYMENT_BLOCK>
      contracts:
          - name: SparkPool
            address:
                - <POOL_ADDRESS>
```

## License

MIT

