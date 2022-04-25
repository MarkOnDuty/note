import * as sst from "@serverless-stack/resources";

export default class ApiStack extends sst.Stack {
    // Public reference to the API
    api;

    constructor(scope, id, props) {
        super(scope, id, props);

        const { table } = props;

        // Create the API
        this.api = new sst.Api(this, "Api", {
            customDomain: scope.stage === "prod"
              ? "noteapi.querion.ca"
              : `noteapi-${scope.stage}-${scope.account}.querion.ca`,
            defaultAuthorizationType: "AWS_IAM",
            defaultFunctionProps: {
              memorySize: 128,
              environment: {
                TABLE_NAME: table.tableName,
                STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
              },
            },
            routes: {
              "DELETE /notes/{id}": "src/delete.main",
              "PUT    /notes/{id}": "src/update.main",
              "GET    /notes": "src/list.main",
              "POST   /notes": "src/create.main",
              "POST   /billing" : "src/billing.main",
              "GET    /notes/{id}": "src/get.main",
            },
        });

        // Allow the API to access the table
        this.api.attachPermissions([table]);

        // Show the API endpoint in the output
        this.addOutputs({
            ApiEndpoint: this.api.customDomainUrl || this.api.url,
        });
    }
}
