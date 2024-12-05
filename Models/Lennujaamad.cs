namespace Lennujaama_haaldussusteem.Models
{
    public class Lennujaamad
    {
        public int Id { get; set; }

        public string Valjumiskoht {  get; set; }
        public string Saabumiskoht {  set; get; }

        public DateTime Valjumisaeg {  set; get; }
        public DateTime Saabumisaeg {  get; set; }

        public List<Piletid> Piletids { get; set; } = new List<Piletid>();

        public Lennujaamad()
        {

        }

        public Lennujaamad(int id, string valjumiskoht, string saabumiskoht, string valjumisaeg, string saabumisaeg)
        {
            Id = id;
            Valjumiskoht = valjumiskoht;
            Saabumiskoht = saabumiskoht;
            Valjumisaeg = DateTime.Parse(valjumisaeg);
            Saabumisaeg = DateTime.Parse(saabumisaeg);
        }
    }
}
