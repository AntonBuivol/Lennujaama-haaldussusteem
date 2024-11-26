using Lennujaama_haaldussusteem.Data;
using Lennujaama_haaldussusteem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace Lennujaama_haaldussusteem.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LennujaamController : ControllerBase
    {
        private readonly DBContext _context;
        public LennujaamController(DBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<Lennujaamad> GetLennujaam()
        {
            return _context.Lennujaamad.ToList();
        }

        [HttpDelete("kustuta/{id}")]
        public List<Lennujaamad> DeleteLennujaam(int id)
        {
            var lennujaam = _context.Lennujaamad.Find(id);
            _context.Lennujaamad.Remove(lennujaam);
            _context.SaveChanges();
            return _context.Lennujaamad.ToList();
        }

        [HttpPost("lisa")]
        public IActionResult LisaLennujaam([FromBody] Lennujaamad lennujaamad)
        {
            if (string.IsNullOrWhiteSpace(lennujaamad.Valjumiskoht) || string.IsNullOrEmpty(lennujaamad.Saabumiskoht))
            {
                return BadRequest(new { message = "Väljumiskoht and Saabumiskoht can't be null" });
            }

            _context.Lennujaamad.Add(lennujaamad);
            _context.SaveChanges();
            return Ok(_context.Lennujaamad.ToList());
        }

        [HttpPut("muuda/{id}")]
        public IActionResult UpdateLennujaam(int id, [FromBody] Lennujaamad updatedLennujaam)
        {
            var lennujaam = _context.Lennujaamad.Find(id);

            if (lennujaam == null)
            {
                return BadRequest(new { message = "Invalid index." });
            }

            if(string.IsNullOrWhiteSpace(updatedLennujaam.Valjumiskoht) || string.IsNullOrEmpty(updatedLennujaam.Saabumiskoht))
            {
                return BadRequest(new { message = "Väljumiskoht and Saabumiskoht can't be null" });
            }

            lennujaam.Valjumiskoht = updatedLennujaam.Valjumiskoht;
            lennujaam.Saabumiskoht = updatedLennujaam.Saabumiskoht;
            lennujaam.Valjumisaeg = updatedLennujaam.Valjumisaeg;
            lennujaam.Saabumisaeg = updatedLennujaam.Saabumisaeg;
            _context.SaveChanges();

            return Ok(_context.Lennujaamad.ToList());
        }
    }
}
