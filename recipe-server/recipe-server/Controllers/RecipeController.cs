using Microsoft.AspNetCore.Mvc;
using recipe_server.Entities;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace recipe_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        public static List<Recipe> recipeList = new List<Recipe>() { };
        // GET: api/<Recipe>
        [HttpGet]
        public List<Recipe> Get()
        {
            return recipeList;
        }
        // GET api/<RecipeController>/5
        [HttpGet("{name}")]
        public Recipe Get(string name)
        {
            return recipeList.FirstOrDefault(r => r.Name == name);
        }

        // POST api/<Recipe>
        [HttpPost]
        public ActionResult Post([FromBody] Recipe value)
        {
            Recipe recipe = new Recipe(value);
            recipeList.Add(recipe);
            return Ok();
        }

        // PUT api/<Recipe>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Recipe>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
