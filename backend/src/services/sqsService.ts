import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";

const sqsClient = new SQSClient({ region: process.env.AWS_REGION });
const queueUrl = process.env.SQS_QUEUE_URL;

export async function sendMessage(messageBody: string) {
  const command = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: messageBody,
  });

  try {
    await sqsClient.send(command);
  } catch (error) {
    console.error("Error sending message to SQS:", error);
    throw error;
  }
}

export async function receiveMessage() {
  const command = new ReceiveMessageCommand({
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 20,
  });

  try {
    const response = await sqsClient.send(command);
    return response.Messages?.[0];
  } catch (error) {
    console.error("Error receiving message from SQS:", error);
    throw error;
  }
}

export async function deleteMessage(receiptHandle: string) {
  const command = new DeleteMessageCommand({
    QueueUrl: queueUrl,
    ReceiptHandle: receiptHandle,
  });

  try {
    await sqsClient.send(command);
  } catch (error) {
    console.error("Error deleting message from SQS:", error);
    throw error;
  }
}