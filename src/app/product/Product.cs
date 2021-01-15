using System;

namespace HongRiTel.Entities: BaseEntity
{
    public class Product
    {
        public string Category { get; set; }//种类
        public string ProductID { get; set; }//产品ID
        public string Password { get; set; }//密码
        public decimal SalePrice { get; set; }//销售价格
        public decimal BasePrice { get; set; }//成本价格
        public string MoneyType { get; set; }//币种
        public string Remark { get; set; }//备注
    }
}
                           
