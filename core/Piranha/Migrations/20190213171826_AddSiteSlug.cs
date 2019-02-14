using Microsoft.EntityFrameworkCore.Migrations;

namespace Piranha.Migrations
{
    [NoCoverage]
    public partial class AddSiteSlug : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "Piranha_Sites",
                maxLength: 128,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Piranha_Sites_Slug",
                table: "Piranha_Sites",
                column: "Slug",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Piranha_Sites_Slug",
                table: "Piranha_Sites");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "Piranha_Sites");
        }
    }
}
