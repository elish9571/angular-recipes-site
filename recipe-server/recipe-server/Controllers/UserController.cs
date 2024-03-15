using Microsoft.AspNetCore.Mvc;
using recipe_server.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace recipe_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public static List<User> userList = new List<User> {};
        // GET: api/<Users>
        [HttpGet]
        public List<User> Get()
        {
            return userList;
        }

        // GET api/<Users>/5
        [HttpGet("{name}")]
        public User Get(string name)
        {
            return userList.FirstOrDefault(u=>u.Name==name);
        }

        // POST api/<UserController>
        [HttpPost]
        public ActionResult Post([FromBody] User value)
        {
            User user = new User(value);
            userList.Add(user);
            return Ok(user);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(string name, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(string name)
        {
        }
    }
}
