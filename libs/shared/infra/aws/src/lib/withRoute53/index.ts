import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import { WithRoute53Params } from '../types';
import { Context } from '../types/environment';

export function withRoute53(this: Context, { distribution, hostedZone, then }: WithRoute53Params) {
  const fullDomainName = this.config.subDomain ? `${this.config.subDomain}.${this.config.domainName}` : this.config.domainName;

  const aRecord = new route53.ARecord(this.ctx, 'AliasRecord', {
    zone: hostedZone,
    target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    recordName: fullDomainName,
  });

  then?.({ out: aRecord });
}
