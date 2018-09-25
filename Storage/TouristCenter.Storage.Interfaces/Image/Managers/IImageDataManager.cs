namespace TouristCenter.Storage.Interfaces.Image.Managers
{
    public interface IImageDataManager
    {
        Models.Image GetImage(int imageId);
        void CreateImage(Models.Image imageDataModel);
    }
}
