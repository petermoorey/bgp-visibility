# BGP Monitoring and Visibility

![Build and Deploy to Cloud Run](https://github.com/pmoorey/bgp-visibility/workflows/Build%20and%20Deploy%20to%20Cloud%20Run/badge.svg?branch=master)

This is a personal project with two objectives; learn Angular frontend development, and provide a public service to disover information about Border Gateway Protocol (BGP), the routing protocol of the Internet. 

You can visit the website at https://bgprouting.net.  It's a work in progress so don't expect much.  The current focus is to learn Angular, the functionality of the website itself isn't the first priority.

## Ideas

Below are some ideas that I hope to incorporate into the website, thanks to r/networking community on Reddit for some of these!

- Enable user to identify AS/prefixes of interest
- Provide high level information
- List prefixes announced by AS and peer/s
- Highlight recent changes in prefix origin ASN, prefix AS path etc.  Route hijacking/path manipulation.
- Alert on incidents within an ASN (basically a free version of BGPMon).  
- Assessment of BGP security (RPKI etc.)
- Streaming of live routing events/notifications
- Build Angular website, with Firebase or Django Rest Framework backend
- Host webiste on Google Cloud Run

## Sprint 1
- Completed 30% of Angular course on Udemy
- Built basic Angular site, with components from Angular Material
  - Search by ASN to return:
    - Overview
    - Prefixes
    - Peers (with influence indicator)
  - Configure an ASN (it will popup a notification using Angular event emitter, but no additional functionality provided yet)
- Setup Git Hub Action to containerize, build and publish the website to Google Cloud Run on each 'push' of new Git commit/s
- Setup https://bgprouting.net website and related it to Google Cloud Run

## Sprint 2
- Complete 50% of Angular course
- Setup Firebase backend for authentication and database services
- Enable user to select ASN/prefixes of interest
- Highlight recent routing changes for selected prefixes
- Updated UI theme and reorganized project/components

## Sprint 3 (upcoming)
- Complete 70% of Angular course
- Create an API/cloud function for delivery of notifications via:
  - Email
  - Webhook
  - Web UI/database
- Create a handler/process for detection of prefixes originating from unauthorized ASN


