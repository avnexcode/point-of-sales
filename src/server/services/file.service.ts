import type { SUPABASE_BUCKET } from "@/lib/supabase/bucket";
import { supabaseAdminClient } from "@/lib/supabase/server";

export class FileService {
  static getImageUrl = async (
    supabaseBucket: SUPABASE_BUCKET,
    path: string,
  ) => {
    const timestamp = new Date().getTime().toString();

    const { data } = supabaseAdminClient.storage
      .from(supabaseBucket)
      .getPublicUrl(path);

    const imageUrl = data.publicUrl + "?t=" + timestamp;

    return imageUrl;
  };

  static uploadImage = async (
    supabaseBucket: SUPABASE_BUCKET,
    fileName: string,
    image: string,
  ) => {
    const buffer = Buffer.from(image, "base64");

    const config = {
      contentType: "image/jpeg",
      upsert: true,
    };

    const { data, error } = await supabaseAdminClient.storage
      .from(supabaseBucket)
      .upload(fileName, buffer, config);

    if (error) throw error;

    const imageUrl = await this.getImageUrl(supabaseBucket, data.path);

    return imageUrl;
  };

  static deleteImageByUrl = async (
    supabaseBucket: SUPABASE_BUCKET,
    imageUrl: string,
  ): Promise<void> => {
    const pathUrl = imageUrl.split("?")[0];

    const url = new URL(pathUrl!);

    const pathSegments = url.pathname.split("/");

    const fileName = pathSegments[pathSegments.length - 1];

    const { error } = await supabaseAdminClient.storage
      .from(supabaseBucket)
      .remove([fileName!]);

    if (error) throw new Error(`Failed to delete image: ${error.message}`);
  };
}
