using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UserLikesAdded1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_photos_Users_AppUserId",
                table: "photos");

            migrationBuilder.AddForeignKey(
                name: "FK_photos_Users_AppUserId",
                table: "photos",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

    

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_photos_Users_AppUserId",
                table: "photos");

            migrationBuilder.AddForeignKey(
                name: "FK_photos_Users_AppUserId",
                table: "photos",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
