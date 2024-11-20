using Lennujaama_haaldussusteem.Data;
using Lennujaama_haaldussusteem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Lennujaama_haaldussusteem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KasutajaController : ControllerBase
    {
        private readonly DBContext _context;

        public KasutajaController(DBContext context)
        {
            _context = context;
        }

        [HttpGet("Kasutaja")]
        public List<Kasutajad> GetKasutajad()
        {
            return _context.Kasutajad.ToList();
        }

        [HttpPost("LisaKasutaja")]
        public List<Kasutajad> LisaKasutaja([FromBody] Kasutajad kasutajad)
        {
            _context.Kasutajad.Add(kasutajad);
            _context.SaveChanges();
            return _context.Kasutajad.ToList();
        }

        [HttpDelete("kustutaKasutaja/{id}")]
        public List<Kasutajad> DeleteKasutaja(int id)
        {
            var kasutaja = _context.Kasutajad.Find(id);
            _context.Kasutajad.Remove(kasutaja);
            _context.SaveChanges();
            return _context.Kasutajad.ToList();
        }
    }
}
