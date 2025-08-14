
export default function ContactPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">Got a question or want to work together? Drop us a line.</p>

      {/* Fake contact form layout */}
      <form className="grid gap-4 max-w-md">
        <input className="border p-2 rounded" type="text" placeholder="Your Name" />
        <input className="border p-2 rounded" type="email" placeholder="Your Email" />
        <textarea className="border p-2 rounded" placeholder="Your Message" rows={4}></textarea>
        <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800" type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
}
