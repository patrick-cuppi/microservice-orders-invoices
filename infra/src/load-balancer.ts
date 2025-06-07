import * as awsx from '@pulumi/awsx'
import { cluster } from './cluster'

export const appLoadBalancer = new awsx.classic.lb.ApplicationLoadBalancer('app-Load-Balancer', {
    securityGroups: cluster.securityGroups
})

export const networkLoadBalancer = new awsx.classic.lb.NetworkLoadBalancer('network-Load-Balancer', {
    subnets: cluster.vpc.publicSubnetIds
})