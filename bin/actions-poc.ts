#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ActionsPOCStack } from '../lib/actions-poc';

const app = new cdk.App();
const stackProps = {
  env: {
    region: process.env.REGION,
    account: process.env.ACCOUNT_ID
  }
};
new ActionsPOCStack(app, 'ActionsPOCStack', stackProps);
