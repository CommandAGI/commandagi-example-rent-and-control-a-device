# rent-and-control-a-device

Part of [CommandAGI](https://commandagi.com): connecting agents to real computers, robots and
physical environments. This repository can be cloned independently of the private platform code.

```sh
git clone https://github.com/CommandAGI/commandagi-example-rent-and-control-a-device.git
cd commandagi-example-rent-and-control-a-device
```

## Compatibility and validation

This is a focused reference example, not a production device runtime. The source and instructions
are public so integrations can be understood and adapted. Local syntax checks do not verify live
API compatibility. Some examples retain earlier session/device API contracts; inspect the calls in
the source against your target environment before running them. No live rental, order, paid compute
or hardware-motion test was performed as part of the repository rename.


Rent a seller's robot, computer, or simulation into a session and drive it live.

```bash
export COMMANDAGI_API_KEY=cagi_…
node index.mjs                 # rent the first online rental listing
node index.mjs <listingId>     # rent a specific listing
```

The seller's embodiment must be `online` (their standby runtime connected — see
[`host-a-robot`](https://github.com/CommandAGI/commandagi-example-offer-a-robot-for-rent/blob/main/.)). Renting meters per minute at the listing's rate; the seller's
earnings are escrowed until your session ends, then released. Docs:
https://commandagi.com/docs/rent

## License

[MIT](LICENSE).
