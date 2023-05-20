import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return v2.config({
      cloud_name: 'dnzjztrhs',
      api_key: '556964624135641',
      api_secret: 'eatffg0aaGWF9QbfyL6s_GfdVBg',
    });
  },
};
