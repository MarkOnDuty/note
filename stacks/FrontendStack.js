import * as sst from "@serverless-stack/resources";

export default class FrontendStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { api, auth, bucket } = props;

    // Define our React app
    const site = new sst.StaticSite(this, "NoteSite", {
      customDomain: {
        domainName: scope.stage === "prod"
          ? "note.querion.ca"
          : `note-${scope.account}.querion.ca`,
        hostedZone: 'querion.ca',
      },
      path: "frontend",
      buildOutput: "dist",
      buildCommand: "npm run generate",
      // Pass in our environment variables
      environment: {
        APP_API_URL: api.customDomainUrl || api.url,
        APP_REGION: scope.region,
        APP_BUCKET: bucket.bucketName,
        APP_USER_POOL_ID: auth.cognitoUserPool.userPoolId,
        APP_IDENTITY_POOL_ID: auth.cognitoCfnIdentityPool.ref,
        APP_USER_POOL_CLIENT_ID:
          auth.cognitoUserPoolClient.userPoolClientId,
      },
    });

    // Show the url in the output
    this.addOutputs({
      SiteUrl: site.customDomainUrl || site.url,
    });
  }
}
