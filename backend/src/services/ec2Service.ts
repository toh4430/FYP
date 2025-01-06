import { EC2Client, RunInstancesCommand, DescribeInstancesCommand, StartInstancesCommand, StopInstancesCommand, TerminateInstancesCommand, _InstanceType } from "@aws-sdk/client-ec2";

const ec2Client = new EC2Client({ region: process.env.AWS_REGION });

export async function createEC2Instance(params: {
  instanceType: string;
  imageId: string;
  keyName: string;
  securityGroupIds: string[];
  userData: string;
}) {
  const command = new RunInstancesCommand({
    ImageId: params.imageId,
    InstanceType: params.instanceType as _InstanceType,
    KeyName: params.keyName,
    MinCount: 1,
    MaxCount: 1,
    SecurityGroupIds: params.securityGroupIds,
    UserData: Buffer.from(params.userData).toString('base64')
  });

  try {
    const response = await ec2Client.send(command);
    return response.Instances?.[0];
  } catch (error) {
    console.error("Error creating EC2 instance:", error);
    throw error;
  }
}

export async function describeEC2Instance(instanceId: string) {
  const command = new DescribeInstancesCommand({
    InstanceIds: [instanceId],
  });

  try {
    const response = await ec2Client.send(command);
    return response.Reservations?.[0]?.Instances?.[0];
  } catch (error) {
    console.error("Error describing EC2 instance:", error);
    throw error;
  }
}

export async function startEC2Instance(instanceId: string) {
  const command = new StartInstancesCommand({
    InstanceIds: [instanceId],
  });

  try {
    await ec2Client.send(command);
  } catch (error) {
    console.error("Error starting EC2 instance:", error);
    throw error;
  }
}

export async function stopEC2Instance(instanceId: string) {
  const command = new StopInstancesCommand({
    InstanceIds: [instanceId],
  });

  try {
    await ec2Client.send(command);
  } catch (error) {
    console.error("Error stopping EC2 instance:", error);
    throw error;
  }
}

export async function terminateEC2Instance(instanceId: string) {
  const command = new TerminateInstancesCommand({
    InstanceIds: [instanceId],
  });

  try {
    await ec2Client.send(command);
  } catch (error) {
    console.error("Error terminating EC2 instance:", error);
    throw error;
  }
}