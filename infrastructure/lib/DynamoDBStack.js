import { CfnOutput } from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as sst from "@serverless-stack/resources";

export default class DynamoDBStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const app = this.node.root;

    const notesTable = new dynamodb.Table(this, "NotesTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand billing mode
      sortKey: { name: "noteId", type: dynamodb.AttributeType.STRING },
      partitionKey: { name: "userId", type: dynamodb.AttributeType.STRING },
    });

    const collaboratorsTable = new dynamodb.Table(this, "CollaboratorsTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand billing mode
      partitionKey: { name: "userId", type: dynamodb.AttributeType.STRING },
    });

    // Output values
    new CfnOutput(this, "NotesTableName", {
      value: notesTable.tableName,
      exportName: app.logicalPrefixedName("NotesTableName"),
    });
    new CfnOutput(this, "NotesTableArn", {
      value: notesTable.tableArn,
      exportName: app.logicalPrefixedName("NotesTableArn"),
    });

    // Output values
    new CfnOutput(this, "CollaboratorsTableName", {
      value: collaboratorsTable.tableName,
      exportName: app.logicalPrefixedName("CollaboratorsTableName"),
    });
    new CfnOutput(this, "CollaboratorsTableArn", {
      value: collaboratorsTable.tableArn,
      exportName: app.logicalPrefixedName("CollaboratorsTableArn"),
    });
  }
}