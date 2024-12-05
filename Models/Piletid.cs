namespace Lennujaama_haaldussusteem.Models
{
    public class Piletid
    {
        public int Id { get; set; }
        public int LennujaamId { get; set; }
        public Lennujaamad lennujaamad { get; set; }
        public int KasutajaId { get; set; }
        public Kasutajad kasutajad { get; set; }
    }
}
