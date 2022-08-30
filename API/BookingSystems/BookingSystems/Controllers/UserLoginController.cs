using BookingSystems.Models;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace BookingSystems.Controllers
{
    public class UserLoginController : ApiController
    {
        private BookingSystemEntities db = new BookingSystemEntities();

        // GET: api/UserLogin
        public IQueryable<Registration> GetRegistration()
        {
            return db.Registrations;
        }

        // GET: api/UserLogin?Email=test@gmail.com&Password=12345
        [ResponseType(typeof(Registration))]
        public IHttpActionResult GetRegistration(string Email, string Password)
        {
         
            Registration registration = db.Registrations.Where(z=>z.Email==Email && z.Password==Password).FirstOrDefault();
            if (registration == null)
            {
                return Ok("Not Found");
            }

            return Ok(registration);
        }


        // POST: api/UserLogin
        [ResponseType(typeof(Registration))]
        public async Task<IHttpActionResult> PostRegistration(Registration registration)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Registrations.Add(registration);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = registration.Id }, registration);
        }

       
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

       
    }
}