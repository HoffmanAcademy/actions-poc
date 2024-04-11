import { App, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecr from '@aws-cdk/aws-ecr';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';
import { Cluster, ContainerImage } from 'aws-cdk-lib/aws-ecs';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { join } from 'path';

export class ActionsPOCStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const image = new DockerImageAsset(this, 'ActionsPOCImage', {
      directory: join(__dirname, '..')
    });

    // At least 2 AZ required
    const vpc = new Vpc(this, 'ActionsPOCVPC', { maxAzs: 2 });

    const cluster = new Cluster(this, 'ActionsPOCCluster', {
      vpc
    });

    // Create a load-balanced Fargate service and make it public
    const service = new ApplicationLoadBalancedFargateService(
      this,
      'ActionsPOCFargateService',
      {
        cluster: cluster,
        cpu: 256,
        desiredCount: 1,
        taskImageOptions: {
          image: ContainerImage.fromDockerImageAsset(image),
          containerPort: 3030
        },
        memoryLimitMiB: 512,
        publicLoadBalancer: true
      }
    );
  }
}
