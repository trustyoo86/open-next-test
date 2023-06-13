import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import cloudfront, { AllowedMethods, ViewerProtocolPolicy, CachePolicy } from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

declare const myBucket: s3.Bucket;

export default {
  config(_input) {
    return {
      name: "open-next-test-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const myBucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'open-next-test-bucket');

      const site = new NextjsSite(stack, "next-test", {
        buildCommand: 'yarn deploy:build',
        cdk: {
          // @ts-ignore
          bucket: myBucket,
          distribution: {
            additionalBehaviors: {
              '_next/data/*': {
                origin: new origins.S3Origin(myBucket),
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cachePolicy: new cloudfront.CachePolicy(stack, 'dataCachePolicy', {
                  queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
                  headerBehavior: cloudfront.CacheHeaderBehavior.allowList('User-Agent'),
                  defaultTtl: cdk.Duration.minutes(30),
                  minTtl: cdk.Duration.seconds(1),
                  maxTtl: cdk.Duration.seconds(1),
                }),
              },
            },
          },
        }
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
