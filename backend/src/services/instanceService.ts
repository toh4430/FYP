import { IInstance, Instance } from '../models/Instance';
import { createEC2Instance, describeEC2Instance, startEC2Instance, stopEC2Instance, terminateEC2Instance } from './ec2Service';
import { uploadFolderToS3 } from './s3Service';
import { sendMessage } from './sqsService';
import mongoose from 'mongoose';

export const createInstanceService = async (instanceData: Partial<IInstance>, userId: string, botFiles: Express.Multer.File[]) => {
  try {
    // Upload bot files to S3
    const s3Keys = await uploadFolderToS3(botFiles);

    // Create instance in database with 'pending' status
    const instance = await Instance.create({
      ...instanceData,
      userId,
      status: 'pending',
    });

    // Send message to SQS for EC2 instance creation
    await sendMessage(JSON.stringify({
      instanceId: instance._id,
      s3Keys,
      instanceType: instanceData.type,
      userId,
    }));

    return instance;
  } catch (error) {
    console.error('Error creating instance:', error);
    throw new Error('Instance creation failed. Please check the logs for details.');
  }
};

export const getInstancesService = async (userId: string): Promise<IInstance[]> => {
  const instances = await Instance.find({ userId }).lean();
  return Promise.all(instances.map(async (instance) => {
    if (instance.ec2InstanceId) {
      const ec2Instance = await describeEC2Instance(instance.ec2InstanceId);
      return {
        ...instance,
        publicDnsName: ec2Instance?.PublicDnsName,
        state: ec2Instance?.State?.Name,
      };
    }
    return instance;
  }));
};

export const getInstanceService = async (id: string, userId: string): Promise<IInstance | null> => {
  const instance = await Instance.findOne({ _id: id, userId }).lean();
  if (!instance) {
    return null;
  }
  if (instance.ec2InstanceId) {
    const ec2Instance = await describeEC2Instance(instance.ec2InstanceId);
    return {
      ...instance,
      publicDnsName: ec2Instance?.PublicDnsName,
      state: ec2Instance?.State?.Name,
    };
  }
  return instance;
};

export const updateInstanceService = async (id: string, updateData: Partial<IInstance>, userId: string): Promise<IInstance | null> => {
  const instance = await Instance.findOneAndUpdate(
    { _id: id, userId },
    updateData,
    { new: true, lean: true }
  );
  
  if (!instance) {
    return null;
  }
  return instance;
};

export const deleteInstanceService = async (id: string, userId: string): Promise<void> => {
  const instance = await Instance.findOneAndDelete({ _id: id, userId }).lean();
  if (!instance) {
    throw new Error('Instance not found');
  }
  if (instance.ec2InstanceId) {
    await terminateEC2Instance(instance.ec2InstanceId);
  }
};

export const startInstanceService = async (id: string, userId: string): Promise<IInstance | null> => {
  const instance = await Instance.findOne({ _id: id, userId });
  if (!instance) {
    return null;
  }
  if (instance.ec2InstanceId) {
    await startEC2Instance(instance.ec2InstanceId);
    instance.status = 'running';
    await instance.save();
  }
  return instance.toObject();
};

export const stopInstanceService = async (id: string, userId: string): Promise<IInstance | null> => {
  const instance = await Instance.findOne({ _id: id, userId });
  if (!instance) {
    return null;
  }
  if (instance.ec2InstanceId) {
    await stopEC2Instance(instance.ec2InstanceId);
    instance.status = 'stopped';
    await instance.save();
  }
  return instance.toObject();
};