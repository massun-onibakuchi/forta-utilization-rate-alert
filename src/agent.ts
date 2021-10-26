import {
  BlockEvent,
  Finding,
  HandleBlock,
  FindingSeverity,
  FindingType,
  getJsonRpcUrl
} from 'forta-agent'
import { Contract, BigNumber, ethers } from 'ethers'
import { CTOKEN_ADDRESSES, ABI } from './constants'

const TOKEN_NAME = 'cUSDC' // cToken pool's name which you want to monitor
const MINIMUM_THRESHOLD_BPS = 1000 // 1000bps = 10 %
const WINDOW_SECONDS = 60 * 3600 // 60 min
const utilizationRateMap = new Map<number, BigNumber>() // Store utilization rates for each block within a specified window

const provider = new ethers.providers.JsonRpcProvider(getJsonRpcUrl())

const getUtilizationRate = async (cTokenName: keyof typeof CTOKEN_ADDRESSES): Promise<BigNumber | undefined> => {
  const pool = new Contract(CTOKEN_ADDRESSES[cTokenName], ABI, provider)
  const [cash, borrow, reserves]: BigNumber[] = await Promise.all([
    pool.getCash(),
    pool.totalBorrowsCurrent(),
    pool.totalReserves()
  ]).catch(e => console.error(e)) ?? []

  if (cash && borrow && reserves) {
    return borrow.mul(BigNumber.from(10).pow(18)).div(cash.add(borrow).sub(reserves))
  }
}

const handleBlock: HandleBlock = async (blockEvent: BlockEvent) => {
  const findings: Finding[] = [];
  const utilizationRate = await getUtilizationRate(TOKEN_NAME)

  if (!utilizationRate) return findings
  // Store highest and lowest utilization rate within the specified interval
  let lowestUtilizationRateWithinInterval = BigNumber.from(0)
  let highestUtilizationRateWithinInterval = BigNumber.from(0)

  // Insert 
  utilizationRateMap.set(blockEvent.block.timestamp, utilizationRate)

  for (const [key, rate] of utilizationRateMap.entries()) {
    if (key < blockEvent.block.timestamp - WINDOW_SECONDS) {
      utilizationRateMap.delete(key) // Remove old data
    } else if (rate.gt(highestUtilizationRateWithinInterval)) {
      highestUtilizationRateWithinInterval = rate
    } else if (lowestUtilizationRateWithinInterval.isZero() || rate.lt(lowestUtilizationRateWithinInterval)) {
      lowestUtilizationRateWithinInterval = rate
    }
  }
  // Since it is not possible to compare the utlization rates, skip the first time.
  if (utilizationRateMap.size > 1) {
    // Max utilization change within the specified window
    const utilizationChange = highestUtilizationRateWithinInterval.sub(lowestUtilizationRateWithinInterval)

    // If utilization change is greater than the specified threshold, emit alert
    if (utilizationChange.gt(BigNumber.from(MINIMUM_THRESHOLD_BPS).mul(BigNumber.from(10).pow(14)))) {
      findings.push(Finding.fromObject({
        name: `Volatile ${TOKEN_NAME} Pool Utilization Rate`,
        description: `Compound ${TOKEN_NAME} pool utilization rate change ${MINIMUM_THRESHOLD_BPS} bps within ${WINDOW_SECONDS}`,
        alertId: `FORTA-COMPOUND-UTILIZATION-CHANGE`,
        severity: FindingSeverity.Low,
        type: FindingType.Suspicious,
        metadata: {
          timestamp: blockEvent.block.timestamp.toString(),
          change: utilizationChange.toString(),
          currentRate: utilizationRate.toString()
        }
      }))
    }
  }
  return findings
}

export default {
  handleBlock
}