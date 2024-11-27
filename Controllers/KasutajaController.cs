using Lennujaama_haaldussusteem.Data;
using Lennujaama_haaldussusteem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lennujaama_haaldussusteem.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class KasutajaController : ControllerBase
    {
        private readonly DBContext _context;

        public KasutajaController(DBContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Kasutajad newUser)
        {
            if (newUser == null)
            {
                return BadRequest(new { message = "User data is null." });
            }

            if (string.IsNullOrWhiteSpace(newUser.UserName))
            {
                return BadRequest(new { message = "Username cannot be empty." });
            }

            if (string.IsNullOrWhiteSpace(newUser.Password))
            {
                return BadRequest(new { message = "Password cannot be empty." });
            }

            var existingUser = await _context.Kasutajad.FirstOrDefaultAsync(k => k.UserName == newUser.UserName);

            if (existingUser != null)
            {
                return BadRequest(new { message = "User with this username already exists." });
            }

            var user = new Kasutajad
            {
                UserName = newUser.UserName,
                Password = newUser.Password,
                isAdmin = newUser.isAdmin
            };

            await _context.Kasutajad.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully." });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Kasutajad kasutajad)
        {
            var userExist = _context.Kasutajad.FirstOrDefault(k => k.UserName == kasutajad.UserName);
            if (userExist != null && kasutajad.Password == userExist.Password)
            {
                if(userExist.isAdmin)
                {
                    return Ok(new { message = "Hello Admin", url = "/lennujaamadAdmin" });
                }
                return Ok(new { message = "Login successfully", url = "/lennujaamad" });
            }
            return BadRequest(new { message = "Login or password is incorrect" });
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
