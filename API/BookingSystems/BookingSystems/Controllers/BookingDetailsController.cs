using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using BookingSystems.Models;

namespace BookingSystems.Controllers
{
    public class BookingDetailsController : ApiController
    {
        private BookingSystemEntities db = new BookingSystemEntities();

        // GET: api/BookingDetails
        public IQueryable<BookingDetail> GetBookingDetails()
        {
            return db.BookingDetails;
        }

        // GET: api/BookingDetails/5
        [ResponseType(typeof(BookingDetail))]
        public async Task<IHttpActionResult> GetBookingDetail(int id)
        {
            BookingDetail bookingDetail = await db.BookingDetails.FindAsync(id);
            if (bookingDetail == null)
            {
                return NotFound();
            }

            return Ok(bookingDetail);
        }
        // GET: api/BookingDetails?RegistrationId=1
        [ResponseType(typeof(BookingDetail))]
        public IHttpActionResult GetBookingDetail(string RegistrationId)
        {
            int registrationId = int.Parse(RegistrationId.ToString());
           List<BookingDetail> bookingDetails = db.BookingDetails.Where(z=>z.RegistrationId==registrationId).ToList();
            if (bookingDetails.Count == 0)
            {
                return Ok("");
            }

            return Ok(bookingDetails);
        }
        // GET: api/BookingDetails?BookId=1
        [ResponseType(typeof(BookingDetail))]
        public IHttpActionResult GetBookingDetailByBookId(string BookId)
        {
            int bookId = int.Parse(BookId.ToString());
            List<BookingDetail> bookingDetails = db.BookingDetails.Where(z => z.BookId == bookId).ToList();
            if (bookingDetails.Count == 0)
            {
                return NotFound();
            }

            return Ok(bookingDetails);
        }
        // PUT: api/BookingDetails/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBookingDetail(int id, BookingDetail bookingDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bookingDetail.Id)
            {
                return BadRequest();
            }

            db.Entry(bookingDetail).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingDetailExists(id))
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

        // POST: api/BookingDetails
        [ResponseType(typeof(BookingDetail))]
        public async Task<IHttpActionResult> PostBookingDetail(BookingDetail bookingDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BookingDetails.Add(bookingDetail);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = bookingDetail.Id }, bookingDetail);
        }

        // DELETE: api/BookingDetails/5
        [ResponseType(typeof(BookingDetail))]
        public async Task<IHttpActionResult> DeleteBookingDetail(int id)
        {
            BookingDetail bookingDetail = await db.BookingDetails.FindAsync(id);
            if (bookingDetail == null)
            {
                return NotFound();
            }

            db.BookingDetails.Remove(bookingDetail);
            await db.SaveChangesAsync();

            return Ok(bookingDetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookingDetailExists(int id)
        {
            return db.BookingDetails.Count(e => e.Id == id) > 0;
        }
    }
}