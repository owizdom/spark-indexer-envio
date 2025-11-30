import { SparkPool, Supply, Withdraw, Borrow, Repay, Liquidation, FlashLoan } from "generated";
import { getNameFromChainId } from "./utils/getNameFromChainId";
import { getPrice } from "./utils/getPrice";

// Handler for Supply event
SparkPool.Supply.handler(async ({ event, context }) => {
    const eventId = `${event.chainId}_${event.transaction.hash}_${event.logIndex}`;

    const reserve = event.params.reserve;
    const chainId = event.chainId;
    const chainName = getNameFromChainId(Number(chainId));

    // Get token price and decimals
    const tokenData = await getPrice(`${chainName.toLowerCase()}:${reserve}`);
    const precisionAmount = Number(event.params.amount / BigInt(10 ** tokenData[1]));
    const usdAmount = tokenData[0] * precisionAmount;

    const supply: Supply = {
        id: eventId,
        reserve: reserve,
        user: event.params.user,
        onBehalfOf: event.params.onBehalfOf,
        amount: BigInt(event.params.amount),
        precisionAmount,
        usdAmount,
        referralCode: BigInt(event.params.referralCode),
        transactionHash: event.transaction.hash,
        blockNumber: BigInt(event.block.number),
        timestamp: BigInt(event.block.timestamp),
        chainId: BigInt(chainId),
    };

    context.Supply.set(supply);
});

// Handler for Withdraw event
SparkPool.Withdraw.handler(async ({ event, context }) => {
    const eventId = `${event.chainId}_${event.transaction.hash}_${event.logIndex}`;

    const reserve = event.params.reserve;
    const chainId = event.chainId;
    const chainName = getNameFromChainId(Number(chainId));

    // Get token price and decimals
    const tokenData = await getPrice(`${chainName.toLowerCase()}:${reserve}`);
    const precisionAmount = Number(event.params.amount / BigInt(10 ** tokenData[1]));
    const usdAmount = tokenData[0] * precisionAmount;

    const withdraw: Withdraw = {
        id: eventId,
        reserve: reserve,
        user: event.params.user,
        to: event.params.to,
        amount: BigInt(event.params.amount),
        precisionAmount,
        usdAmount,
        transactionHash: event.transaction.hash,
        blockNumber: BigInt(event.block.number),
        timestamp: BigInt(event.block.timestamp),
        chainId: BigInt(chainId),
    };

    context.Withdraw.set(withdraw);
});

// Handler for Borrow event
SparkPool.Borrow.handler(async ({ event, context }) => {
    const eventId = `${event.chainId}_${event.transaction.hash}_${event.logIndex}`;

    const reserve = event.params.reserve;
    const chainId = event.chainId;
    const chainName = getNameFromChainId(Number(chainId));

    // Get token price and decimals
    const tokenData = await getPrice(`${chainName.toLowerCase()}:${reserve}`);
    const precisionAmount = Number(event.params.amount / BigInt(10 ** tokenData[1]));
    const usdAmount = tokenData[0] * precisionAmount;

    const borrow: Borrow = {
        id: eventId,
        reserve: reserve,
        user: event.params.user,
        onBehalfOf: event.params.onBehalfOf,
        amount: BigInt(event.params.amount),
        precisionAmount,
        usdAmount,
        interestRateMode: BigInt(event.params.interestRateMode),
        borrowRate: BigInt(event.params.borrowRate),
        referralCode: BigInt(event.params.referralCode),
        transactionHash: event.transaction.hash,
        blockNumber: BigInt(event.block.number),
        timestamp: BigInt(event.block.timestamp),
        chainId: BigInt(chainId),
    };

    context.Borrow.set(borrow);
});

// Handler for Repay event
SparkPool.Repay.handler(async ({ event, context }) => {
    const eventId = `${event.chainId}_${event.transaction.hash}_${event.logIndex}`;

    const reserve = event.params.reserve;
    const chainId = event.chainId;
    const chainName = getNameFromChainId(Number(chainId));

    // Get token price and decimals
    const tokenData = await getPrice(`${chainName.toLowerCase()}:${reserve}`);
    const precisionAmount = Number(event.params.amount / BigInt(10 ** tokenData[1]));
    const usdAmount = tokenData[0] * precisionAmount;

    const repay: Repay = {
        id: eventId,
        reserve: reserve,
        user: event.params.user,
        repayer: event.params.repayer,
        amount: BigInt(event.params.amount),
        precisionAmount,
        usdAmount,
        useATokens: event.params.useATokens,
        transactionHash: event.transaction.hash,
        blockNumber: BigInt(event.block.number),
        timestamp: BigInt(event.block.timestamp),
        chainId: BigInt(chainId),
    };

    context.Repay.set(repay);
});

// Handler for LiquidationCall event
SparkPool.LiquidationCall.handler(async ({ event, context }) => {
    const eventId = `${event.chainId}_${event.transaction.hash}_${event.logIndex}`;

    const liquidation: Liquidation = {
        id: eventId,
        collateralAsset: event.params.collateralAsset,
        debtAsset: event.params.debtAsset,
        user: event.params.user,
        debtToCover: BigInt(event.params.debtToCover),
        liquidatedCollateralAmount: BigInt(event.params.liquidatedCollateralAmount),
        liquidator: event.params.liquidator,
        receiveAToken: event.params.receiveAToken,
        transactionHash: event.transaction.hash,
        blockNumber: BigInt(event.block.number),
        timestamp: BigInt(event.block.timestamp),
        chainId: BigInt(event.chainId),
    };

    context.Liquidation.set(liquidation);
});

// Handler for FlashLoan event
SparkPool.FlashLoan.handler(async ({ event, context }) => {
    const eventId = `${event.chainId}_${event.transaction.hash}_${event.logIndex}`;

    const asset = event.params.asset;
    const chainId = event.chainId;
    const chainName = getNameFromChainId(Number(chainId));

    // Get token price and decimals
    const tokenData = await getPrice(`${chainName.toLowerCase()}:${asset}`);
    const precisionAmount = Number(event.params.amount / BigInt(10 ** tokenData[1]));
    const usdAmount = tokenData[0] * precisionAmount;

    const flashLoan: FlashLoan = {
        id: eventId,
        target: event.params.target,
        initiator: event.params.initiator,
        asset: asset,
        amount: BigInt(event.params.amount),
        precisionAmount,
        usdAmount,
        interestRateMode: BigInt(event.params.interestRateMode),
        premium: BigInt(event.params.premium),
        referralCode: BigInt(event.params.referralCode),
        transactionHash: event.transaction.hash,
        blockNumber: BigInt(event.block.number),
        timestamp: BigInt(event.block.timestamp),
        chainId: BigInt(chainId),
    };

    context.FlashLoan.set(flashLoan);
});

