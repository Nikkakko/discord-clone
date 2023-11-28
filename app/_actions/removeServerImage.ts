'use server';

import { UTApi } from 'uploadthing/server';

const api = new UTApi();

export const deleteImage = async (imageId: string | undefined) => {
  try {
    if (!imageId) throw new Error('No imageId');
    await api.deleteFiles(imageId);
  } catch (error) {
    console.error(error);
  }
};
