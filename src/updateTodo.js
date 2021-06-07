const { v4 } = require("uuid");
const AWS = require("aws-sdk")

const updateTodo = async (event) => {

  const { completed } = JSON.parse(event.body);
  const { id } = event.pathParameters;

  const dynamodb = new AWS.DynamoDB.DocumentClient()

  try {
      await dynamodb.update({
        TableName: "TodoTable",
        Key: { id },
        UpdateExpression: 'set completed = :completed',
        ExpressionAttributeValues: {
          ':completed': completed
        },
        ReturnValues: 'ALL_NEW'
      }).promise();

      return {
        statusCode: 200,
        body: JSON.stringify({
            msg: "todo updated"
        })
      };

  } catch (error) {
      return {
        statusCode: 200,
        body: JSON.stringify(error)
      };
  }

};

module.exports = {
  handler: updateTodo
}