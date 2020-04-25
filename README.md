# BGP Internet Routing Analysis

![Build and Deploy to Cloud Run](https://github.com/pmoorey/bgp-visibility/workflows/Build%20and%20Deploy%20to%20Cloud%20Run/badge.svg?branch=master)

## Ideas
- Visibility of changes in prefix origin ASN
- Visibility of changes in prefix AS path
- Organization view:
    - Prefixes announced
    - Peering partners
    - Routing history
    - AS-centric view

## Data Models

- Prefixes
  - Network Address
  - Related Peer
  - Owning ASN
- ASNs
  - Name
  - Number
- Events
  - Timestamp
  - Issue [hijack, invalid annoucement]
  - Related prefix
  - Related Owning ASN
  - Annoucing ASN
  - AS Path
  - Peer
