namespace TouristCenter.Storage.Interfaces.Image.Managers
{
    public interface IImageDataManager
    {
        Models.Image GetImage(int imageId);
        Models.Image CreateImage(Models.Image imageDataModel);
        void DeleteImage(Models.Image imageDataModel);
    }
}
