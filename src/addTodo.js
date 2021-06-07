const { v4 } = require("uuid");
const AWS = require("aws-sdk")
const middy = require("@middy/core")
const httpJsonBodyParser = require("@middy/http-json-body-parser")

const addTodo = async (event) => {

  const { todo } = event.body;
  const createdAt = new Date();

  const dynamodb = new AWS.DynamoDB.DocumentClient()

  const newTodo = {
    id: v4(),
    todo,
    createdAt,
    completed: false
  }

  await dynamodb.put({
    TableName: "TodoTable",
    Item: newTodo
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo)
  };
};

module.exports = {
  handler: middy(addTodo).use(httpJsonBodyParser())
}