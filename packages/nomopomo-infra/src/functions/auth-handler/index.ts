import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { CloudFrontRequest, CloudFrontRequestEvent, CloudFrontResponse } from 'aws-lambda';

const secretsManager = new SecretsManagerClient({ region: 'us-east-1' });

interface AuthCredentials {
  username: string;
  password: string;
}

const getAuthCredentials = async (): Promise<AuthCredentials> => {
  const secretName = 'nomopomo-basic-auth-secret';
  const command = new GetSecretValueCommand({
    SecretId: secretName,
  });

  const response = await secretsManager.send(command);
  if (!response.SecretString) {
    throw new Error('Secret value is empty');
  }

  const parsed = JSON.parse(response.SecretString) as AuthCredentials;

  if (!parsed.username || !parsed.password) throw new Error('Value was not parsed properly');

  return parsed;
};

const handler = async (
  event: CloudFrontRequestEvent,
): Promise<CloudFrontRequest | (CloudFrontResponse & { body?: string })> => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  try {
    const credentials = await getAuthCredentials();
    const authHeader = headers.authorization;
    const expectedAuth = 'Basic ' + Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');

    if (authHeader && authHeader[0].value === expectedAuth) {
      return request; // Pass the request to the origin if authentication succeeds
    }
  } catch (e) {
    console.error('Error fetching credentials:', e);
  }

  return {
    status: '401',
    statusDescription: 'Unauthorized',
    headers: {
      'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic realm="Enter your credentials"' }],
      'content-type': [{ key: 'Content-Type', value: 'text/plain' }],
    },
    body: 'Unauthorized',
  };
};

exports.handler = handler;
