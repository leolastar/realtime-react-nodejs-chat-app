import promClient from "prom-client";

const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({});

export default promClient.register.metrics();
