import fs from "fs";
import path from "path";

export function getNameFromChainId(chainId: number): string {
    const filePath = path.join(__dirname, "../../chainIdToName.json");
    const chains = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const chain = chains.find((c: { chainId: number | string }) =>
        c.chainId === chainId || String(c.chainId) === String(chainId)
    );
    return chain ? chain.name : "Unknown Chain";
}

