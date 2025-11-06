"use client";
import PdfReader from "./PdfReader";
import EpubReader from "./EpubReader";

export default function ReadingPage({ params }) {
  const { id } = params;
  const [book, setBook] = useState(null);

  useEffect(() => {
    // fetch book metadata from Supabase
    async function fetchBook() {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", book_id)
        .single();

      if (error) console.error(error);
      setBook(data);
    }
    fetchBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  if (book.file_url.endsWith(".pdf")) {
    return <PdfReader fileUrl={book.file_url} />;
  } else if (book.file_url.endsWith(".epub")) {
    // return <EpubReader fileUrl={book.file_url} />;
  } else {
    return <p>Unsupported format</p>;
  }
}
