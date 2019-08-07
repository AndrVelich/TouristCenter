using Microsoft.EntityFrameworkCore.Migrations;

namespace Travelx.Storage.Migrations
{
    public partial class isActiveColumnPromotions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Promotions",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Promotions");
        }
    }
}
