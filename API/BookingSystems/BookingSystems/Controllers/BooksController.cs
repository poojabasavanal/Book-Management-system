using BookingSystems.Models;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace BookingSystems.Controllers
{
    public class BooksController : ApiController
    {
        private BookingSystemEntities db = new BookingSystemEntities();

        // GET: api/Books
        public IQueryable<Book> GetBooks()
        {
            return db.Books;
        }

        // GET: api/Books/5
        [ResponseType(typeof(Book))]
        public async Task<IHttpActionResult> GetBook(int id)
        {
            Book book = await db.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }
        // GET: api/Books?Name=Epic&Type=Investment
        [ResponseType(typeof(Book))]
        public IHttpActionResult GetBook(string Name,string Type)
        {
            List<Book> books = new List<Book>();
            if (Name != null && Type!=null)
            {
                books = db.Books.Where(z => z.Name.ToLower().Contains(Name.ToLower()) && z.Type.ToLower().Contains(Type.ToLower())).ToList();
            }
            else if (Name != null)
            {
                books = db.Books.Where(z => z.Name.ToLower().Contains(Name.ToLower())).ToList();
            }
            else if (Type != null)
            {
                books = db.Books.Where(z => z.Type.ToLower().Contains(Type.ToLower())).ToList();
            }else
            {
                return BadRequest();
            }
            if (books.Count == 0)
            {
                return NotFound();
            }

            return Ok(books);
        }
        // GET: api/Books?Name=Epic
        [ResponseType(typeof(Book))]
        public IHttpActionResult GetBookByName(string Name)
        {
           List<Book> books =  db.Books.Where(z=>z.Name.ToLower().Contains(Name.ToLower())).ToList();
            if (books.Count == 0)
            {
                return NotFound();
            }

            return Ok(books);
        }
        // GET: api/Books?Type=Investment
        [ResponseType(typeof(Book))]
        public IHttpActionResult GetBookByType(string Type)
        {
            List<Book> books = db.Books.Where(z => z.Type.ToLower().Contains(Type.ToLower())).ToList();
            if (books.Count == 0)
            {
                return NotFound();
            }

            return Ok(books);
        }
        // PUT: api/Books/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBook(int id, Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != book.Id)
            {
                return BadRequest();
            }

            db.Entry(book).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Books
        [ResponseType(typeof(Book))]
        public async Task<IHttpActionResult> PostBook(Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Books.Add(book);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = book.Id }, book);
        }

        // DELETE: api/Books/5
        [ResponseType(typeof(Book))]
        public async Task<IHttpActionResult> DeleteBook(int id)
        {
            Book book = await db.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            db.Books.Remove(book);
            await db.SaveChangesAsync();

            return Ok(book);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookExists(int id)
        {
            return db.Books.Count(e => e.Id == id) > 0;
        }
    }
}