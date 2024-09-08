import type { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log(event);

  const aaa: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello",
    }),
  };
  return aaa;
};
