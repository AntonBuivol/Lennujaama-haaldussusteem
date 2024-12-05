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

            migrationBuilder.CreateTable(
                name: "Piletid",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LennujaamId = table.Column<int>(type: "int", nullable: false),
                    lennujaamadId = table.Column<int>(type: "int", nullable: false),
                    KasutajaId = table.Column<int>(type: "int", nullable: false),
                    kasutajadId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Piletid", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Piletid_Kasutajad_kasutajadId",
                        column: x => x.kasutajadId,
                        principalTable: "Kasutajad",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Piletid_Lennujaamad_lennujaamadId",
                        column: x => x.lennujaamadId,
                        principalTable: "Lennujaamad",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Piletid_kasutajadId",
                table: "Piletid",
                column: "kasutajadId");

            migrationBuilder.CreateIndex(
                name: "IX_Piletid_lennujaamadId",
                table: "Piletid",
                column: "lennujaamadId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Piletid");

            migrationBuilder.DropTable(
                name: "Kasutajad");

            migrationBuilder.DropTable(
                name: "Lennujaamad");
        }
    }
}
