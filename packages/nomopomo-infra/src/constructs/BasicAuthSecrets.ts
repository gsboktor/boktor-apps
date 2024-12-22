import * as cdk from 'aws-cdk-lib';

import * as kms from 'aws-cdk-lib/aws-kms';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';

import { Construct } from 'constructs';

export interface BasicAuthProps {
  env: string;
  username: string;
  password: string;
}

export class BasicAuthSecret extends Construct {
  public readonly basicAuthSecret: secretsmanager.Secret;
  public readonly encryptKey: kms.Key;

  constructor(scope: Construct, id: string, props: BasicAuthProps) {
    super(scope, id);

    this.encryptKey = new kms.Key(this, `nomopomo-encrypt-key-resource-${props.env}`, {
      enableKeyRotation: true,
      description: `KMS key for nomopomo basic auth`,
      alias: `nomopomo-basic-auth-key-${props.env}`,
    });

    this.basicAuthSecret = new secretsmanager.Secret(this, `nomopomo-auth-secret-resource-${props.env}`, {
      secretName: `nomopomo-basic-auth-secret`,
      encryptionKey: this.encryptKey,
      description: `Basic auth credentials for nomopomo @ env: ${props.env}`,
      secretObjectValue: {
        username: cdk.SecretValue.unsafePlainText(props.username),
        password: cdk.SecretValue.unsafePlainText(props.password),
      },
    });
  }
}
