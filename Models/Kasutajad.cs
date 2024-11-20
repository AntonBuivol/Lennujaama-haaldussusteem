namespace Lennujaama_haaldussusteem.Models
{
    public class Kasutajad
    {
        public int Id {  get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool isAdmin { get; set; }

        public Kasutajad() { }

        public Kasutajad(int id, string username, string password, bool isadmin)
        {
            Id = id;
            UserName = username;
            Password = password;
            isAdmin = isadmin;
        }
    }
}
