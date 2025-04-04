import * as route53 from 'aws-cdk-lib/aws-route53';
import { WithHostedZoneParams } from '../types';
import { Context } from '../types/environment';

export function withHostedZone(this: Context, { then }: WithHostedZoneParams = {}) {
  let hostedZone: route53.IHostedZone;

  if (this.config.hostedZoneId) {
    hostedZone = route53.HostedZone.fromHostedZoneAttributes(this.ctx, 'HostedZone', {
      hostedZoneId: this.config.hostedZoneId,
      zoneName: this.config.domainName,
    });
  } else {
    hostedZone = new route53.HostedZone(this.ctx, 'HostedZone', {
      zoneName: this.config.domainName,
    });
  }

  then?.({ out: hostedZone });
}
