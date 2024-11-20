using Lennujaama_haaldussusteem.Data;
using Lennujaama_haaldussusteem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace Lennujaama_haaldussusteem.Controllers
{
    [Route("api/[controller]")]
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
        public List<Lennujaamad> LisaLennujaam([FromBody] Lennujaamad lennujaamad)
        {
            _context.Lennujaamad.Add(lennujaamad);
            _context.SaveChanges();
            return _context.Lennujaamad.ToList();
        }

        [HttpPut("muuda/{id}")]
        public IActionResult UpdateLennujaam(int id, [FromBody] Lennujaamad updatedLennujaam)
        {
            if (id < 1 || id > _context.Lennujaamad.Count())
            {
                return BadRequest("Invalid index.");
            }

            var lennujaam = _context.Lennujaamad.Find(id);
            lennujaam.Valjumiskoht = updatedLennujaam.Valjumiskoht;
            lennujaam.Saabumiskoht = updatedLennujaam.Saabumiskoht;
            lennujaam.Valjumisaeg = updatedLennujaam.Valjumisaeg;
            lennujaam.Saabumisaeg = updatedLennujaam.Saabumisaeg;
            _context.SaveChanges();

            return Ok(_context.Lennujaamad.ToList());
        }
    }
}
