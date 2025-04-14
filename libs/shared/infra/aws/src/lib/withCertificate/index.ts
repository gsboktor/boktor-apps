import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { WithCertificateParams } from '../types';
import { Context } from '../types/environment';

export function withCertificate(this: Context, { hostedZone, then }: WithCertificateParams) {
  const fullDomainName = this.config.subDomain ? `${this.config.subDomain}.${this.config.domainName}` : this.config.domainName;

  const certificate = new acm.Certificate(this.ctx, 'Certificate', {
    domainName: fullDomainName,
    validation: acm.CertificateValidation.fromDns(hostedZone),
    subjectAlternativeNames: [`*.${fullDomainName}`],
  });

  then?.({ out: certificate });
}
