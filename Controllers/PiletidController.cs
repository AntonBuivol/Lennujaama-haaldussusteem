using Lennujaama_haaldussusteem.Data;
using Lennujaama_haaldussusteem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lennujaama_haaldussusteem.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PiletidController : ControllerBase
    {
        private readonly DBContext _context;

        public PiletidController(DBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            var piletid = _context.Piletid
                .Select(p => new
                {
                    Id = p.Id,
                    LennujaamaId = p.lennujaamad.Id,
                    Valjumiskoht = p.lennujaamad.Valjumiskoht,
                    Saabumiskoht = p.lennujaamad.Saabumiskoht,
                    Valjumisaeg = p.lennujaamad.Valjumisaeg,
                    Saabumisaeg = p.lennujaamad.Saabumisaeg,
                    Kasutajad = p.lennujaamad.Piletids.Select(po => new
                    {
                        KasutajaId = po.kasutajad.Id,
                        Username = po.kasutajad.UserName,
                        Password = po.kasutajad.Password,
                        isAdmin = po.kasutajad.isAdmin
                    })
                })
                .GroupBy(p => p.LennujaamaId)
                .Select(g => g.First())
                .ToList();

            if (piletid == null || !piletid.Any())
            {
                return NotFound(new { message = "No tickets found." });
            }

            return Ok(piletid);
        }

        [HttpGet("Pilet/{kasutajaId}")]
        public ActionResult GetPiletidByUser(int kasutajaId)
        {
            var piletid = _context.Piletid
                .Where(p => p.kasutajad.Id == kasutajaId)
                .Include(p => p.lennujaamad)
                .Include(p => p.kasutajad)
                .Select(p => new
                {
                    Id = p.Id,
                    LennujaamaId = p.lennujaamad.Id,
                    Valjumiskoht = p.lennujaamad.Valjumiskoht,
                    Saabumiskoht = p.lennujaamad.Saabumiskoht,
                    Valjumisaeg = p.lennujaamad.Valjumisaeg,
                    Saabumisaeg = p.lennujaamad.Saabumisaeg,
                    Kasutajad = new
                    {
                        KasutajaId = p.kasutajad.Id,
                        Username = p.kasutajad.UserName,
                        Password = p.kasutajad.Password,
                        isAdmin = p.kasutajad.isAdmin
                    }
                })
                .ToList();

            if (piletid == null || !piletid.Any())
            {
                return NotFound(new { message = "No tickets found for the current user." });
            }

            return Ok(piletid);
        }


        [HttpPost("Lisa/{lennujaamId}")]
        public async Task<IActionResult> Lisa(int lennujaamId, [FromBody] int kasutajaId)
        {
            var lennujaam = _context.Lennujaamad.Find(lennujaamId);
            var kasutaja = _context.Kasutajad.Find(kasutajaId);

            if (lennujaam == null || kasutaja == null)
            {
                return BadRequest(new { message = "Server ei tööta palun proovige hiljem uuesti" });
            }

            var existingTicket = _context.Piletid.FirstOrDefault(p => p.lennujaamad.Id == lennujaamId && p.lennujaamad.Piletids.Any(po => po.kasutajad.Id == kasutajaId));

            if (existingTicket != null)
            {
                return BadRequest(new { message = "User is already added to this flight." });
            }

            var pilet = new Piletid
            {
                LennujaamId = lennujaamId,
                KasutajaId = kasutajaId,
                lennujaamad = lennujaam,
                kasutajad = kasutaja
            };

            _context.Piletid.Add(pilet);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Pilet added successfully" });
        }

        [HttpDelete("kustuta/{piletId}")]
        public async Task<IActionResult> DeleteTicket(int piletId)
        {
            var pilet = await _context.Piletid
                .FirstOrDefaultAsync(p => p.Id == piletId);

            if (pilet == null)
            {
                return NotFound(new { message = "Pilet not found." });
            }

            _context.Piletid.Remove(pilet);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Pilet deleted successfully." });
        }

    }
}