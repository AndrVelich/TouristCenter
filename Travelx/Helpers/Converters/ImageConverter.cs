using System;

namespace Travelx.Helpers.Converters
{
    public static class ImageConverter
    {
        public static string GetImageMimeType(string imageBase64)
        {
            var endIndex = imageBase64.IndexOf(";base64,");
            var mimeType = imageBase64.Substring(0, endIndex).Replace("data:", string.Empty);

            return mimeType;
        }

        public static byte[] GetImageData(string imageBase64)
        {
            var startIndex = imageBase64.IndexOf(",") + 1;
            var imageData = imageBase64.Substring(startIndex, imageBase64.Length - startIndex);
            var result = Convert.FromBase64String(imageData);
            return result;
        }
    }
}