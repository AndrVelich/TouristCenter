using TouristCenter.Domain.Interfaces.Order.Exceptions;
using TouristCenter.Domain.Interfaces.Order.Models;
using TouristCenter.Storage.Interfaces.Order.Managers;

namespace TouristCenter.Domain.Order.Models
{
    internal sealed class Order : IOrder
    {
        private readonly IOrderDataManager _orderDataManager;

        private string _name;
        private string _phone;

        public int OrderId { get; private set; }
        public string Name
        {
            get { return _name; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new OrderNameNotValidException();
                }
                _name = value;
            }
        }

        public string Phone
        {
            get { return _phone; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new OrderPhoneNotValidException();
                }
                _phone = value;
            }
        }

        public string Description { get; set; }

        internal Order(Storage.Interfaces.Order.Models.Order dataModel, IOrderDataManager orderDataManager)
        {
            _name = dataModel.Name;
            _phone = dataModel.Phone;
            Description = dataModel.Description;
            _orderDataManager = orderDataManager;
        }

        internal Order(
            IOrderDataManager orderDataManager,
            string name,
            string phone,
            string description)
        {
            Name = name;
            Phone = phone;
            Description = description;
            _orderDataManager = orderDataManager;
        }

        public void CreateOrder()
        {
            var orderDataModel = ConvertOrderToDataModel();
            _orderDataManager.CreateOrder(orderDataModel);
        }

        public void UpdateOrder()
        {
            var orderDataModel = ConvertOrderToDataModel();
            _orderDataManager.UpdateOrder(orderDataModel);
        }

        #region [private]

        private Storage.Interfaces.Order.Models.Order ConvertOrderToDataModel()
        {
            var orderDataModel = new Storage.Interfaces.Order.Models.Order
            {
                OrderId = OrderId,
                Name = Name,
                Phone = Phone,
                Description = Description
            };
            return orderDataModel;
        }

        #endregion
    }
}
