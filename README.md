# Compound Fi Utilization Rate Agent

[Agent Developer Contest](https://docs.forta.network/en/latest/contest1/) Compound fi Challenge5

## Description

This agent alerts when the utilization rate of a given pool changes by more than a certain percentage within a certain period of time.

Default: 10% changes within 60 min

## Supported Chains
Compound fi is only deployed on Ethereum

- Ethereum

## Alerts

Describe each of the type of alerts fired by this agent

- FORTA-COMPOUND-UTILIZATION-CHANGE
  - Fired when a utilzation rate changes by more than a specified minimum threshold within a specified window
  - Severity is always set to "low" (mention any conditions where it could be something else)
  - Type is always set to "suspicious" (mention any conditions where it could be something else)
  - Mention any other type of metadata fields included with this alert