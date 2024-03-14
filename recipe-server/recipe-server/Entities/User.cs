namespace recipe_server.Entities
{
    public class User
    {
        public static int count = 0;
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public User(User user)
        {
            Id = count++;
            Name = user.Name;
            Address = user.Address;
            Email = user.Email;
            Password = user.Password;
        }
        public User() { }
    }
}
