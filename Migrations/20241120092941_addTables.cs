using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lennujaama_haaldussusteem.Migrations
{
    /// <inheritdoc />
    public partial class addTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kasutajad",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isAdmin = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kasutajad", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Lennujaamad",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Valjumiskoht = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Saabumiskoht = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Valjumisaeg = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Saabumisaeg = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lennujaamad", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Kasutajad");

            migrationBuilder.DropTable(
                name: "Lennujaamad");
        }
    }
}
