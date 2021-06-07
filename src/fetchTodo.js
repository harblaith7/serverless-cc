const { v4 } = require("uuid");
const AWS = require("aws-sdk")
const createError = require("http-errors")

const fetchTodos = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters

  let todo;

  try {
      const result = await dynamodb.get({ 
          TableName: "TodoTable",
          Key: { id }
       }).promise();
      todo = result.Item
  } catch (error) {
      console.log(error)
      throw new createError.InternalServerError(error)
  }

  if(!todo) {
      throw new createError.NotFound(`Todo is ID ${id} is not found`)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todo)
  };
};

module.exports = {
  handler: fetchTodos
}